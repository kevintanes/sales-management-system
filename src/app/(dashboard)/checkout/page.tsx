import PageHeader from "@/components/PageHeader";
import OrderSummaryForm from "./components/OrderSummaryForm";

const CheckoutPage = () => {
  return (
    <>
      <PageHeader
        title="Checkout"
        description="Review items and finalize the sales order."
      />
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 bg-yellow-900">grid kiri</div>
        <div className="col-span-1">
          <div className="text-card-foreground border-border/50 bg-card rounded-2xl border shadow-lg">
            <div className="font-outfit border-b p-6 text-xl font-semibold tracking-tight">
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
