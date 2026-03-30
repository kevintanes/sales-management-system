"use client";

import Card from "@/components/Card";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import useSidebar from "@/hooks/useSidebar";
import Link from "next/link";
import { ReactNode } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FaArrowTrendUp } from "react-icons/fa6";
import { LuShoppingCart } from "react-icons/lu";
import { MdArrowForward } from "react-icons/md";
import { RxPeople } from "react-icons/rx";

type CardItemsProps = {
  title: string;
  sum: string;
  icon: ReactNode;
  iconColor: string;
  backgroundColor: string;
};

const CARD_ITEMS: CardItemsProps[] = [
  {
    title: "Total Revenue",
    backgroundColor: "bg-blue-100",
    iconColor: "text-blue-600",
    icon: <FaArrowTrendUp />,
    sum: "$81,345,240.00",
  },
  {
    title: "Total Orders",
    backgroundColor: "bg-purple-100",
    iconColor: "text-purple-600",
    icon: <LuShoppingCart />,
    sum: "2",
  },
  {
    title: "Pending Orders",
    backgroundColor: "bg-orange-100",
    iconColor: "text-orange-600",
    icon: <BsBoxSeam />,
    sum: "1",
  },
  {
    title: "Total Customers",
    backgroundColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
    icon: <RxPeople />,
    sum: "6",
  },
];

export default function Dashboard() {
  const { isOpen, toggle } = useSidebar();

  return (
    <div className="flex">
      <Sidebar isOpen={isOpen} />
      <div className="flex flex-1 flex-col">
        <Navbar onToggleSidebar={toggle} />
        <main className="w-full p-6 lg:p-8">
          <div className="mx-auto max-w-7xl space-y-8">
            <div>
              <h1 className="font-outfit text-foreground text-3xl font-bold">
                Dashboard Overview
              </h1>
              <p className="text-muted-foreground mt-1">
                Welcome back. Here&apos;s what&apos;s happening with Advance
                Digitals today.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {CARD_ITEMS.map(
                ({ title, backgroundColor, icon, iconColor, sum }) => (
                  <Card
                    key={title}
                    className="bg-card text-card-foreground flex items-center justify-between rounded-xl border p-6 shadow-md hover:-translate-y-1"
                  >
                    <div>
                      <p className="text-muted-foreground mb-1 text-sm font-medium">
                        {title}
                      </p>
                      <h3 className="font-outfit text-foreground text-2xl font-bold">
                        {sum}
                      </h3>
                    </div>
                    <div
                      className={`size-12 rounded-xl p-3 ${backgroundColor}`}
                    >
                      <span className={`text-2xl ${iconColor}`}>{icon}</span>
                    </div>
                  </Card>
                ),
              )}
            </div>
            <div className="flex gap-8">
              {/* graph */}
              <div className="bg-card flex-2 flex-col rounded-2xl shadow-md">
                asdaf
              </div>

              {/* recent orders */}
              <div className="bg-card flex-1 rounded-b-2xl shadow-md">
                <div className="border-border/50 flex justify-between border-b p-6">
                  <div className="font-outfit font-semibold">Recent Orders</div>
                  <Link
                    href="/orders"
                    className="text-primary font-outfit flex items-center gap-1 text-sm font-medium hover:underline"
                  >
                    View All
                    <span className="text-base">
                      <MdArrowForward />
                    </span>
                  </Link>
                </div>
                <div className="max-h-100 overflow-auto">
                  <div className="divide-border/50 divide-y">
                    <Link
                      href={`/orders/2`}
                      className="hover:bg-muted/50 block p-4 transition-colors"
                    >
                      <div className="mb-1 flex justify-between">
                        <p className="text-foreground font-semibold">
                          ORD-20260322-9487
                        </p>
                        <div className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                          Delivered
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Toko Cahaya Elektronik
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">
                          Mar 22, 2026
                        </span>
                        <span className="text-primary font-medium">
                          $33,297,780.00
                        </span>
                      </div>
                    </Link>
                    <Link
                      href={`/orders/2`}
                      className="hover:bg-muted/50 block p-4 transition-colors"
                    >
                      <div className="mb-1 flex justify-between">
                        <p className="text-foreground font-semibold">
                          ORD-20260322-9487
                        </p>
                        <div className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                          Delivered
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Toko Cahaya Elektronik
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">
                          Mar 22, 2026
                        </span>
                        <span className="text-primary font-medium">
                          $33,297,780.00
                        </span>
                      </div>
                    </Link>
                    <Link
                      href={`/orders/2`}
                      className="hover:bg-muted/50 block p-4 transition-colors"
                    >
                      <div className="mb-1 flex justify-between">
                        <p className="text-foreground font-semibold">
                          ORD-20260322-9487
                        </p>
                        <div className="inline-flex items-center rounded-xl border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
                          Delivered
                        </div>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        Toko Cahaya Elektronik
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-muted-foreground text-xs">
                          Mar 22, 2026
                        </span>
                        <span className="text-primary font-medium">
                          $33,297,780.00
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
