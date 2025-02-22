"use client"

import { motion } from "framer-motion"
import { ProductCard } from "../product-card" // Changed from "@/app/components/product-card"
import type { Product } from "../../types/product" // Changed from "@/app/types/product"

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">Related Products</h2>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {products.map((product) => (
          <ProductCard key={product.Handle} product={product} />
        ))}
      </motion.div>
    </section>
  )
}

