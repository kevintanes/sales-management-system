import { getCurrentUser } from "@/lib/auth/session";
import DashboardShell from "@/components/DashboardShell";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/logout");
  }

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
