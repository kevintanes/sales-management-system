import { Button } from "@/components/ui/button";
import { LucideShoppingCart } from "lucide-react";
import Image from "next/image";

type CardProductProps = {
  productName: string;
  productCategory: string;
  price: number;
  stock: number;
  brand: string;
};

const CardProduct = ({
  brand,
  price,
  productCategory,
  productName,
  stock,
}: CardProductProps) => {
  return (
    <div className="bg-card border-border/50 hover:border-primary/30 group flex flex-col overflow-hidden rounded-2xl border shadow-md transition-all duration-300 hover:shadow-xl">
      <div className="bg-muted/30 relative flex aspect-square items-center justify-center overflow-hidden p-6">
        <div className="absolute inset-6">
          <Image
            src="/advance-digitals.png"
            alt="Product Image"
            fill
            className="object-contain transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="bg-background/90 border-border absolute top-3 left-3 rounded-md border px-2 py-1 text-xs font-semibold shadow-sm">
          {brand}
        </div>
      </div>
      <div className="p-5">
        <div className="text-primary mb-1 text-xs font-medium tracking-wider uppercase">
          {productCategory}
        </div>
        <h3 className="text-foreground line-clamp-2 leading-tight font-bold">
          {productName}
        </h3>
        <div className="mt-4 mb-5 flex items-center justify-between">
          <div className="font-outfit text-foreground text-xl font-bold">
            ${price}
          </div>
          <div className="text-muted-foreground bg-muted rounded-md px-2 py-1 text-xs font-medium">
            Stock: {stock}
          </div>
        </div>
        <Button size="lg" className="w-full cursor-pointer" variant="primary">
          <LucideShoppingCart />
          Add to Order
        </Button>
      </div>
    </div>
  );
};

export default CardProduct;
