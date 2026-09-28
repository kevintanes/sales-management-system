"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useSidebar from "@/hooks/useSidebar";
import { JwtPayload } from "@/lib/auth/jwt";

type DashboardShellProps = {
  children: React.ReactNode;
  user: JwtPayload | null;
};

export default function DashboardShell({
  children,
  user,
}: DashboardShellProps) {
  const { isOpen, toggle } = useSidebar();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} user={user} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onToggleSidebar={toggle} user={user} />
        <main className="mx-auto w-full max-w-7xl flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
