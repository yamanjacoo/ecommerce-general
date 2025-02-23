"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Star, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  category: string;
}

export default function ProductCard({
  id,
  name,
  price,
  image,
  rating,
  category,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/product/${id}`} className="block">
      <motion.div
        className="group bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl"
        whileHover={{ y: -5 }}
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
      >
        <div className="relative h-64 w-full overflow-hidden">
          <Image
            src={image || "/placeholder.svg"}
            alt={name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 ease-in-out group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black bg-opacity-20 transition-opacity duration-300 opacity-0 group-hover:opacity-100" />
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute bottom-4 left-4 right-4 bg-white bg-opacity-90 rounded-lg p-2 text-center"
            >
              <p className="text-sm font-medium text-gray-800">Quick View</p>
            </motion.div>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">
            {name}
          </h3>
          <p className="text-sm text-gray-500 mb-2">{category}</p>
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-primary">
              ${price.toFixed(2)}
            </span>
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm text-gray-600">
                {rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>

        <div className="p-4 pt-0 flex items-center justify-between">
          <button className="w-full h-[52px] bg-primary text-white py-2 px-4 rounded-lg flex items-center justify-center hover:bg-primary-dark transition-colors duration-300">
            <ShoppingCart className="w-5 h-5 mr-2" />
            Buy Now
          </button>
        </div>
      </motion.div>
    </Link>
  );
}
