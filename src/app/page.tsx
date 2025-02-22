import HeroSection from "./components/HeroSection"
import FeaturedCategories from "./components/FeaturedCategories"
import ProductSections from "./components/ProductSections"
import Newsletter from "./components/Newsletter"
import TestimonialScroll from "./components/TestimonialScroll"
import TrustedBrands from "./components/TrustedBrands"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <HeroSection />
      <FeaturedCategories />
      <TrustedBrands />
      <ProductSections />
      <TestimonialScroll />
      <Newsletter />
    </main>
  )
}

