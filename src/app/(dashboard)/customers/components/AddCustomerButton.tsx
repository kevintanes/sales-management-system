"use client";

import FormDialog from "@/components/FormDialog";
import { useState } from "react";
import CustomerForm from "./CustomerForm";

const AddCustomerButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <FormDialog
      title="Add New Customer Store"
      triggerLabel="Add Customer"
      open={open}
      onOpenChange={setOpen}
    >
      <CustomerForm mode="create" onSuccess={() => setOpen(false)} />
    </FormDialog>
  );
};

export default AddCustomerButton;
