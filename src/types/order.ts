export type OrderItemType = {
  id: string;
  sku: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  unit: string;
};

export type Order = {
  id: string;
  date: string;
  customerName: string;
  customerContact: string;
  salesRep: string;
  status: OrderStatus;
  total: number;
};

type OrderStatus = "Delivered" | "Processing" | "Pending" | "Cancelled";

export const ORDER_STATUS_CLASSES: Record<OrderStatus, string> = {
  Delivered: "bg-emerald-100 text-emerald-800 hover:bg-emerald-200",
  Pending: "bg-orange-100 text-orange-800 hover:bg-orange-200",
  Processing: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  Cancelled: "bg-red-100 text-red-800 hover:bg-red-200",
};
