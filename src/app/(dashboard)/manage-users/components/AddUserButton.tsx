"use client";

import FormDialog from "@/components/FormDialog";
import type { Role } from "@/lib/auth/types";
import { useState } from "react";
import UserForm from "./UserForm";

const AddUserButton = ({ currentUserRole }: { currentUserRole: Role }) => {
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
