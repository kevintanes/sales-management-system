import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { ORDER_STATUS_CLASSES, type Order } from "@/types/order";
import { LucideEye } from "lucide-react";
import Link from "next/link";

const OrderTableRow = ({
  customerContact,
  customerName,
  date,
  salesRep,
  status,
  total,
  id,
}: Order) => {
  const statusClass = ORDER_STATUS_CLASSES[status];

  return (
    <TableRow className="h-18 text-sm">
      <TableCell className="font-medium">{id}</TableCell>
      <TableCell className="text-muted-foreground">{date}</TableCell>
      <TableCell>
        <p className="font-medium">{customerName}</p>
        <p className="text-muted-foreground text-xs">{customerContact}</p>
      </TableCell>
      <TableCell>{salesRep}</TableCell>
      <TableCell>
        <div
          className={`inline-flex rounded-md px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap transition-all hover:-translate-y-0.5 hover:shadow-md ${statusClass}`}
        >
          {status}
        </div>
      </TableCell>
      <TableCell className="text-right font-semibold">
        {formatCurrency(total)}
      </TableCell>
      <TableCell className="text-right">
        <Link href={`/orders/${id}`}>
          <Button
            className="hover:bg-primary/10 hover:text-primary rounded-lg hover:-translate-y-0.5"
            size="icon-lg"
            variant="ghost"
          >
            <LucideEye />
          </Button>
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default OrderTableRow;
