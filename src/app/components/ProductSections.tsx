"use client";

import { motion } from "framer-motion";
import ScrollableProductList from "./ScrollableProductList";
import { Product } from "../types/product";
import { getProducts } from "../lib/products";

const bestSellers: Array<Product> = [];
const newArrivals: Array<Product> = [];
const specialOffers: Array<Product> = [];
const productCollections: Array<Product> = [];

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};
export default function ProductSections() {
  // const products = await getProducts()

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { transition: { staggerChildren: 0.3 } },
      }}
    >
      <motion.section variants={sectionVariants}>
        <ScrollableProductList title="Best Sellers" products={bestSellers} />
      </motion.section>
      <motion.section variants={sectionVariants}>
        <ScrollableProductList title="New Arrivals" products={newArrivals} />
      </motion.section>
      <motion.section variants={sectionVariants}>
        <ScrollableProductList
          title="Special Offers"
          products={specialOffers}
        />
      </motion.section>
      <motion.section variants={sectionVariants}>
        <ScrollableProductList
          title="Product Collections"
          products={productCollections}
        />
      </motion.section>
    </motion.div>
  );
}
