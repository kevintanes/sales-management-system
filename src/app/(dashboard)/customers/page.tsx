import FormDialog from "@/components/FormDialog";
import InputSearch from "@/components/InputSearch";
import PageHeader from "@/components/PageHeader";
import CustomerCard from "./components/CustomerCard";
import CustomerForm from "./components/CustomerForm";

const CustomerPage = () => {
  return (
    <div>
      <PageHeader
        title="Customers"
        description="Manage retail stores and client relationships."
        action={
          <>
            <InputSearch />
            <FormDialog
              title="Add New Customer Store"
              triggerLabel="Add Customer"
            >
              <CustomerForm />
            </FormDialog>
          </>
        }
      />

      <div className="grid grid-cols-3 gap-6">
        <CustomerCard />
        <CustomerCard />
        <CustomerCard />
        <CustomerCard />
        <CustomerCard />
        <CustomerCard />
        <CustomerCard />
        <CustomerCard />
        <CustomerCard />
      </div>
    </div>
  );
};

export default CustomerPage;
