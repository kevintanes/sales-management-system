"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import FormDialog from "@/components/FormDialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { JwtPayload } from "@/lib/auth/jwt";
import { LucidePen, LucideUserRound, UserCheck, UserX } from "lucide-react";
import { useState, useTransition } from "react";
import { setUserActiveAction } from "../actions";
import UserForm from "./UserForm";

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

const UserTableRow = ({
  user,
  currentUserId,
  currentUserRole,
}: UserTableRowProps) => {
  const canManage = currentUserRole === "SUPERADMIN" || user.role !== "SUPERADMIN";
  const isSelf = user.id === currentUserId;
  const [editOpen, setEditOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [statusError, setStatusError] = useState<string | null>(null);

  const handleToggleActive = () => {
    startTransition(async () => {
      const result = await setUserActiveAction(user.id, !user.isActive);
      if (!result.success) {
        setStatusError(result.error);
      } else {
        setStatusError(null);
      }
    });
  };

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
      <TableCell className="text-right">
        {canManage && (
          <FormDialog
            title="Edit User"
            open={editOpen}
            onOpenChange={setEditOpen}
            trigger={
              <Button
                variant="ghost"
                className="mr-2 text-blue-600 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-800 hover:shadow-md"
                size="icon-lg"
              >
                <LucidePen />
              </Button>
            }
          >
            <UserForm
              mode="edit"
              userId={user.id}
              currentUserRole={currentUserRole}
              isSelf={isSelf}
              defaultValues={{
                name: user.name,
                username: user.username,
                email: user.email,
                role: user.role,
                password: "",
              }}
              onSuccess={() => setEditOpen(false)}
            />
          </FormDialog>
        )}
        {canManage && !isSelf && (
          <ConfirmDialog
            trigger={
              <Button
                variant="ghost"
                className={
                  user.isActive
                    ? "text-red-600 hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-800 hover:shadow-md"
                    : "text-green-600 hover:-translate-y-0.5 hover:bg-green-50 hover:text-green-800 hover:shadow-md"
                }
                size="icon-lg"
                disabled={isPending}
              >
                {user.isActive ? <UserX /> : <UserCheck />}
              </Button>
            }
            title={user.isActive ? "Nonaktifkan User" : "Aktifkan User"}
            description={
              user.isActive
                ? `Apakah Anda yakin ingin menonaktifkan ${user.name}?`
                : `Apakah Anda yakin ingin mengaktifkan kembali ${user.name}?`
            }
            confirmLabel={user.isActive ? "Nonaktifkan" : "Aktifkan"}
            variant={user.isActive ? "danger" : "default"}
            onConfirm={handleToggleActive}
          />
        )}
        {statusError && (
          <p className="text-destructive mt-1 text-xs">{statusError}</p>
        )}
      </TableCell>
    </TableRow>
  );
};

export default UserTableRow;
