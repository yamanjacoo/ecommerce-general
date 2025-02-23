"use client";

import { motion } from "framer-motion";
import ScrollableProductList from "./ScrollableProductList";
import { Product } from "../types/product";
import { getProducts } from "../lib/products";

interface ProductInterface {
  product: Product[];
}
const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
export default function ProductSections({ product }: ProductInterface) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.3 } },
      }}
    >
      <ScrollableProductList
        title="Best Sellers"
        products={product.slice(0, 40)}
      />
      <ScrollableProductList
        title="New Arrivals"
        products={product.slice(40, 80)}
      />
    </motion.div>
  );
}
