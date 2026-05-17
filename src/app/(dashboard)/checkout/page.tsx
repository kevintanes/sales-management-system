import PageHeader from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  LucideMinus,
  LucidePlus,
  LucideShoppingBag,
  LucideTrash2,
} from "lucide-react";
import Image from "next/image";
import OrderSummaryForm from "./components/OrderSummaryForm";

const CheckoutPage = () => {
  return (
    <>
      <PageHeader
        title="Checkout"
        description="Review items and finalize the sales order."
      />
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <div className="bg-card border-border rounded-2xl border shadow-lg">
            <div className="font-outfit flex items-center gap-2 p-6 text-xl font-semibold tracking-tight">
              <LucideShoppingBag className="size-5" />
              Order Items (1)
            </div>
            <div>
              <div className="hover:bg-muted/30 flex items-center justify-between border-t p-6 transition-colors">
                <div className="flex items-center gap-6">
                  <div className="bg-muted/50 border-border relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl border">
                    {/* <span className="text-muted-foreground text-xs font-semibold">
                      AD
                    </span> */}
                    <Image
                      src="/advance-digitals.png"
                      alt="Product Image"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-primary text-xs font-medium">
                      OPP-RN11-256
                    </p>
                    <h4 className="text-foreground font-semibold">
                      Oppo Reno 11
                    </h4>
                    <p className="text-muted-foreground text-sm">
                      $5,999,000 / unit
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="bg-background border-border flex items-center rounded-lg border shadow-sm">
                    <Button size="icon-lg" variant="ghost">
                      <LucideMinus />
                    </Button>
                    <span className="w-12 text-center text-sm font-medium">
                      1
                    </span>
                    <Button size="icon-lg" variant="ghost">
                      <LucidePlus />
                    </Button>
                  </div>
                  <div className="text-foreground font-bold">$5,999,00.00</div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="hover:bg-destructive/10 hover:text-destructive transition-all hover:-translate-y-0.5"
                  >
                    <LucideTrash2 />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-1">
          <div className="text-card-foreground border-border/50 bg-card rounded-2xl border shadow-lg">
            <div className="font-outfit border-b px-6 pt-6 pb-4 text-xl font-semibold tracking-tight">
              Order Summary
            </div>
            <div className="p-6">
              <OrderSummaryForm />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckoutPage;
