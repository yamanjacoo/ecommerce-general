"use client";

import { useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import { Product } from "../types/product";

interface ScrollableProductListProps {
  title: string;
  products: Product[];
}

export default function ScrollableProductList({
  title,
  products,
}: ScrollableProductListProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const controls = useAnimation();

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  if (products.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-8">{title}</h2>
          <div className="text-center text-gray-500 py-12">
            No products available in this category yet.
          </div>
        </div>
      </section>
    );
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === "left" ? -400 : 400;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      checkScroll();
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => scroll("left")}
              className={`p-2 rounded-full ${
                canScrollLeft
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-400"
              } transition-colors duration-300`}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => scroll("right")}
              className={`p-2 rounded-full ${
                canScrollRight
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-gray-400"
              } transition-colors duration-300`}
              disabled={!canScrollRight}
              aria-label="Scroll right"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
        <motion.div
          ref={scrollContainerRef}
          className="flex overflow-x-auto space-x-6 pb-4 scrollbar-hide"
          onScroll={checkScroll}
          animate={controls}
          whileTap={{ cursor: "grabbing" }}
        >
          {products.map((product) => (
            <motion.div
              key={product.Handle}
              className="flex-shrink-0 w-64"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ProductCard
                id={product.Handle}
                name={product.Title}
                price={product.DiscountedPrice}
                image={product.Images[0].src}
                rating={product.Rating}
                category={product.GoogleCategory as string}
                {...product}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
