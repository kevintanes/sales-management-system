import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { INVOICE_STATUS_CLASSES, type Invoice } from "@/types/invoice";
import { LucideFileText } from "lucide-react";
import Link from "next/link";

const InvoiceTableRow = ({
  amount,
  customer,
  date,
  dueDate,
  invoiceNumber,
  orderRef,
  status,
}: Invoice) => {
  const statusClass = INVOICE_STATUS_CLASSES[status];

  return (
    <TableRow className="h-18 text-sm">
      <TableCell className="font-medium">{invoiceNumber}</TableCell>
      <TableCell className="text-muted-foreground">{date}</TableCell>
      <TableCell className="text-destructive font-medium">{dueDate}</TableCell>
      <TableCell className="font-medium">{customer}</TableCell>
      <TableCell>
        <Link href={`/orders`} className="text-primary hover:underline">
          {orderRef}
        </Link>
      </TableCell>
      <TableCell>
        <div
          className={`inline-flex rounded-md px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-all hover:-translate-y-0.5 hover:shadow-md ${statusClass}`}
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </TableCell>
      <TableCell className="text-right font-semibold">
        {formatCurrency(amount)}
      </TableCell>
      <TableCell className="text-right">
        <Button
          className="hover:text-primary hover:bg-primary/10 bg-clip-border transition-all hover:-translate-y-0.5 hover:shadow-md"
          variant="ghost"
          size="lg"
        >
          <LucideFileText />
          View
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default InvoiceTableRow;
