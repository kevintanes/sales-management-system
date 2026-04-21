import FormDialog from "@/components/FormDialog";
import PageHeader from "@/components/PageHeader";
import ManageProductForm from "./components/ManageProductForm";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
            <TableHead>Stock</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">INV001</TableCell>
            <TableCell>Samsung Kulkas 2 Pintu 400L</TableCell>
            <TableCell>Credit Card</TableCell>
            <TableCell className="text-right">$250.00</TableCell>
            <TableCell>60</TableCell>
            <TableCell className="text-right">Button actions</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageProductsPage;
