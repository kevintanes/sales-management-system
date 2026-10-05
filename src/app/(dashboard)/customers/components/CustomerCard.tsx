"use client";

import ConfirmDialog from "@/components/ConfirmDialog";
import FormDialog from "@/components/FormDialog";
import { Button } from "@/components/ui/button";
import {
  LucideMail,
  LucideMapPin,
  LucidePen,
  LucidePhone,
  LucideStore,
  StoreIcon,
  X,
} from "lucide-react";
import { useState, useTransition } from "react";
import { setCustomerActiveAction } from "../actions";
import CustomerForm from "./CustomerForm";

type CustomerCardData = {
  id: string;
  storeName: string;
  ownerName: string;
  phone: string;
  email: string | null;
  address: string;
  city: string;
  isActive: boolean;
};

type CustomerCardProps = {
  customer: CustomerCardData;
  canManageStatus: boolean;
};

const CustomerCard = ({ customer, canManageStatus }: CustomerCardProps) => {
  const [editOpen, setEditOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [statusError, setStatusError] = useState<string | null>(null);

  const handleToggleActive = () => {
    startTransition(async () => {
      const result = await setCustomerActiveAction(
        customer.id,
        !customer.isActive,
      );
      if (!result.success) {
        setStatusError(result.error);
      } else {
        setStatusError(null);
      }
    });
  };

  return (
    <div
      className={`bg-card text-card-foreground border-border/50 group overflow-hidden rounded-xl border shadow-sm transition-all duration-200 hover:-translate-y-0.5 ${customer.isActive ? "" : "opacity-60"}`}
    >
      <div className="bg-primary/20 group-hover:bg-primary h-2 w-full transition-colors" />
      <div className="p-6">
        <div className="mb-4 flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            <div className="text-primary bg-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
              <LucideStore className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-outfit text-lg leading-tight font-bold">
                {customer.storeName}
              </h3>
              <p className="text-muted-foreground text-sm">
                {customer.ownerName}
              </p>
            </div>
          </div>
          <span
            className={`shrink-0 rounded-xl px-2 py-1 text-xs font-medium ${
              customer.isActive
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {customer.isActive ? "Active" : "Inactive"}
          </span>
        </div>
        <div className="border-border/50 space-y-2 border-t pt-4 text-sm">
          <div className="text-muted-foreground flex items-center gap-3">
            <LucidePhone className="size-4 opacity-70" />
            <span className="text-foreground">{customer.phone}</span>
          </div>
          {customer.email && (
            <div className="text-muted-foreground flex items-center gap-3">
              <LucideMail className="size-4 opacity-70" />
              <span className="text-foreground truncate">{customer.email}</span>
            </div>
          )}
          <div className="text-muted-foreground flex gap-3">
            <LucideMapPin className="size-4 shrink-0 opacity-70" />
            <div>
              <span className="text-foreground line-clamp-2">
                {customer.address}
              </span>
              <span>{customer.city}</span>
            </div>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <FormDialog
            title="Edit Customer"
            open={editOpen}
            onOpenChange={setEditOpen}
            trigger={
              <Button
                variant="ghost"
                className="text-blue-600 hover:-translate-y-0.5 hover:bg-blue-50 hover:text-blue-800 hover:shadow-md"
                size="icon-lg"
              >
                <LucidePen />
              </Button>
            }
          >
            <CustomerForm
              mode="edit"
              customerId={customer.id}
              defaultValues={{
                storeName: customer.storeName,
                ownerName: customer.ownerName,
                phone: customer.phone,
                email: customer.email ?? "",
                address: customer.address,
                city: customer.city,
              }}
              onSuccess={() => setEditOpen(false)}
            />
          </FormDialog>
          {canManageStatus && (
            <ConfirmDialog
              trigger={
                <Button
                  variant="ghost"
                  className={
                    customer.isActive
                      ? "text-red-600 hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-800 hover:shadow-md"
                      : "text-green-600 hover:-translate-y-0.5 hover:bg-green-50 hover:text-green-800 hover:shadow-md"
                  }
                  size="icon-lg"
                  disabled={isPending}
                >
                  {customer.isActive ? <X /> : <StoreIcon />}
                </Button>
              }
              title={
                customer.isActive ? "Nonaktifkan Customer" : "Aktifkan Customer"
              }
              description={
                customer.isActive
                  ? `Apakah Anda yakin ingin menonaktifkan ${customer.storeName}?`
                  : `Apakah Anda yakin ingin mengaktifkan kembali ${customer.storeName}?`
              }
              confirmLabel={customer.isActive ? "Nonaktifkan" : "Aktifkan"}
              variant={customer.isActive ? "danger" : "default"}
              onConfirm={handleToggleActive}
            />
          )}
        </div>
        {statusError && (
          <p className="text-destructive mt-1 text-right text-xs">
            {statusError}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomerCard;
