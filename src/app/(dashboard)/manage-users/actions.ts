"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { hashPassword } from "@/lib/auth/hash";
import { authorizeAction } from "@/lib/auth/require-role";
import {
  userCreateSchema,
  userUpdateSchema,
  UserCreateInput,
  UserUpdateInput,
} from "@/lib/validations/user";
import { revalidatePath } from "next/cache";

type ActionResult = { success: true } | { success: false; error: string };

function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

export async function createUserAction(
  input: UserCreateInput,
): Promise<ActionResult> {
  const me = await authorizeAction(["SUPERADMIN", "ADMIN"]);
  if (!me) return { success: false, error: "Anda tidak memiliki akses" };

  const parsed = userCreateSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  const data = parsed.data;

  if (me.role === "ADMIN" && data.role === "SUPERADMIN") {
    return { success: false, error: "Anda tidak memiliki akses" };
  }

  try {
    const existingEmail = await prisma.user.findFirst({
      where: { email: data.email },
    });
    if (existingEmail) {
      return { success: false, error: "Email sudah dipakai" };
    }

    const existingUsername = await prisma.user.findFirst({
      where: { username: data.username },
    });
    if (existingUsername) {
      return { success: false, error: "Username sudah dipakai" };
    }

    await prisma.user.create({
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        role: data.role,
        password: await hashPassword(data.password),
      },
      select: { id: true },
    });

    revalidatePath("/manage-users");
    return { success: true };
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { success: false, error: "Email atau username sudah dipakai" };
    }
    return { success: false, error: "Terjadi kesalahan" };
  }
}

export async function updateUserAction(
  id: string,
  input: UserUpdateInput,
): Promise<ActionResult> {
  const me = await authorizeAction(["SUPERADMIN", "ADMIN"]);
  if (!me) return { success: false, error: "Anda tidak memiliki akses" };

  const parsed = userUpdateSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  const data = parsed.data;

  try {
    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) {
      return { success: false, error: "User tidak ditemukan" };
    }

    if (me.role === "ADMIN" && target.role === "SUPERADMIN") {
      return { success: false, error: "Anda tidak memiliki akses" };
    }
    if (me.role === "ADMIN" && data.role === "SUPERADMIN") {
      return { success: false, error: "Anda tidak memiliki akses" };
    }

    if (id === me.userId && data.role !== target.role) {
      return { success: false, error: "Tidak bisa mengubah role sendiri" };
    }

    const existingEmail = await prisma.user.findFirst({
      where: { email: data.email, NOT: { id } },
    });
    if (existingEmail) {
      return { success: false, error: "Email sudah dipakai" };
    }

    const existingUsername = await prisma.user.findFirst({
      where: { username: data.username, NOT: { id } },
    });
    if (existingUsername) {
      return { success: false, error: "Username sudah dipakai" };
    }

    await prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        role: data.role,
        ...(data.password !== "" && {
          password: await hashPassword(data.password),
        }),
      },
      select: { id: true },
    });

    revalidatePath("/manage-users");
    return { success: true };
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { success: false, error: "Email atau username sudah dipakai" };
    }
    return { success: false, error: "Terjadi kesalahan" };
  }
}

export async function setUserActiveAction(
  id: string,
  isActive: boolean,
): Promise<ActionResult> {
  const me = await authorizeAction(["SUPERADMIN", "ADMIN"]);
  if (!me) return { success: false, error: "Anda tidak memiliki akses" };

  if (id === me.userId) {
    return { success: false, error: "Tidak bisa mengubah status akun sendiri" };
  }

  try {
    const target = await prisma.user.findUnique({ where: { id } });
    if (!target) {
      return { success: false, error: "User tidak ditemukan" };
    }

    if (me.role === "ADMIN" && target.role === "SUPERADMIN") {
      return { success: false, error: "Anda tidak memiliki akses" };
    }

    await prisma.user.update({
      where: { id },
      data: { isActive },
      select: { id: true },
    });

    revalidatePath("/manage-users");
    return { success: true };
  } catch {
    return { success: false, error: "Terjadi kesalahan" };
  }
}
