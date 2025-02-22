"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

const categories = [
  {
    name: "Coffee Makers & Espresso Machines",
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?q=80&w=2068&auto=format&fit=crop",
    description: "Premium brewers for your daily coffee needs",
    items: "50+ Products",
    color: "from-orange-500/20 to-orange-500/0",
  },
  {
    name: "Sheds",
    image:
      "https://images.unsplash.com/photo-1530124566582-a618bc2615dc?q=80&w=2070&auto=format&fit=crop",
    description: "Durable storage solutions for all your needs",
    items: "30+ Products",
    color: "from-green-500/20 to-green-500/0",
  },
  {
    name: "Pressure Washers",
    image:
      "https://images.unsplash.com/photo-1623937228271-992646fb0fba?q=80&w=2070&auto=format&fit=crop",
    description: "Powerful cleaning solutions for any job",
    items: "20+ Products",
    color: "from-blue-500/20 to-blue-500/0",
  },
  {
    name: "Fluke Products",
    image:
      "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=2070&auto=format&fit=crop",
    description: "Precision tools for electrical testing",
    items: "40+ Products",
    color: "from-yellow-500/20 to-yellow-500/0",
  },
  {
    name: "Mowers",
    image:
      "https://images.unsplash.com/photo-1696019861506-3623a7988fba?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Keep your lawn pristine with our range of mowers",
    items: "25+ Products",
    color: "from-red-500/20 to-red-500/0",
  },
  {
    name: "Plumbing Tools",
    image:
      "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?q=80&w=2069&auto=format&fit=crop",
    description: "Essential tools for all your plumbing needs",
    items: "60+ Products",
    color: "from-purple-500/20 to-purple-500/0",
  },
];

export default function FeaturedCategories() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <style jsx>{`
        .shadow-text {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
      `}</style>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our Categories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our wide range of products across various categories,
            carefully curated to meet your needs and exceed your expectations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onHoverStart={() => setHoveredIndex(index)}
              onHoverEnd={() => setHoveredIndex(null)}
              className="group relative overflow-hidden rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-500"
            >
              <Link href={"/products"}>
                <div className="relative h-[300px] overflow-hidden rounded-2xl">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${category.color} opacity-60`}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-center"
                    >
                      <h3 className="text-2xl font-bold text-white mb-2 shadow-text">
                        {category.name}
                      </h3>
                      <p className="text-white text-sm shadow-text">
                        {category.items}
                      </p>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
