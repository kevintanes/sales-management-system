"use client";

import FilterButton from "@/components/FilterButton";
import InputSearch from "@/components/InputSearch";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";

const DUMMY_CATEGORIES = [
  "Audio",
  "TV",
  "Laptop",
  "Phone",
  "Tablet",
  "Accessories",
];

const ProductsPage = () => {
  const [categories, setCategories] = useState<string[]>(DUMMY_CATEGORIES);
  return (
    <PageHeader
      title="Product Catalog"
      description="Browse and add products to sales orders."
      action={
        <>
          <InputSearch placeholder="Search products.." />
          <FilterButton
            categories={categories}
            defaultValue={categories[0]}
            placeholder="Select category.."
          />
        </>
      }
    />
  );
};

export default ProductsPage;
