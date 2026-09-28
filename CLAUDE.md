# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev              # Start dev server (Next.js, Turbopack)
npm run build            # Production build
npm run lint             # ESLint
npm run typecheck        # tsc --noEmit
npm run format            # Prettier write
npm run format:check      # Prettier check

npm run db:generate      # prisma generate (writes to src/generated/prisma)
npm run db:migrate       # prisma migrate dev
npm run db:studio        # prisma studio
npm run db:seed          # tsx prisma/seed.ts — creates the SUPERADMIN user
```

There is no test runner configured in this repo.

Required env vars (see `.env.example`): `DATABASE_URL` (pooled, transaction-mode), `DIRECT_URL` (session-mode, used for migrations), `JWT_SECRET`, `SEED_SUPERADMIN_PASSWORD`.

## Architecture

**Stack**: Next.js 16 (App Router), React 19, Prisma 7 with the `prisma-client` generator (not the classic `@prisma/client` output) via `@prisma/adapter-pg`, Tailwind v4, shadcn/ui (`radix-nova` style), react-hook-form + zod.

**Prisma client is generated, not the default package.** The schema's `generator client` outputs to `src/generated/prisma` (imported as `@/generated/prisma/client`), not `node_modules/.prisma`. Always import Prisma types from `@/generated/prisma/*`. Run `npm run db:generate` after editing `prisma/schema.prisma`.

**Two Postgres connection strings**: `DATABASE_URL` (pgbouncer/transaction-mode pooler, used at runtime by `src/lib/prisma.ts`) vs `DIRECT_URL` (session-mode, used by `prisma.config.ts` for migrations). Don't conflate them.

**Auth is custom, not a library**: JWT-based sessions issued with `jose` (`src/lib/auth/jwt.ts`), stored in an httpOnly `token` cookie. `src/middleware.ts` gates every route except `/login` and redirects unauthenticated/invalid-token requests to `/login` (signature/expiry check only, no DB access — edge runtime). `getCurrentUser()` (`src/lib/auth/session.ts`) additionally re-fetches the user from the DB on every call and returns `null` if the user was deleted, `role` changed, or `isActive` is `false` — role always comes from the DB, never trusted from the JWT payload. `(dashboard)/layout.tsx` calls `getCurrentUser()` and redirects to `/login` if it's `null`, so a deactivated/deleted user is bounced on their next full page load. Role checks happen server-side via `requireRole()` (`src/lib/auth/require-role.ts`, redirects) for pages, or `authorizeAction()` (same file, returns `null` instead of redirecting) for server actions. `loginAction`/`logoutAction` in `src/lib/auth/actions.ts` are the only server actions for auth; passwords are hashed with bcrypt (`src/lib/auth/hash.ts`).

**Known limitation**: Next.js client-side `<Link>` navigation between pages that share the same layout does not re-run that layout's Server Component, so the session check in `(dashboard)/layout.tsx` only fires on a hard reload or first navigation into the dashboard — not on every sidebar click. A deactivated user can keep clicking around stale pages in the same tab until they refresh or hit a page/action that calls `requireRole()`/`authorizeAction()` directly (every server action does, so mutations are always safe even if the UI briefly looks stale).

**Route groups**: `src/app/(auth)/` holds the public login page; `src/app/(dashboard)/` holds every authenticated page (products, manage-products, manage-users, orders, checkout, customers, invoices) and shares `DashboardShell` (Sidebar + Navbar layout) from its `layout.tsx`.

Some dashboard pages still use dummy data; check `prisma/schema.prisma` for the models that already exist. `manage-users` (`src/app/(dashboard)/manage-users/`) is fully Prisma-backed and is a good reference for the read-in-Server-Component + Server-Action-mutation pattern.

**Component conventions**: each dashboard route keeps its route-specific pieces in a local `components/` subfolder (e.g. `src/app/(dashboard)/manage-products/components/`); cross-route shared components live in `src/components/` (including `Pagination.tsx`, and `InputSearch`/`FilterButton` which accept optional `onChange`/`onValueChange` for client-controlled filtering); shadcn primitives live in `src/components/ui/` and are managed via `components.json` (aliases: `@/components`, `@/components/ui`, `@/lib`, `@/hooks`).

## Security

- Every server action must call `authorizeAction()` with the appropriate role(s); every page that reads or mutates data must call `requireRole()`.

## Data conventions

- Data mutations (create/update/delete) use Server Actions in an `actions.ts` file inside the relevant route folder. API routes are only for webhooks or file downloads.
- Read data directly with Prisma in Server Components.
- Zod schemas live in `src/lib/validations/<domain>.ts` and are shared between the form and the server action.
- Server actions return `{ success: true, data? }` or `{ success: false, error: string }` — never throw to the client.

## Workflow

- Main branch is `staging`. Never commit directly to `staging`.
- Every task has a ticket number in the format `SMS-<number>` (e.g. `SMS-11`). The ticket number is always provided by the user; if it hasn't been given, ask first — don't invent one.
- Local branch name = the ticket number only (e.g. `SMS-11`).
- PR title: `"<ticket number> <task name>"` (e.g. `"SMS-11 Setup Claude Code"`).
- Commit messages follow Conventional Commits (`feat:`, `fix:`, `chore:`, etc.).
- Small tasks with clear instructions: implement directly.
- New features, refactors, Prisma schema changes, or auth changes: write a plan first. Once the plan is approved, create a GitHub issue from it via the `gh` CLI titled `"<ticket number> <task name>"`, then implement.
- Before declaring a task done, `npm run typecheck` and `npm run lint` must pass.
- PRs must reference the related issue (`Closes #<number>`) when one exists.
- Never read `.env` files, and never run commands that delete database data without asking first.
