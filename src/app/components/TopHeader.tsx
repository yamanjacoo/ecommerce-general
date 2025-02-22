"use client";

import Link from "next/link";
import { Facebook, Instagram, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";

export default function TopHeader() {
  const pathname = usePathname();


  if (pathname.startsWith("/checkout")) return null;
  return (
    <div className="bg-primary text-primary-foreground py-2 text-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Social Media Links */}
          <div className="flex items-center space-x-4">
            <Link
              href="https://facebook.com"
              className="hover:text-white transition-colors duration-200"
              aria-label="Visit our Facebook page"
            >
              <Facebook className="w-4 h-4" />
            </Link>
            <Link
              href="https://instagram.com"
              className="hover:text-white transition-colors duration-200"
              aria-label="Visit our Instagram page"
            >
              <Instagram className="w-4 h-4" />
            </Link>
          </div>

          {/* Animated Delivery Message */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden sm:flex items-center justify-center space-x-2"
          >
            <span role="img" aria-label="package" className="text-base">
              📦
            </span>
            <motion.span
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            >
              Fast & Free International Delivery
            </motion.span>
          </motion.div>

          {/* Phone Number */}
          <Link
            href="tel:+441617494361"
            className="flex items-center space-x-2 hover:text-white transition-colors duration-200"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden sm:inline">+44 161 749 4361</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
