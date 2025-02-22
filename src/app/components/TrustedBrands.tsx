"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const brands = [
  {
    name: "Intex",
    logo: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Intex_Logo.jpg",
  },
  {
    name: "Husqvarna",
    logo: "https://images.seeklogo.com/logo-png/22/1/husqvarna-logo-png_seeklogo-227182.png",
  },
  {
    name: "KitchenAid",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRfnqortKjSJoETdy3GeHRX04ckuDI2USZeRg&s",
  },
  {
    name: "Bose",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLo1DvLJylx2LUznB5bYQblxmgUBjQ9nyJLw&s",
  },
  {
    name: "Lifetime",
    logo: "https://www.cdnlogo.com/logos/l/7/lifetime.svg",
  },
  {
    name: "Generac",
    logo: "https://s3.amazonaws.com/fam.s3.2/damprod/PDP/10151/Brand_Generac.png",
  },
  {
    name: "Coleman",
    logo: "https://logowik.com/content/uploads/images/coleman4848.jpg",
  },
];

export default function TrustedBrands() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const scrollWidth = scrollRef.current?.scrollWidth || 0;
    const containerWidth = scrollRef.current?.offsetWidth || 0;

    controls.start({
      x: [0, -(scrollWidth / 2)],
      transition: {
        x: {
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "loop",
          duration: 30,
          ease: "linear",
        },
      },
    });
  }, [controls]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Brands That Trust Us
        </h2>
        <div className="overflow-hidden">
          <motion.div
            ref={scrollRef}
            className="flex items-center"
            animate={controls}
            style={{ width: "fit-content" }}
          >
            {[...brands, ...brands, ...brands].map((brand, index) => (
              <Image
                key={`${brand.name}-${index}`}
                src={brand.logo || "/placeholder.svg"}
                alt={brand.name}
                width={200}
                height={100}
                className="object-contain h-[100px] w-auto mx-8"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
