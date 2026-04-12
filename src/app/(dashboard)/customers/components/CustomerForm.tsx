"use client";

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  storename: z.string().min(5, "Store name must be at least 5 characters"),
  ownername: z.string().min(2, "Owner name must be at least 2 characters"),
  phone: z.string().min(8, "Phone number is invalid"),
  email: z.string().email("Invalid email").optional().or(z.literal("")),
  address: z.string().min(5, "Address must be at least 5 characters"),
  city: z.string().min(2, "City is required"),
});

const CustomerForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      storename: "",
      ownername: "",
      phone: "",
      email: "",
      address: "",
      city: "",
    },
  });

  return (
    <form>
      <FieldGroup>
        <FormField
          control={form.control}
          name="storename"
          label="Store Name"
          placeholder="Electro World"
        />

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="ownername"
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
      <Button className="mt-8 w-full" variant="primary" size="lg">
        Save Customer
      </Button>
    </form>
  );
};

export default CustomerForm;
