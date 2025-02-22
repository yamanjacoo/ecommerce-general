"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart, Package, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Product } from "../types/product";
import { useRouter } from "next/navigation";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const router = useRouter();

  const handleBuyNow = () => {
    router.push(`/product/${product.Handle.toString()}`);
  };

  const discount = product.CompareAtPrice
    ? Math.round(
        ((product.CompareAtPrice - product.DiscountedPrice) /
          product.CompareAtPrice) *
          100
      )
    : 0;

  return (
    <motion.div
      className="group relative bg-white rounded-xl shadow-md overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ y: -5 }}
    >
      <Link href={`/product/${product.Handle}`}>
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={product.Images[0]?.src || "/placeholder.svg"}
            alt={product.Title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute top-2 right-2 flex flex-col gap-2">
            {discount > 0 && (
              <div className="inline-flex items-center bg-[#FE4242] text-white  rounded-full border px-2.5 py-0.5 text-[12px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                {discount}% OFF
              </div>
            )}
            {/* {product.Labels.map((label, index) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {label.value}
              </Badge>
            ))} */}
          </div>
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="font-semibold text-lg line-clamp-2">
              {product.Title}
            </h3>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">4.5</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Average rating: 4.5/5</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{product.Vendor}</span>
              {product.SKU && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Tag className="w-4 h-4 text-gray-400" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>SKU: {product.SKU}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {product.RequiresShipping && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Package className="w-4 h-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Shipping available</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold">
                ${product.DiscountedPrice.toFixed(2)}
              </span>
              {product.CompareAtPrice && (
                <span className="text-sm text-gray-500 line-through">
                  ${product.CompareAtPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
      <div className="p-4 pt-0">
        <Button className="w-full  h-[46px]" size="sm" onClick={handleBuyNow}>
          <ShoppingCart className="w-4 h-4 mr-2" />
          Buy Now
        </Button>
      </div>
    </motion.div>
  );
}
