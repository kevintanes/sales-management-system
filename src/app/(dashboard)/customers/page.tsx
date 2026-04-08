import InputSearch from "@/components/InputSearch";
import { Button } from "@/components/ui/button";
import { MdAdd } from "react-icons/md";

const CustomerPage = () => {
  return (
    <div className="mx-auto max-w-7xl">
      <div className="flex justify-between">
        <div>
          <h1 className="text-foreground font-outfit text-3xl font-bold">
            Customers
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage retail stores and client relationships.
          </p>
        </div>
        <div className="flex items-end gap-3">
          <InputSearch />
          <Button className="bg-primary text-primary-foreground min-h-10 gap-2 rounded-2xl px-4 py-2 font-medium shadow-sm transition-all duration-200 hover:-translate-y-0.5">
            <MdAdd className="mr-2" /> Add Customer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CustomerPage;
