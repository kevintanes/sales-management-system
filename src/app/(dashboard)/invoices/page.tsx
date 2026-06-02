import FilterButton from "@/components/FilterButton";
import PageHeader from "@/components/PageHeader";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Invoice } from "@/types/invoice";
import InvoiceTableRow from "./components/InvoiceTableRow";

const DUMMY_CATEGORIES = [
  "Audio",
  "TV",
  "Laptop",
  "Phone",
  "Tablet",
  "Accessories",
];

const DUMMY_INVOICES: Invoice[] = [
  {
    id: "1",
    invoiceNumber: "INV-2025-001",
    date: "2025-05-01",
    dueDate: "2025-05-15",
    customer: "Budi Santoso",
    orderRef: "ORD-8821",
    status: "paid",
    amount: 4500000,
    category: "Laptop",
  },
  {
    id: "2",
    invoiceNumber: "INV-2025-002",
    date: "2025-05-03",
    dueDate: "2025-05-17",
    customer: "Rina Marlina",
    orderRef: "ORD-8834",
    status: "unpaid",
    amount: 1200000,
    category: "Phone",
  },
  {
    id: "3",
    invoiceNumber: "INV-2025-003",
    date: "2025-04-20",
    dueDate: "2025-05-04",
    customer: "PT Maju Bersama",
    orderRef: "ORD-8790",
    status: "overdue",
    amount: 8750000,
    category: "TV",
  },
  {
    id: "4",
    invoiceNumber: "INV-2025-004",
    date: "2025-05-05",
    dueDate: "2025-05-19",
    customer: "Dewi Kusuma",
    orderRef: "ORD-8847",
    status: "paid",
    amount: 650000,
    category: "Accessories",
  },
  {
    id: "5",
    invoiceNumber: "INV-2025-005",
    date: "2025-05-07",
    dueDate: "2025-05-21",
    customer: "CV Terang Jaya",
    orderRef: "ORD-8851",
    status: "paid",
    amount: 3200000,
    category: "Audio",
  },
  {
    id: "6",
    invoiceNumber: "INV-2025-006",
    date: "2025-04-25",
    dueDate: "2025-05-09",
    customer: "Ahmad Fauzi",
    orderRef: "ORD-8803",
    status: "overdue",
    amount: 5900000,
    category: "Tablet",
  },
  {
    id: "7",
    invoiceNumber: "INV-2025-007",
    date: "2025-05-10",
    dueDate: "2025-05-24",
    customer: "Siti Nurhaliza",
    orderRef: "ORD-8862",
    status: "unpaid",
    amount: 980000,
    category: "Accessories",
  },
  {
    id: "8",
    invoiceNumber: "INV-2025-008",
    date: "2025-05-12",
    dueDate: "2025-05-26",
    customer: "PT Solusi Digital",
    orderRef: "ORD-8875",
    status: "paid",
    amount: 12400000,
    category: "Laptop",
  },
];

const InvoicePage = () => {
  return (
    <>
      <PageHeader
        title="Invoices"
        description="Manage billing and print official invoices."
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
            <TableHead>Invoice #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Order Ref</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Amount</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {DUMMY_INVOICES.map((invoice) => (
            <InvoiceTableRow key={invoice.id} {...invoice} />
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default InvoicePage;
