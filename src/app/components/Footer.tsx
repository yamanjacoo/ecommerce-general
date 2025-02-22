"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import usePathname
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  ArrowRight,
} from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const pathname = usePathname();

  // If the current path is '/checkout', do not render the header
  if (pathname.startsWith("/checkout")) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter subscription:", email);
  };

  return (
    <footer className="bg-secondary pt-16 pb-8 glass dark:glass-dark">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {/* Support Section */}
          <div>
            <h3 className="text-primary font-bold text-lg mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help-center"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/warranty"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Warranty
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Product Registration
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Shipping
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Section */}
          <div>
            <h3 className="text-primary font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-gray-900"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-gray-900"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="text-primary font-bold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="text-gray-600">
                Barton Dock Rd, Trafford Park,
                <br />
                Stretford, Manchester M41 7PP,
                <br />
                United Kingdom
              </li>
              <li>
                <Link
                  href="tel:+441617494361"
                  className="text-gray-600 hover:text-gray-900"
                >
                  +44 161 749 4361
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:info@Eleika.com"
                  className="text-gray-600 hover:text-gray-900"
                >
                  info@Eleika.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-primary font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-gray-600 mb-4">
              Subscribe for updates and exclusive offers.
            </p>
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-primary focus:border-transparent bg-white bg-opacity-20 backdrop-filter backdrop-blur-sm"
                required
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground px-6 py-2 rounded hover:bg-primary/90 transition-colors duration-300 flex items-center"
              >
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span>© {new Date().getFullYear()} All rights reserved.</span>
              <Link href="/privacy" className="hover:text-gray-900">
                Privacy Policy
              </Link>
              <span>|</span>
              <Link href="/terms" className="hover:text-gray-900">
                Terms & Conditions
              </Link>
              <span>|</span>
              <Link href="/shipping" className="hover:text-gray-900">
                Shipping
              </Link>
              <span>|</span>
              <Link href="/help-center" className="hover:text-gray-900">
                Help Center
              </Link>
            </div>
            <div className="flex space-x-6">
              <Link
                href="https://facebook.com"
                className="text-gray-400 hover:text-gray-900"
              >
                <Facebook className="w-5 h-5" />
              </Link>
              <Link
                href="https://twitter.com"
                className="text-gray-400 hover:text-gray-900"
              >
                <Twitter className="w-5 h-5" />
              </Link>
              <Link
                href="https://instagram.com"
                className="text-gray-400 hover:text-gray-900"
              >
                <Instagram className="w-5 h-5" />
              </Link>
              <Link
                href="https://youtube.com"
                className="text-gray-400 hover:text-gray-900"
              >
                <Youtube className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
