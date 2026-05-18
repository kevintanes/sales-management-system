import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { LucideEye } from "lucide-react";

const OrderTableRow = () => {
  return (
    <TableRow className="h-18 text-sm">
      <TableCell className="font-medium">ORD-20260322-9487</TableCell>
      <TableCell className="text-muted-foreground">Mar 22, 2026</TableCell>
      <TableCell>
        <p className="font-medium">Toko Cahaya Elektronik</p>
        <p className="text-muted-foreground text-xs">Rina Permata</p>
      </TableCell>
      <TableCell>john</TableCell>
      <TableCell>
        <div className="inline-flex rounded-md bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold whitespace-nowrap text-emerald-800 transition-all hover:-translate-y-0.5 hover:bg-emerald-200 hover:shadow-md">
          Delivered
        </div>
      </TableCell>
      <TableCell className="text-right font-semibold">$48,047,460.00</TableCell>
      <TableCell className="text-right">
        <Button
          className="hover:bg-primary/10 hover:text-primary rounded-lg hover:-translate-y-0.5"
          size="icon-lg"
          variant="ghost"
        >
          <LucideEye />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default OrderTableRow;
