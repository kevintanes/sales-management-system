import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import { JwtPayload } from "@/lib/auth/jwt";

export async function requireRole(
  allowedRoles: JwtPayload["role"][],
): Promise<JwtPayload> {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  if (!allowedRoles.includes(user.role)) {
    redirect("/");
  }

  return user;
}

export async function authorizeAction(
  allowedRoles: JwtPayload["role"][],
): Promise<JwtPayload | null> {
  const user = await getCurrentUser();

  if (!user) return null;

  if (!allowedRoles.includes(user.role)) return null;

  return user;
}
