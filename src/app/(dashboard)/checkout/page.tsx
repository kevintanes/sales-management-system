import PageHeader from "@/components/PageHeader";
import { LucideShoppingBag } from "lucide-react";
import OrderItem from "./components/OrderItem";
import OrderSummaryForm from "./components/OrderSummaryForm";
import type { OrderItemType } from "@/types/order";

const DUMMY_ORDER_ITEMS: OrderItemType[] = [
  {
    id: "1",
    sku: "OPP-RN11-256",
    name: "Oppo Reno 11",
    price: 5999000,
    quantity: 1,
    image: "/advance-digitals.png",
    unit: "unit",
  },
  {
    id: "2",
    sku: "SAM-S24-128",
    name: "Samsung Galaxy S24",
    price: 12999000,
    quantity: 2,
    unit: "unit",
  },
  {
    id: "3",
    sku: "XIA-14P-256",
    name: "Xiaomi 14 Pro",
    price: 8499000,
    quantity: 1,
    unit: "pcs",
  },
];

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
              Order Items ({DUMMY_ORDER_ITEMS.length})
            </div>
            {DUMMY_ORDER_ITEMS.map((orderItem) => (
              <OrderItem key={orderItem.id} {...orderItem} />
            ))}
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
