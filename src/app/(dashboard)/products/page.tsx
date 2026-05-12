"use client";

import FilterButton from "@/components/FilterButton";
import InputSearch from "@/components/InputSearch";
import PageHeader from "@/components/PageHeader";
import { useState } from "react";
import CardProduct from "./components/CardProduct";

const DUMMY_CATEGORIES = [
  "Audio",
  "TV",
  "Laptop",
  "Phone",
  "Tablet",
  "Accessories",
];

const DUMMY_PRODUCT = [
  {
    id: 1,
    productName: "Asus ROG GL552VW",
    productCategory: "Laptop",
    price: 1000,
    stock: 10,
    brand: "Asus",
  },
  {
    id: 2,
    productName: "Samsung Galaxy S24 Ultra",
    productCategory: "Smartphone",
    price: 1299,
    stock: 5,
    brand: "Samsung",
  },
  {
    id: 3,
    productName: "Sony WH-1000XM5",
    productCategory: "Audio",
    price: 350,
    stock: 20,
    brand: "Sony",
  },
  {
    id: 4,
    productName: "Logitech MX Master 3S",
    productCategory: "Accessories",
    price: 99,
    stock: 50,
    brand: "Logitech",
  },
  {
    id: 5,
    productName: "MacBook Air M2",
    productCategory: "Laptop",
    price: 1199,
    stock: 8,
    brand: "Apple",
  },
  {
    id: 6,
    productName: 'Samsung QLED 55"',
    productCategory: "TV",
    price: 799,
    stock: 3,
    brand: "Samsung",
  },
  {
    id: 7,
    productName: "iPad Pro 12.9",
    productCategory: "Tablet",
    price: 1099,
    stock: 15,
    brand: "Apple",
  },
  {
    id: 8,
    productName: "JBL Flip 6",
    productCategory: "Audio",
    price: 129,
    stock: 30,
    brand: "JBL",
  },
];

const ProductsPage = () => {
  const [categories, setCategories] = useState<string[]>(DUMMY_CATEGORIES);
  return (
    <>
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
      <div className="grid grid-cols-4 gap-6">
        {DUMMY_PRODUCT.map((product) => (
          <CardProduct key={product.id} {...product} />
        ))}
      </div>
    </>
  );
};

export default ProductsPage;
