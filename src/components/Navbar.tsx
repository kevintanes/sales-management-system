"use client";

import Link from "next/link";
import { FiSidebar } from "react-icons/fi";
import { LuShoppingCart } from "react-icons/lu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { logoutAction } from "@/lib/auth/actions";
import { LucideLogOut } from "lucide-react";
import { JwtPayload } from "@/lib/auth/jwt";

type NavbarProps = {
  onToggleSidebar: () => void;
  user: JwtPayload | null;
};

const Navbar = ({ onToggleSidebar, user }: NavbarProps) => {
  const initials = user?.username?.slice(0, 2).toUpperCase() ?? "??";

  return (
    <div className="sticky top-0 z-10 flex h-14 w-full items-center justify-between border-b px-5 shadow-sm">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="flex h-7 w-7 items-center justify-center rounded-lg transition-all hover:-translate-y-0.5 hover:shadow-lg"
        >
          <FiSidebar />
        </button>
        <h4 className="font-outfit font-semibold">Sales Management System</h4>
      </div>
      <div className="flex items-center gap-3">
        <div className="bg-secondary text-secondary-foreground hover:bg-primary hover:text-primary-foreground flex h-8 w-8 items-center justify-center rounded-full">
          <Link href="/checkout">
            <LuShoppingCart />
          </Link>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-accent flex h-auto items-center gap-2 px-2 py-1"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-amber-300 bg-amber-100 text-xs font-bold text-amber-700">
                {initials}
              </div>
              <div className="text-left">
                <div className="text-foreground text-sm leading-tight font-medium">
                  {user?.username ?? "Guest"}
                </div>
                <div className="text-xs leading-tight font-medium text-amber-600">
                  {user?.role ?? "-"}
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel className="flex-col items-start">
              <p className="text-foreground text-sm font-semibold">
                {user?.username}
              </p>
              <p className="text-muted-foreground text-xs">@{user?.username}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => logoutAction()}
            >
              <LucideLogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
