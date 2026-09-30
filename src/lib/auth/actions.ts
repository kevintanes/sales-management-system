"use server";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/hash";
import { createSession, deleteCurrentSession } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export type LoginResult = { success: true } | { success: false; error: string };

const MAX_FAILED_ATTEMPTS = 5;
const LOCK_DURATION_MS = 15 * 60 * 1000;

export async function loginAction(
  username: string,
  password: string,
): Promise<LoginResult> {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    return { success: false, error: "Username atau password salah" };
  }

  if (user.lockedUntil && user.lockedUntil.getTime() > Date.now()) {
    const minutes = Math.ceil(
      (user.lockedUntil.getTime() - Date.now()) / 60_000,
    );
    return {
      success: false,
      error: `Terlalu banyak percobaan login. Coba lagi dalam ${minutes} menit`,
    };
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    const attempts = user.failedLoginAttempts + 1;
    const shouldLock = attempts >= MAX_FAILED_ATTEMPTS;
    await prisma.user.update({
      where: { id: user.id },
      data: shouldLock
        ? {
            failedLoginAttempts: 0,
            lockedUntil: new Date(Date.now() + LOCK_DURATION_MS),
          }
        : { failedLoginAttempts: attempts },
      select: { id: true },
    });
    return { success: false, error: "Username atau password salah" };
  }

  if (!user.isActive) {
    return { success: false, error: "Akun Anda dinonaktifkan" };
  }

  if (user.failedLoginAttempts > 0 || user.lockedUntil) {
    await prisma.user.update({
      where: { id: user.id },
      data: { failedLoginAttempts: 0, lockedUntil: null },
      select: { id: true },
    });
  }

  await createSession(user.id);

  return { success: true };
}

export async function logoutAction() {
  await deleteCurrentSession();
  redirect("/login");
}
