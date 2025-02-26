"use client";
import HeroSection from "./components/HeroSection";
import FeaturedCategories from "./components/FeaturedCategories";
import ProductSections from "./components/ProductSections";
import Newsletter from "./components/Newsletter";
import TestimonialScroll from "./components/TestimonialScroll";
import TrustedBrands from "./components/TrustedBrands";
import { ToastBar, Toaster } from "react-hot-toast";

import { useProductStore } from "./stores/productProvider";

export default function Home() {
  const products = useProductStore((state) => state.products);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroSection />
      <FeaturedCategories />
      <TrustedBrands />
      <ProductSections product={products} />
      <TestimonialScroll />
      <Newsletter />
    </main>
  );
}
