import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import { normalizePhone } from "@/lib/validations/customer";
import AddCustomerButton from "./components/AddCustomerButton";
import CustomerCard from "./components/CustomerCard";
import CustomerFilters from "./components/CustomerFilters";

const PAGE_SIZE = 9;

type CustomerPageProps = {
  searchParams: Promise<{ q?: string; status?: string; page?: string }>;
};

const CustomerPage = async ({ searchParams }: CustomerPageProps) => {
  const me = await requireRole(["SUPERADMIN", "ADMIN", "SALES"]);
  const params = await searchParams;

  const q = params.q?.trim() || "";

  let status = "active";
  if (params.status === "inactive" || params.status === "all") {
    status = params.status;
  }

  let page = Number(params.page) || 1;
  if (page < 1) {
    page = 1;
  }

  const where: Prisma.CustomerWhereInput = {};

  if (q) {
    where.OR = [
      { storeName: { contains: q, mode: "insensitive" } },
      { ownerName: { contains: q, mode: "insensitive" } },
      { phone: { contains: normalizePhone(q) } },
      { city: { contains: q, mode: "insensitive" } },
    ];
  }

  if (status === "active") {
    where.isActive = true;
  } else if (status === "inactive") {
    where.isActive = false;
  }

  const [customers, total] = await prisma.$transaction([
    prisma.customer.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        storeName: true,
        ownerName: true,
        phone: true,
        email: true,
        address: true,
        city: true,
        isActive: true,
      },
    }),
    prisma.customer.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const canManageStatus = me.role === "SUPERADMIN" || me.role === "ADMIN";

  return (
    <div>
      <PageHeader
        title="Customers"
        description="Manage retail stores and client relationships."
        action={
          <>
            <CustomerFilters />
            <AddCustomerButton />
          </>
        }
      />

      {customers.length === 0 ? (
        <p className="text-muted-foreground p-6 text-center">
          Tidak ada customer
        </p>
      ) : (
        <div className="grid grid-cols-3 gap-6">
          {customers.map((customer) => (
            <CustomerCard
              key={customer.id}
              customer={customer}
              canManageStatus={canManageStatus}
            />
          ))}
        </div>
      )}
      <div className="mt-6">
        <Pagination
          page={page}
          totalPages={totalPages}
          basePath="/customers"
          searchParams={params}
        />
      </div>
    </div>
  );
};

export default CustomerPage;
