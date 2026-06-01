export type InvoiceStatus = "paid" | "unpaid" | "overdue";

export interface Invoice {
  id: string;
  invoiceNumber: string;
  date: string;
  dueDate: string;
  customer: string;
  orderRef: string;
  status: InvoiceStatus;
  amount: number;
  category: string;
}

export const INVOICE_STATUS_CLASSES: Record<InvoiceStatus, string> = {
  paid: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
  unpaid: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  overdue: "bg-red-100 text-red-800 hover:bg-red-200",
};
