import FormDialog from "@/components/FormDialog";
import PageHeader from "@/components/PageHeader";
import ManageProductForm from "./components/ManageProductForm";

const ManageProductsPage = () => {
  return (
    <div>
      <PageHeader
        title="Manage Products"
        description="Add, edit, or remove products from the catalog."
        action={
          <FormDialog title="Add New Product" triggerLabel="Add Product">
            <ManageProductForm />
          </FormDialog>
        }
      />
    </div>
  );
};

export default ManageProductsPage;
