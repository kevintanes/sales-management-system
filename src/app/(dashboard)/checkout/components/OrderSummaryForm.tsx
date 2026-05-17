"use client";

import FormField from "@/components/FormField";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideStore } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formSchema = z.object({
  customer: z.string(),
  salesName: z.string(),
  discount: z.number(),
  notes: z.string().optional(),
});

const DUMMY_CUSTOMERS = [
  {
    id: 1,
    storeName: "Toko Elektronik Maju",
  },
  {
    id: 2,
    storeName: "Serba Ada Elektronik",
  },
  {
    id: 3,
    storeName: "Cahaya Teknik",
  },
  {
    id: 4,
    storeName: "Mitra Jaya Electronics",
  },
  {
    id: 5,
    storeName: "Toko Listrik Sejahtera",
  },
  {
    id: 6,
    storeName: "Prima Elektronik",
  },
];

const OrderSummaryForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      customer: "",
      salesName: "",
      discount: 0,
      notes: "",
    },
  });

  return (
    <form>
      <FieldGroup>
        <Controller
          control={form.control}
          name="customer"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="customer">Customer Store</FieldLabel>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger
                  id="customer"
                  className="border-input text-foreground focus:ring-ring focus:border-ring focus-visible:ring-ring w-full rounded-2xl border px-3 py-1 shadow-sm focus:ring-1 focus:outline-none focus-visible:ring-1 focus-visible:outline-none"
                >
                  <SelectValue placeholder="Select category..." />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectGroup>
                    {DUMMY_CUSTOMERS.map(({ id, storeName }) => (
                      <SelectItem
                        value={storeName}
                        key={id}
                        className="focus:bg-primary/10"
                      >
                        <LucideStore className="text-muted-foreground" />
                        {storeName}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        <FormField
          control={form.control}
          name="salesName"
          label="Sales Rep Name"
          placeholder="John Doe"
          inputClassName="rounded-2xl bg-transparent"
        />
        <FormField
          control={form.control}
          name="discount"
          label="Discount"
          inputClassName="rounded-2xl bg-transparent"
          type="number"
        />
        <Controller
          control={form.control}
          name="notes"
          render={({ field }) => (
            <Field>
              <FieldLabel htmlFor="notes">Order Notes</FieldLabel>
              <Textarea
                id="notes"
                {...field}
                className="resize-none rounded-2xl"
                placeholder="Delivery instructions..."
              />
            </Field>
          )}
        />
        <div className="space-y-3 border-y py-4">
          <div className="text-muted-foreground flex justify-between">
            <span>Subtotal</span>
            <span>$5,999,000.00</span>
          </div>
          <div className="text-muted-foreground flex justify-between">
            <span>Estimated Tax (10%)</span>
            <span>$599,000</span>
          </div>
        </div>
        <div className="text-foreground flex justify-between text-lg font-bold">
          <span>Total</span>
          <span>$6,589,900.00</span>
        </div>
      </FieldGroup>
      <Button className="mt-6 h-12 w-full rounded-2xl text-base shadow-lg hover:-translate-y-1">
        Confirm & Create Invoice
      </Button>
    </form>
  );
};

export default OrderSummaryForm;
