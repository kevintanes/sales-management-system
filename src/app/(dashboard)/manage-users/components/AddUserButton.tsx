"use client";

import FormDialog from "@/components/FormDialog";
import { JwtPayload } from "@/lib/auth/jwt";
import { useState } from "react";
import UserForm from "./UserForm";

const AddUserButton = ({
  currentUserRole,
}: {
  currentUserRole: JwtPayload["role"];
}) => {
  const [open, setOpen] = useState(false);

  return (
    <FormDialog
      title="Add New User"
      triggerLabel="Add User"
      open={open}
      onOpenChange={setOpen}
    >
      <UserForm
        mode="create"
        currentUserRole={currentUserRole}
        onSuccess={() => setOpen(false)}
      />
    </FormDialog>
  );
};

export default AddUserButton;
