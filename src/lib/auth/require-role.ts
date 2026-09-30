import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth/session";
import type { CurrentUser, Role } from "@/lib/auth/types";

export async function requireRole(allowedRoles: Role[]): Promise<CurrentUser> {
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
  allowedRoles: Role[],
): Promise<CurrentUser | null> {
  const user = await getCurrentUser();

  if (!user) return null;

  if (!allowedRoles.includes(user.role)) return null;

  return user;
}
