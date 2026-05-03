"use client";

import CategoryBadge from "@/components/CategoryBadge";
import ConfirmDialog from "@/components/ConfirmDialog";
import FormDialog from "@/components/FormDialog";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { LucidePackage, LucidePen, LucideTrash2 } from "lucide-react";
import ManageProductForm from "./ManageProductForm";

type ProductTableRowProps = {
  id: number;
  name: string;
  brand: string;
  sku: string;
  category: string;
  price: number;
  stock: number;
  unit: string;
};

const ProductTableRow = ({
  id,
  brand,
  category,
  name,
  price,
  sku,
  stock,
  unit,
}: ProductTableRowProps) => {
  return (
    <TableRow className="h-18">
      <TableCell className="font-medium">
        <div className="bg-muted border-border flex h-12 w-12 items-center justify-center rounded-lg border">
          <LucidePackage className="size-5 opacity-40" />
        </div>
      </TableCell>
      <TableCell>
        <div className="font-semibold">{name}</div>
        <div className="text-muted-foreground text-xs">
          {brand} | {sku}
        </div>
      </TableCell>
      <TableCell>
        <CategoryBadge label={category} />
      </TableCell>
      <TableCell className="text-right font-medium">${price}</TableCell>
      <TableCell className="text-center font-medium">{stock}</TableCell>
      <TableCell className="text-right">
        <FormDialog
          title="Edit Product"
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
          <ManageProductForm
            defaultValues={{
              productname: name,
              brand,
              category_id: category,
              sku,
              stock,
              price,
              unit,
            }}
          />
        </FormDialog>
        <ConfirmDialog
          trigger={
            <Button
              variant="ghost"
              className="text-red-600 hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-800 hover:shadow-md"
              size="icon-lg"
            >
              <LucideTrash2 />
            </Button>
          }
          title="Delete Product"
          description="Are you sure you want to delete this product?"
          confirmLabel="Delete"
          variant="danger"
          onConfirm={() => console.log(`Delete product: ${id}`)}
        />
      </TableCell>
    </TableRow>
  );
};

export default ProductTableRow;
