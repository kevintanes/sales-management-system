# Sales Management System

A sales management dashboard for handling products, orders, customers, and
invoices, with role-based access control (SUPERADMIN, ADMIN, SALES).

## Features

- **Authentication** — custom JWT-based login/session handling (httpOnly cookie).
- **Role-based access** — SUPERADMIN, ADMIN, and SALES roles with server-side
  authorization checks on every page and mutation.
- **Product management** — browse products and manage the product catalog.
- **Orders & checkout** — create and track sales orders.
- **Customers** — manage customer records.
- **Invoices** — generate and view invoices for completed orders.

## Tech Stack

- [Next.js 16](https://nextjs.org) (App Router) + React 19
- [Prisma 7](https://www.prisma.io) with the `prisma-client` generator, via `@prisma/adapter-pg`
- PostgreSQL
- Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com)
- react-hook-form + zod for form validation
- JWT auth via [`jose`](https://github.com/panva/jose), passwords hashed with bcrypt

## Getting Started

### Prerequisites

- Node.js and npm
- A PostgreSQL database (pooled + direct connection strings — see below)

### Environment variables

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` — pooled connection string (pgbouncer/transaction mode), used at runtime
- `DIRECT_URL` — direct connection string (session mode), used for migrations
- `JWT_SECRET` — secret used to sign session JWTs
- `SEED_SUPERADMIN_PASSWORD` — password for the seeded SUPERADMIN account

### Install & run

```bash
npm install
npm run db:generate   # generate Prisma client
npm run db:migrate    # run migrations
npm run db:seed       # create the SUPERADMIN user
npm run dev           # start the dev server (Turbopack)
```

Open [http://localhost:3000](http://localhost:3000).

## Available Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Run `tsc --noEmit` |
| `npm run format` | Format with Prettier |
| `npm run format:check` | Check formatting |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio |
| `npm run db:seed` | Seed the SUPERADMIN user |

## Project Structure

- `src/app/(auth)/` — public login page
- `src/app/(dashboard)/` — authenticated pages: products, manage-products,
  orders, checkout, customers, invoices
- `src/lib/auth/` — JWT session handling, login/logout server actions, role checks
- `src/lib/validations/` — zod schemas shared between forms and server actions
- `src/components/` — shared components and shadcn/ui primitives
- `prisma/schema.prisma` — database schema
