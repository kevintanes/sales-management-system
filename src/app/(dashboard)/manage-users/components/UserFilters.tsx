"use client";

import FilterButton from "@/components/FilterButton";
import InputSearch from "@/components/InputSearch";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

const ROLE_OPTIONS = [
  { value: "all", label: "All" },
  { value: "SUPERADMIN", label: "Superadmin" },
  { value: "ADMIN", label: "Admin" },
  { value: "SALES", label: "Sales" },
];

const UserFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const updateParams = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    });
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleSearchChange = (value: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      updateParams({ q: value || undefined });
    }, 300);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const handleRoleChange = (value: string) => {
    updateParams({ role: value === "all" ? undefined : value });
  };

  return (
    <>
      <InputSearch
        placeholder="Search users..."
        defaultValue={searchParams.get("q") ?? ""}
        onChange={handleSearchChange}
      />
      <FilterButton
        categories={ROLE_OPTIONS}
        defaultValue={searchParams.get("role") ?? "all"}
        placeholder="Select role.."
        onValueChange={handleRoleChange}
      />
    </>
  );
};

export default UserFilters;
