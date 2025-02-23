"use client";

import { useState } from "react";
import { ProductGrid } from "../components/ProductGrid";
import { getProducts } from "../lib/products";
import { Product } from "../types/product"; // Ensure this import exists
import { Search } from "lucide-react"; // Import Lucide search icon

export default async function ProductsPage() {
  const products: Product[] = await getProducts();

  return <ProductsPageClient products={products} />;
}

interface ProductsPageClientProps {
  products: Product[];
}

function ProductsPageClient({ products }: ProductsPageClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Filter products based on search query (case-insensitive)
  const filteredProducts = products.filter((product: Product) =>
    product.Title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Sticky Header */}
        <div className=" top-0  py-4 z-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Title */}
            <h1 className="text-3xl font-bold">
              All Products ({filteredProducts.length})
            </h1>

            {/* Search Input with Icon */}
            <div className="relative w-full md:w-[30%] mt-4 md:mt-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-[42px] pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <ProductGrid products={filteredProducts} />
      </div>
    </div>
  );
}
