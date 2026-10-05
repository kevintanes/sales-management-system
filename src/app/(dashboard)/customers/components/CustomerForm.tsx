"use client";

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { createCustomerAction, updateCustomerAction } from "../actions";
import { CustomerInput, customerSchema } from "@/lib/validations/customer";

interface CustomerFormProps {
  mode: "create" | "edit";
  defaultValues?: Partial<CustomerInput>;
  customerId?: string;
  onSuccess: () => void;
}

const CustomerForm = ({
  mode,
  defaultValues,
  customerId,
  onSuccess,
}: CustomerFormProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      storeName: "",
      ownerName: "",
      phone: "",
      email: "",
      address: "",
      city: "",
      ...defaultValues,
    },
  });

  const onSubmit = (values: CustomerInput) => {
    startTransition(async () => {
      let result;
      if (mode === "create") {
        result = await createCustomerAction(values);
      } else {
        result = await updateCustomerAction(customerId as string, values);
      }

      if (!result.success) {
        form.setError("root", { message: result.error });
        return;
      }

      onSuccess();
    });
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FieldGroup>
        <FormField
          control={form.control}
          name="storeName"
          label="Store Name"
          placeholder="Electro World"
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="ownerName"
            label="Owner / Contact"
            placeholder="Jane Doe"
          />
          <FormField
            control={form.control}
            name="phone"
            label="Phone"
            placeholder="+62 812-1234-1234"
          />
        </div>

        <FormField
          control={form.control}
          name="email"
          label="Email (Optional)"
          placeholder="jane@electroworld.com"
        />
        <FormField
          control={form.control}
          name="address"
          label="Address"
          placeholder="Jl. Contoh No. 1"
        />
        <FormField
          control={form.control}
          name="city"
          label="City"
          placeholder="Jakarta"
        />
      </FieldGroup>

      {form.formState.errors.root && (
        <p className="text-destructive mt-4 text-sm">
          {form.formState.errors.root.message}
        </p>
      )}

      <Button
        className="mt-8 w-full"
        variant="primary"
        size="lg"
        type="submit"
        disabled={isPending}
      >
        Save Customer
      </Button>
    </form>
  );
};

export default CustomerForm;
