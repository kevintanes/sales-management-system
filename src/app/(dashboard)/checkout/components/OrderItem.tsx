import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/format";
import type { OrderItemType } from "@/types/order";
import { LucideMinus, LucidePlus, LucideTrash2 } from "lucide-react";
import Image from "next/image";

const OrderItem = ({
  name,
  price,
  quantity,
  sku,
  unit,
  image,
}: OrderItemType) => {
  return (
    <div className="hover:bg-muted/30 flex items-center justify-between border-t p-6 transition-colors">
      <div className="flex items-center gap-6">
        <div className="bg-muted/50 border-border relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border">
          {image ? (
            <Image src={image} alt={name} fill className="object-cover" />
          ) : (
            <span className="text-muted-foreground text-xs font-semibold">
              {name.slice(0, 2).toUpperCase()}
            </span>
          )}
        </div>
        <div>
          <p className="text-primary text-xs font-medium">{sku}</p>
          <h4 className="text-foreground font-semibold">{name}</h4>
          <p className="text-muted-foreground text-sm">
            {formatCurrency(price)} / {unit}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="bg-background border-border flex items-center rounded-lg border shadow-sm">
          <Button size="icon-lg" variant="ghost">
            <LucideMinus />
          </Button>
          <span className="w-12 text-center text-sm font-medium">
            {quantity}
          </span>
          <Button size="icon-lg" variant="ghost">
            <LucidePlus />
          </Button>
        </div>
        <div className="text-foreground w-32 text-right font-bold">
          {formatCurrency(price * quantity)}
        </div>
        <Button
          size="icon"
          variant="ghost"
          className="hover:bg-destructive/10 hover:text-destructive transition-all hover:-translate-y-0.5"
        >
          <LucideTrash2 />
        </Button>
      </div>
    </div>
  );
};

export default OrderItem;
