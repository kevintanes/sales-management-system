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
    <div className="flex h-screen overflow-hidden">
      <Sidebar isOpen={isOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar onToggleSidebar={toggle} />
        <main className="mx-auto w-full max-w-7xl flex-1 overflow-y-auto p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
