import FilterButton from "@/components/FilterButton";
import PageHeader from "@/components/PageHeader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import OrderTableRow from "./components/OrderTableRow";

const DUMMY_CATEGORIES = [
  "Audio",
  "TV",
  "Laptop",
  "Phone",
  "Tablet",
  "Accessories",
];

const OrderPage = () => {
  return (
    <>
      <PageHeader
        title="Sales Orders"
        description="Manage and track all generated orders."
        action={
          <FilterButton
            categories={DUMMY_CATEGORIES}
            defaultValue={DUMMY_CATEGORIES[0]}
            placeholder="Select category.."
          />
        }
      />
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Sales Rep</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <OrderTableRow />
        </TableBody>
      </Table>
    </>
  );
};

export default OrderPage;
