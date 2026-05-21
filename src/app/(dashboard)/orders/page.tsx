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
import { Order } from "@/types/order";

const DUMMY_CATEGORIES = [
  "Audio",
  "TV",
  "Laptop",
  "Phone",
  "Tablet",
  "Accessories",
];

export const DUMMY_ORDERS: Order[] = [
  {
    id: "ORD-20260322-9487",
    date: "Mar 22, 2026",
    customerName: "Toko Cahaya Elektronik",
    customerContact: "Rina Permata",
    salesRep: "John",
    status: "Delivered",
    total: 48047460,
  },
  {
    id: "ORD-20260318-7723",
    date: "Mar 18, 2026",
    customerName: "CV Maju Bersama",
    customerContact: "Budi Santoso",
    salesRep: "Sarah",
    status: "Processing",
    total: 12500000,
  },
  {
    id: "ORD-20260315-6201",
    date: "Mar 15, 2026",
    customerName: "PT Sejahtera Abadi",
    customerContact: "Dewi Lestari",
    salesRep: "John",
    status: "Pending",
    total: 75300000,
  },
  {
    id: "ORD-20260310-5544",
    date: "Mar 10, 2026",
    customerName: "Toko Terang Jaya",
    customerContact: "Agus Wibowo",
    salesRep: "Michael",
    status: "Cancelled",
    total: 9800000,
  },
  {
    id: "ORD-20260307-4812",
    date: "Mar 7, 2026",
    customerName: "UD Karya Mandiri",
    customerContact: "Siti Rahayu",
    salesRep: "Sarah",
    status: "Delivered",
    total: 33750000,
  },
  {
    id: "ORD-20260301-3390",
    date: "Mar 1, 2026",
    customerName: "PT Global Nusantara",
    customerContact: "Hendra Wijaya",
    salesRep: "Michael",
    status: "Delivered",
    total: 120000000,
  },
  {
    id: "ORD-20260225-2871",
    date: "Feb 25, 2026",
    customerName: "Toko Sinar Mas",
    customerContact: "Yuni Astuti",
    salesRep: "John",
    status: "Delivered",
    total: 6450000,
  },
  {
    id: "ORD-20260220-1954",
    date: "Feb 20, 2026",
    customerName: "CV Berkah Elektronik",
    customerContact: "Rudi Hartono",
    salesRep: "Sarah",
    status: "Processing",
    total: 28900000,
  },
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
          {DUMMY_ORDERS.map((order) => (
            <OrderTableRow key={order.id} {...order} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default OrderPage;
