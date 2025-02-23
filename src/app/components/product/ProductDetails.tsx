"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Package, ChevronLeft, ChevronRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "../../types/product"; // Changed from "@/app/types/product"
import { useRouter } from "next/navigation";
import { PaymentsLogos } from "../ui/paymentsLogos";
import { AddToCartButton } from "../ui/addToCartButton";
import { DEFAULT_CURRENCY } from "../currency";

interface ProductDetailsProps {
  product: Product;
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const calculatedPrice = product.DiscountedPrice * quantity;

  const router = useRouter();

  const discount = product.CompareAtPrice
    ? Math.round(
        ((product.CompareAtPrice - product.DiscountedPrice) /
          product.CompareAtPrice) *
          100
      )
    : 0;

  const handlePrevImage = () => {
    setSelectedImage((prev) =>
      prev === 0 ? product.Images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setSelectedImage((prev) =>
      prev === product.Images.length - 1 ? 0 : prev + 1
    );
  };

  const handleQuantityChange = (value: number) => {
    setQuantity(Math.max(1, value));
  };

  const handleBuyNow = () => {
    router.push(`/checkout?price=${calculatedPrice}&quantity=${quantity}`);
  };

  return (
    <div className="md:mx-auto md:container grid md:grid-cols-2 gap-8 max-w-7xl mb-16">
      {/* Image Gallery */}
      <div className="space-y-4">
        <div className="relative aspect-square">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative aspect-square rounded-lg overflow-hidden"
            >
              <Image
                src={product.Images[selectedImage]?.src || "/placeholder.svg"}
                alt={product.Images[selectedImage]?.alt || product.Title}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          {product.Images.length > 1 && (
            <>
              <Button
                variant="outline"
                size="icon"
                className="absolute left-2 top-1/2 -translate-y-1/2"
                onClick={handlePrevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={handleNextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </>
          )}
        </div>
        {product.Images.length > 1 && (
          <div className="flex gap-2 flex-wrap overflow-x-auto pb-2">
            {product.Images.slice(0, 10).map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index
                    ? "border-primary"
                    : "border-transparent"
                }`}
              >
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt || ""}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
      {/* <ProductImages images={product.Images} /> */}
      {/* Product Info */}
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <h1 className="text-3xl font-bold">{product.Title}</h1>
            <Button variant="outline" size="icon" className="shrink-0">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < 4 ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600">
                4.0 (24 reviews)
              </span>
            </div>
            <span className="text-sm text-gray-600">|</span>
            <span className="text-sm text-gray-600">SKU: {product.SKU}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">
              {DEFAULT_CURRENCY.symbol}
              {calculatedPrice.toFixed(2)}
            </span>
            {product.CompareAtPrice && (
              <span className="text-lg text-gray-500 line-through">
                {DEFAULT_CURRENCY.symbol}
                {(product.CompareAtPrice * quantity).toFixed(2)}
              </span>
            )}
            {discount > 0 && (
              <div className="inline-flex items-center bg-[#FE4242] text-white  rounded-full border px-2.5 py-0.5 text-[12px] font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                {discount}% OFF
              </div>
            )}
          </div>
        </div>

        {/* Options */}
        {product.Options.map((option) => (
          <div key={option.name} className="space-y-2">
            <label className="font-medium">{option.name}</label>
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => (
                <Button key={value} variant="outline" className="rounded-full">
                  {value}
                </Button>
              ))}
            </div>
          </div>
        ))}

        {/* Quantity */}
        <div className="space-y-2">
          <label className="font-medium">Quantity</label>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              -
            </Button>
            <span className="w-12 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              +
            </Button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-4">
          <AddToCartButton
            className="mt-4"
            product={product}
            price={calculatedPrice.toString()}
            quantity={quantity}
          />
          <PaymentsLogos />
        </div>

        {/* Shipping Info */}
        {product.RequiresShipping && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Package className="w-4 h-4" />
            <span>Free shipping</span>
          </div>
        )}

        {/* Product Details Tabs */}
        <Tabs defaultValue="description" className="mt-8">
          <TabsList>
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-4">
            <div className="prose prose-sm max-w-none">
              {product.Description.split("\n").map(
                (paragraph, index) =>
                  paragraph.trim() && (
                    <p key={index} className="text-gray-600 mb-4">
                      {paragraph}
                    </p>
                  )
              )}
            </div>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(product.Specifications).map(([key, value]) => (
                <div key={key} className="space-y-1">
                  <dt className="text-sm font-medium text-gray-600">{key}</dt>
                  <dd className="text-sm text-gray-900">{value}</dd>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="shipping" className="mt-4">
            <div className="prose max-w-none">
              <h3 className="text-lg font-semibold mb-2">
                Shipping Information
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li>Free shipping - International shipping </li>
                <li>Express shipping available at checkout</li>
                <li>International shipping available to select countries</li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
