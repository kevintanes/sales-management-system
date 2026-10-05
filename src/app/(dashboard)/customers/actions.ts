"use server";

import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { authorizeAction } from "@/lib/auth/require-role";
import {
  customerSchema,
  CustomerInput,
  normalizePhone,
} from "@/lib/validations/customer";
import { revalidatePath } from "next/cache";

type ActionResult = { success: true } | { success: false; error: string };

function isUniqueConstraintError(error: unknown): boolean {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === "P2002"
  );
}

function toCustomerData(data: CustomerInput) {
  return {
    storeName: data.storeName,
    ownerName: data.ownerName,
    phone: normalizePhone(data.phone),
    email: data.email === "" ? null : data.email,
    address: data.address,
    city: data.city,
  };
}

export async function createCustomerAction(
  input: CustomerInput,
): Promise<ActionResult> {
  const me = await authorizeAction(["SUPERADMIN", "ADMIN", "SALES"]);
  if (!me) return { success: false, error: "Anda tidak memiliki akses" };

  const parsed = customerSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  const customerData = toCustomerData(parsed.data);

  try {
    const existingPhone = await prisma.customer.findFirst({
      where: { phone: customerData.phone },
    });
    if (existingPhone) {
      return { success: false, error: "Nomor telepon sudah terdaftar" };
    }

    await prisma.customer.create({
      data: customerData,
      select: { id: true },
    });

    revalidatePath("/customers");
    return { success: true };
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { success: false, error: "Nomor telepon sudah terdaftar" };
    }
    return { success: false, error: "Terjadi kesalahan" };
  }
}

export async function updateCustomerAction(
  id: string,
  input: CustomerInput,
): Promise<ActionResult> {
  const me = await authorizeAction(["SUPERADMIN", "ADMIN", "SALES"]);
  if (!me) return { success: false, error: "Anda tidak memiliki akses" };

  const parsed = customerSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }
  const customerData = toCustomerData(parsed.data);

  try {
    const target = await prisma.customer.findUnique({ where: { id } });
    if (!target) {
      return { success: false, error: "Customer tidak ditemukan" };
    }

    const existingPhone = await prisma.customer.findFirst({
      where: { phone: customerData.phone, NOT: { id } },
    });
    if (existingPhone) {
      return { success: false, error: "Nomor telepon sudah terdaftar" };
    }

    await prisma.customer.update({
      where: { id },
      data: customerData,
      select: { id: true },
    });

    revalidatePath("/customers");
    return { success: true };
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      return { success: false, error: "Nomor telepon sudah terdaftar" };
    }
    return { success: false, error: "Terjadi kesalahan" };
  }
}

export async function setCustomerActiveAction(
  id: string,
  isActive: boolean,
): Promise<ActionResult> {
  const me = await authorizeAction(["SUPERADMIN", "ADMIN"]);
  if (!me) return { success: false, error: "Anda tidak memiliki akses" };

  try {
    const target = await prisma.customer.findUnique({ where: { id } });
    if (!target) {
      return { success: false, error: "Customer tidak ditemukan" };
    }

    await prisma.customer.update({
      where: { id },
      data: { isActive },
      select: { id: true },
    });

    revalidatePath("/customers");
    return { success: true };
  } catch {
    return { success: false, error: "Terjadi kesalahan" };
  }
}
