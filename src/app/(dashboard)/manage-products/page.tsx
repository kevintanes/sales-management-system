import FormDialog from "@/components/FormDialog";
import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LucidePackage, LucidePen, LucideTrash2 } from "lucide-react";
import ManageProductForm from "./components/ManageProductForm";

const ManageProductsPage = () => {
  return (
    <div>
      <PageHeader
        title="Manage Products"
        description="Add, edit, or remove products from the catalog."
        action={
          <FormDialog title="Add New Product" triggerLabel="Add Product">
            <ManageProductForm />
          </FormDialog>
        }
      />
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead className="text-muted-foreground">Image</TableHead>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-center">Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="">
          <TableRow className="h-18">
            <TableCell className="font-medium">
              <div className="bg-muted border-border flex h-12 w-12 items-center justify-center rounded-lg border">
                <LucidePackage className="size-5 opacity-40" />
              </div>
            </TableCell>
            <TableCell>
              <div className="font-semibold">OPPO Reno 11</div>
              <div className="text-muted-foreground text-xs">
                OPPO | OPP-RN11-256
              </div>
            </TableCell>
            <TableCell>
              <span className="bg-muted rounded-xl px-2 py-1 text-xs font-medium">
                Smartphone
              </span>
            </TableCell>
            <TableCell className="text-right font-medium">$250.00</TableCell>
            <TableCell className="text-center font-medium">60</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                className="mr-2 text-blue-600 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-800 hover:shadow-md"
                size="icon-lg"
              >
                <LucidePen />
              </Button>
              <Button
                variant="ghost"
                className="text-red-600 hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-800 hover:shadow-md"
                size="icon-lg"
              >
                <LucideTrash2 />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow className="h-18">
            <TableCell className="font-medium">
              <div className="bg-muted border-border flex h-12 w-12 items-center justify-center rounded-lg border">
                <LucidePackage className="size-5 opacity-40" />
              </div>
            </TableCell>
            <TableCell>
              <div className="font-semibold">OPPO Reno 11</div>
              <div className="text-muted-foreground text-xs">
                OPPO | OPP-RN11-256
              </div>
            </TableCell>
            <TableCell>
              <span className="bg-muted rounded-xl px-2 py-1 text-xs font-medium">
                Smartphone
              </span>
            </TableCell>
            <TableCell className="text-right font-medium">$250.00</TableCell>
            <TableCell className="text-center font-medium">60</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                className="mr-2 text-blue-600 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-800 hover:shadow-md"
                size="icon-lg"
              >
                <LucidePen />
              </Button>
              <Button
                variant="ghost"
                className="text-red-600 hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-800 hover:shadow-md"
                size="icon-lg"
              >
                <LucideTrash2 />
              </Button>
            </TableCell>
          </TableRow>
          <TableRow className="h-18">
            <TableCell className="font-medium">
              <div className="bg-muted border-border flex h-12 w-12 items-center justify-center rounded-lg border">
                <LucidePackage className="size-5 opacity-40" />
              </div>
            </TableCell>
            <TableCell>
              <div className="font-semibold">OPPO Reno 11</div>
              <div className="text-muted-foreground text-xs">
                OPPO | OPP-RN11-256
              </div>
            </TableCell>
            <TableCell>
              <span className="bg-muted rounded-xl px-2 py-1 text-xs font-medium">
                Smartphone
              </span>
            </TableCell>
            <TableCell className="text-right font-medium">$250.00</TableCell>
            <TableCell className="text-center font-medium">60</TableCell>
            <TableCell className="text-right">
              <Button
                variant="ghost"
                className="mr-2 text-blue-600 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-800 hover:shadow-md"
                size="icon-lg"
              >
                <LucidePen />
              </Button>
              <Button
                variant="ghost"
                className="text-red-600 hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-800 hover:shadow-md"
                size="icon-lg"
              >
                <LucideTrash2 />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageProductsPage;
