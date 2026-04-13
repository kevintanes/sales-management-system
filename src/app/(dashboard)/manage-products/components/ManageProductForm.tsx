"use client";

import FormField from "@/components/FormField";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  productname: z.string().min(5, "Product name must be atleast 5 characters"),
  brand: z.string().min(3, "Brand must be atleast 3 characters"),
  category: z.string().min(3, "Brand must be atleast 3 characters"),
  unit: z.string().min(3, "Brand must be atleast 3 characters"),
  price: z.number(),
  stock: z.number(),
  image: z.string().optional(),
});

const ManageProductForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productname: "",
      brand: "",
      category: "",
      image: "",
      price: 0,
      stock: 0,
      unit: "",
    },
  });

  return (
    <form>
      <FieldGroup>
        <FormField
          control={form.control}
          name="productname"
          label="Product Name"
        />
      </FieldGroup>
    </form>
  );
};

export default ManageProductForm;
