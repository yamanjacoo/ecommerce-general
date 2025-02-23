import HeroSection from "./components/HeroSection";
import FeaturedCategories from "./components/FeaturedCategories";
import ProductSections from "./components/ProductSections";
import Newsletter from "./components/Newsletter";
import TestimonialScroll from "./components/TestimonialScroll";
import TrustedBrands from "./components/TrustedBrands";
import { ToastBar, Toaster } from "react-hot-toast";
import { getProducts } from "./lib/products";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default async function Home() {
  const products = await getProducts();

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
