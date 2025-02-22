"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "../app/types/product";

interface CartContextType {
  product: Product | null;
  setProduct: (product: Product) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<Product | null>(null);

  return (
    <CartContext.Provider value={{ product, setProduct }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
