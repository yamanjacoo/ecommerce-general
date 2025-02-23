"use client";

import { useRef } from "react";
import { Product } from "../app/types/product";
import { useProductStore } from "../app/stores/productProvider";

export function ProductsProvider({ products }: { products: Product[] }) {
  const initialized = useRef(false);

  if (!initialized.current) {
    useProductStore.getState().setProducts(products);
    initialized.current = true;
  }

  return null;
}
