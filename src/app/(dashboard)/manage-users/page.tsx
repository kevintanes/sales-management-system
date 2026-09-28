import PageHeader from "@/components/PageHeader";
import Pagination from "@/components/Pagination";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { requireRole } from "@/lib/auth/require-role";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@/generated/prisma/client";
import AddUserButton from "./components/AddUserButton";
import UserFilters from "./components/UserFilters";
import UserTableRow from "./components/UserTableRow";

const PAGE_SIZE = 10;

const ROLE_VALUES = ["SUPERADMIN", "ADMIN", "SALES"];

type ManageUsersPageProps = {
  searchParams: Promise<{ q?: string; role?: string; page?: string }>;
};

const ManageUsersPage = async ({ searchParams }: ManageUsersPageProps) => {
  const me = await requireRole(["SUPERADMIN", "ADMIN"]);
  const params = await searchParams;

  const q = params.q?.trim() || "";
  const role = ROLE_VALUES.includes(params.role ?? "")
    ? params.role
    : undefined;
  const page = Math.max(1, Number(params.page) || 1);

  const where: Prisma.UserWhereInput = {
    ...(q && {
      OR: [
        { name: { contains: q, mode: "insensitive" } },
        { username: { contains: q, mode: "insensitive" } },
        { email: { contains: q, mode: "insensitive" } },
      ],
    }),
    ...(role && { role: role as Prisma.UserWhereInput["role"] }),
  };

  const [users, total] = await prisma.$transaction([
    prisma.user.findMany({
      where,
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
      select: {
        id: true,
        name: true,
        username: true,
        email: true,
        role: true,
        isActive: true,
      },
    }),
    prisma.user.count({ where }),
  ]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  return (
    <div>
      <PageHeader
        title="Manage Users"
        description="Add, edit, or deactivate user accounts."
        action={
          <>
            <UserFilters />
            <AddUserButton currentUserRole={me.role} />
          </>
        }
      />
      <Table>
        <TableHeader className="bg-muted/50">
          <TableRow>
            <TableHead>User</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <td colSpan={5} className="text-muted-foreground p-6 text-center">
                Tidak ada user
              </td>
            </TableRow>
          ) : (
            users.map((user) => (
              <UserTableRow
                key={user.id}
                user={user}
                currentUserId={me.userId}
                currentUserRole={me.role}
              />
            ))
          )}
        </TableBody>
      </Table>
      <div className="mt-6">
        <Pagination
          page={page}
          totalPages={totalPages}
          basePath="/manage-users"
          searchParams={params}
        />
      </div>
    </div>
  );
};

export default ManageUsersPage;
