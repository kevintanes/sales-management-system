import { cache } from "react";
import { cookies } from "next/headers";
import { createHash, randomBytes } from "crypto";
import { prisma } from "@/lib/prisma";
import type { CurrentUser } from "@/lib/auth/types";

const SESSION_COOKIE = "session";
const DAY_MS = 24 * 60 * 60 * 1000;
const SESSION_TTL_MS = 7 * DAY_MS;
const REFRESH_AFTER_MS = 1 * DAY_MS;
const COOKIE_MAX_AGE_SECONDS = 30 * 24 * 60 * 60;

function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export async function createSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString("base64url");

  await prisma.session.deleteMany({
    where: { userId, expiresAt: { lt: new Date() } },
  });

  await prisma.session.create({
    data: {
      userId,
      tokenHash: hashToken(token),
      expiresAt: new Date(Date.now() + SESSION_TTL_MS),
    },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: COOKIE_MAX_AGE_SECONDS,
    path: "/",
  });
}

export const getCurrentUser = cache(async (): Promise<CurrentUser | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;

  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({
    where: { tokenHash },
    select: {
      id: true,
      expiresAt: true,
      user: {
        select: { id: true, username: true, role: true, isActive: true },
      },
    },
  });

  if (!session) return null;

  const now = Date.now();

  if (session.expiresAt.getTime() <= now) {
    await prisma.session.deleteMany({ where: { id: session.id } });
    return null;
  }

  if (!session.user.isActive) return null;

  // Sliding expiration: perpanjang paling banyak 1x per REFRESH_AFTER_MS
  if (session.expiresAt.getTime() - now < SESSION_TTL_MS - REFRESH_AFTER_MS) {
    await prisma.session.updateMany({
      where: { id: session.id },
      data: { expiresAt: new Date(now + SESSION_TTL_MS) },
    });
  }

  return {
    userId: session.user.id,
    username: session.user.username,
    role: session.user.role,
  };
});

export async function deleteCurrentSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (token) {
    await prisma.session.deleteMany({ where: { tokenHash: hashToken(token) } });
  }

  cookieStore.delete(SESSION_COOKIE);
}
