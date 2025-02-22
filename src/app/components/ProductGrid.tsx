"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { Product } from "../types/product";
import { ProductCard } from "./product-card";
import { Filters } from "./filters";
import { GridLayoutControl } from "./grid-layout-control";

interface ProductGridProps {
  products: Product[];
  initialFilter?: string;
}

type GridLayout = 1 | 2 | 3 | 4;

export function ProductGrid({ products, initialFilter }: ProductGridProps) {
  // Calculate initial values
  const maxPrice = Math.max(...products.map((p) => p.OriginalPrice));
  const types = Array.from(
    new Set(products.map((p) => p.Type).filter(Boolean))
  );

  // State
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    initialFilter ? [initialFilter] : []
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, maxPrice]);
  const [gridLayout, setGridLayout] = useState<GridLayout>(4);
  const [isMobile, setIsMobile] = useState(false);

  // Filter products
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const typeMatch =
        selectedTypes.length === 0 || selectedTypes.includes(product.Type);
      const priceMatch =
        product.DiscountedPrice >= priceRange[0] &&
        product.DiscountedPrice <= priceRange[1];
      return typeMatch && priceMatch;
    });
  }, [products, selectedTypes, priceRange]);

  // Handle mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileView = window.innerWidth < 640;
      setIsMobile(isMobileView);
      if (isMobileView && gridLayout > 2) {
        setGridLayout(1);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [gridLayout]);

  const gridClasses = {
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  const FiltersContent = () => (
    <Filters
      types={types}
      selectedTypes={selectedTypes}
      onTypeChange={setSelectedTypes}
      priceRange={priceRange}
      onPriceRangeChange={setPriceRange}
      maxPrice={maxPrice}
    />
  );

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Desktop Filters */}
      <aside className="hidden md:block w-64 shrink-0">
        <div className="sticky top-4">
          <FiltersContent />
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex flex-col space-y-4">
          {/* Controls */}
          <div className="flex items-center justify-between">
            {/* Mobile Filter Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                </SheetHeader>
                <div className="mt-4">
                  <FiltersContent />
                </div>
              </SheetContent>
            </Sheet>

            <GridLayoutControl
              currentLayout={gridLayout}
              onLayoutChange={setGridLayout}
              isMobile={isMobile}
            />
          </div>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`grid ${gridClasses[gridLayout]} gap-6`}
          >
            <AnimatePresence mode="wait">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.Handle}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-muted-foreground mt-8"
            >
              No products match the selected filters.
            </motion.p>
          )}
        </div>
      </main>
    </div>
  );
}
