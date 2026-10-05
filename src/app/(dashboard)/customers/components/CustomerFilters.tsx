"use client";

import FilterButton from "@/components/FilterButton";
import InputSearch from "@/components/InputSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const STATUS_OPTIONS = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "all", label: "All" },
];

const CustomerFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  // Debounce: tunggu 300ms setelah user berhenti mengetik baru cari,
  // supaya tidak request ke server di setiap ketikan
  const handleSearchChange = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParam("q", value);
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleStatusChange = (value: string) => {
    if (value === "active") {
      updateParam("status", "");
    } else {
      updateParam("status", value);
    }
  };

  return (
    <>
      <InputSearch
        placeholder="Search customers..."
        defaultValue={searchParams.get("q") ?? ""}
        onChange={handleSearchChange}
      />
      <FilterButton
        categories={STATUS_OPTIONS}
        defaultValue={searchParams.get("status") ?? "active"}
        placeholder="Select status.."
        onValueChange={handleStatusChange}
      />
    </>
  );
};

export default CustomerFilters;
