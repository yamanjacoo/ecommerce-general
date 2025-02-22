import Image from "next/image";
import Link from "next/link";
import { Coffee, Home, Droplet, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-red-50 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-4">
            About Eleika{" "}
          </h1>
          <div className="max-w-4xl mx-auto">
            <p className="text-center text-gray-600">
              Your one-stop destination for high-quality equipment and tools.
              Located in the heart of Trafford Park, Manchester, Eleika is proud
              to serve customers across the United Kingdom with a comprehensive
              range of products designed to meet your residential, recreational,
              and professional needs.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Our Commitment to Excellence
              </h2>
              <p className="text-gray-600 mb-6">
                At Eleika , we believe in providing solutions for everyone.
                Whether you're a DIY enthusiast, a professional tradesperson, or
                simply someone looking to enhance your outdoor or indoor space,
                we've got you covered. From advanced coffee makers to outdoor
                playground equipment, spa products, and industrial-grade tools,
                we ensure top-tier quality and competitive pricing.
              </p>
              <p className="text-gray-600 mb-6">
                Our commitment to excellence goes beyond just products. We
                prioritize customer satisfaction with expert guidance, seamless
                shopping experiences, and reliable after-sales support.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Image
                src="wearhouse-1.webp"
                alt="Store front"
                width={300}
                height={300}
                className="rounded-lg shadow-md"
              />
              <Image
                src="/quality.jpg"
                alt="Product display"
                width={300}
                height={300}
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What We Offer
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <Coffee className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">
                Coffee Makers & Espresso Machines
              </h3>
              <p className="text-gray-600">
                Premium brewers for your daily coffee needs
              </p>
            </div>
            <div className="text-center">
              <Home className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Durable Sheds</h3>
              <p className="text-gray-600">For all your storage needs</p>
            </div>
            <div className="text-center">
              <Droplet className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Pressure Washers</h3>
              <p className="text-gray-600">Powerful cleaning solutions</p>
            </div>
            <div className="text-center">
              <Zap className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Fluke Products</h3>
              <p className="text-gray-600">For precision and efficiency</p>
            </div>
            {/* Add more product categories here */}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Experience the Eleika Difference
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            We're more than just a store—we're your partner in creating,
            maintaining, and enjoying your spaces with high-quality, reliable
            products.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">Explore Our Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
