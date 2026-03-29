"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { GoGear } from "react-icons/go";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { LuPackageSearch, LuShoppingCart } from "react-icons/lu";
import {
  MdOutlineDashboard,
  MdOutlineEventNote,
  MdOutlineVerified,
} from "react-icons/md";
import { RxPeople } from "react-icons/rx";

type SidebarProps = {
  isOpen: boolean;
};

type SidebarItem = {
  icon: ReactNode;
  title: string;
  href: string;
};

const sideBarItems: SidebarItem[] = [
  { icon: <MdOutlineDashboard />, title: "Dashboard", href: "/" },
  { icon: <LuPackageSearch />, title: "Product Catalog", href: "/products" },
  { icon: <LuShoppingCart />, title: "Checkout", href: "/checkout" },
  { icon: <MdOutlineEventNote />, title: "Orders", href: "/orders" },
  { icon: <LiaFileInvoiceSolid />, title: "Invoices", href: "/invoices" },
  { icon: <RxPeople />, title: "Customers", href: "/customers" },
  { icon: <GoGear />, title: "Manage Products", href: "/manage-products" },
];

const getIsActive = (href: string, pathname: string): boolean => {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname.startsWith(href);
};

const Sidebar = ({ isOpen }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={`bg-sidebar min-h-screen overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "w-60" : "w-0"}`}
    >
      <div
        className={`w-60 ${isOpen ? "opacity-100" : "opacity-0"} transition-opacity duration-200`}
      >
        {/* LOGO */}
        <div className="-200 flex gap-3 p-5">
          <div className="relative h-8 w-8 shrink-0">
            <Image
              src="/advance-digitals.png"
              alt="logo"
              fill
              sizes="(max-width:32px)"
              className="object-cover"
            />
          </div>
          <div>
            <div className="text-sidebar-foreground text-base leading-tight font-bold tracking-tight">
              Advance Digitals
            </div>
            <div className="flex items-center gap-1 text-xs font-medium text-amber-500">
              <MdOutlineVerified />
              <span>Admin HQ</span>
            </div>
          </div>
        </div>

        {/* NAV ITEMS */}
        <div className="p-2">
          <div className="text-sidebar-foreground/50 mb-1 px-2 text-xs font-semibold uppercase">
            ADMIN & MANAGEMENT
          </div>
          <ul className="flex w-full flex-col gap-2 text-sm">
            {sideBarItems.map(({ icon, title, href }) => {
              const isActive = getIsActive(href, pathname);
              return (
                <li key={title}>
                  <Link
                    href={href}
                    className={`flex h-8 w-full items-center gap-2 rounded-md px-3 py-5 text-sm font-medium transition-all hover:-translate-y-0.5 ${
                      isActive
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                    } `}
                  >
                    {icon}
                    <span>{title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
