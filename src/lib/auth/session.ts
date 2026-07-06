import { cookies } from "next/headers";
import { verifyToken, JwtPayload } from "@/lib/auth/jwt";

export async function getCurrentUser(): Promise<JwtPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  return await verifyToken(token);
}
