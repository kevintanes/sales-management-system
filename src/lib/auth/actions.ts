"use server";

import { prisma } from "@/lib/prisma";
import { verifyPassword } from "@/lib/auth/hash";
import { signToken } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export type LoginResult = { success: true } | { success: false; error: string };

export async function loginAction(
  username: string,
  password: string,
): Promise<LoginResult> {
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) {
    return { success: false, error: "Username atau password salah" };
  }

  const isValid = await verifyPassword(password, user.password);

  if (!isValid) {
    return { success: false, error: "Username atau password salah" };
  }

  if (!user.isActive) {
    return { success: false, error: "Akun Anda dinonaktifkan" };
  }

  const token = await signToken({
    userId: user.id,
    username: user.username,
    role: user.role,
  });

  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 60 * 60 * 24,
    path: "/",
  });

  return { success: true };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete("token");
  redirect("/login");
}
