"use client";

import { TableCell, TableRow } from "@/components/ui/table";
import { JwtPayload } from "@/lib/auth/jwt";
import { LucideUserRound } from "lucide-react";

type UserRowData = {
  id: string;
  name: string;
  username: string;
  email: string;
  role: JwtPayload["role"];
  isActive: boolean;
};

type UserTableRowProps = {
  user: UserRowData;
  currentUserId: string;
  currentUserRole: JwtPayload["role"];
};

const UserTableRow = ({ user, currentUserRole }: UserTableRowProps) => {
  const canManage = currentUserRole === "SUPERADMIN" || user.role !== "SUPERADMIN";

  return (
    <TableRow className={`h-18 ${user.isActive ? "" : "opacity-60"}`}>
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="bg-muted border-border flex h-10 w-10 items-center justify-center rounded-full border">
            <LucideUserRound className="size-5 opacity-40" />
          </div>
          <div>
            <div className="font-semibold">{user.name}</div>
            <div className="text-muted-foreground text-xs">
              @{user.username}
            </div>
          </div>
        </div>
      </TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>
        <span className="bg-muted rounded-xl px-2 py-1 text-xs font-medium">
          {user.role}
        </span>
      </TableCell>
      <TableCell>
        <span
          className={`rounded-xl px-2 py-1 text-xs font-medium ${
            user.isActive
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.isActive ? "Active" : "Inactive"}
        </span>
      </TableCell>
      <TableCell className="text-right">{canManage && null}</TableCell>
    </TableRow>
  );
};

export default UserTableRow;
