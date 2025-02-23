"use client";

import { motion } from "framer-motion";
import ScrollableProductList from "./ScrollableProductList";
import { Product } from "../types/product";

interface ProductInterface {
  product: Product[];
}

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProductSections({ product }: ProductInterface) {
  const sections = [
    "Best Sellers",
    "New Arrivals",
    "Hot Deals",
    "Trending now",
  ];
  const chunkSize = Math.ceil(product.length / sections.length);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.3 } },
      }}
    >
      {sections.map((title, index) => (
        <ScrollableProductList
          key={title}
          title={title}
          products={product.slice(index * chunkSize, (index + 1) * chunkSize)}
        />
      ))}
    </motion.div>
  );
}
