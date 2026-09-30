import { cache } from "react";
import { cookies } from "next/headers";
import { verifyToken, JwtPayload } from "@/lib/auth/jwt";
import { prisma } from "@/lib/prisma";

export const getCurrentUser = cache(async (): Promise<JwtPayload | null> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  const payload = await verifyToken(token);

  if (!payload) return null;

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    select: { id: true, username: true, role: true, isActive: true },
  });

  if (!user || !user.isActive) return null;

  return { userId: user.id, username: user.username, role: user.role };
});
