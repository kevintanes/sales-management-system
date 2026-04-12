"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useSidebar from "@/hooks/useSidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isOpen, toggle } = useSidebar();
  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} />
      <div className="flex flex-1 flex-col">
        <Navbar onToggleSidebar={toggle} />
        <main className="mx-auto w-full max-w-7xl p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
