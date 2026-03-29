"use client";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useSidebar from "@/hooks/useSidebar";

export default function Dashboard() {
  const { isOpen, toggle } = useSidebar();

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} />
      <div className="flex flex-1 flex-col">
        <Navbar onToggleSidebar={toggle} />
        {/* <main></main> */}
      </div>
    </div>
  );
}
