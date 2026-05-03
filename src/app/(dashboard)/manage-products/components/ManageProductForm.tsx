"use client";

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import z from "zod";
import CategorySelect from "./CategorySelect";

const DUMMY_CATEGORIES = [
  "Audio",
  "TV",
  "Laptop",
  "Phone",
  "Tablet",
  "Accessories",
];

const formSchema = z.object({
  productname: z.string().min(5, "Product name must be at least 5 characters"),
  brand: z.string().min(2, "Brand must be at least 2 characters"),
  sku: z.string().min(2, "SKU is required"),
  category_id: z.string().min(1, "Category is required"),
  unit: z.string().min(1, "Unit is required"),
  price: z.number().min(0, "Price must be a positive number"),
  stock: z.number().min(0, "Stock must be a positive number"),
  image: z.string().optional().or(z.literal("")),
  description: z.string().optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ManageProductFormProps {
  defaultValues?: Partial<ProductFormValues>;
}

const ManageProductForm = ({ defaultValues }: ManageProductFormProps) => {
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productname: "",
      brand: "",
      category_id: "",
      image: "",
      price: 0,
      stock: 0,
      unit: "",
      ...defaultValues,
    },
  });

  return (
    <form>
      <FieldGroup>
        <FormField
          control={form.control}
          name="productname"
          label="Product Name"
          placeholder="Iphone XS Max"
        />

        {/* BRAND & SKU */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="brand"
            label="Brand"
            placeholder="Apple"
          />
          <FormField
            control={form.control}
            name="sku"
            label="SKU"
            placeholder="IP-XS-MAX"
          />
        </div>

        <CategorySelect control={form.control} name="category_id" />

        <FormField
          control={form.control}
          name="unit"
          label="Unit (e.g. pcs, box, kg)"
          placeholder="pcs"
        />

        {/* Price & Stock */}
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="price"
            label="Price (Rp)"
            type="number"
            placeholder="0"
          />
          <FormField
            control={form.control}
            name="stock"
            label="Stock Quantity"
            type="number"
            placeholder="0"
          />
        </div>

        {/* Image URL */}
        <FormField
          control={form.control}
          name="image"
          label="Image URL (Optional)"
          placeholder="https://..."
        />
      </FieldGroup>

      <Button className="mt-8 w-full" variant="primary" size="lg" type="submit">
        Save Product
      </Button>
    </form>
  );
};

export default ManageProductForm;
