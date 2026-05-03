import FormDialog from "@/components/FormDialog";
import PageHeader from "@/components/PageHeader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ManageProductForm from "./components/ManageProductForm";
import ProductTableRow from "./components/ProductTableRow";

const products = [
  {
    id: 1,
    name: "OPPO Reno 11",
    brand: "OPPO",
    sku: "OPP-RN11-256",
    category: "Phone",
    price: 250.0,
    stock: 60,
    unit: "pcs",
  },
  {
    id: 2,
    name: 'Samsung 4K Smart TV 55"',
    brand: "Samsung",
    sku: "SAM-TV55-4K",
    category: "TV",
    price: 230.0,
    stock: 60,
    unit: "pcs",
  },
  {
    id: 3,
    name: 'LG OLED TV 65"',
    brand: "LG",
    sku: "LG-TV65-OLED",
    category: "TV",
    price: 250.0,
    stock: 60,
    unit: "pcs",
  },
];

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
        <TableBody>
          {products.map((product) => (
            <ProductTableRow key={product.id} {...product} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageProductsPage;
