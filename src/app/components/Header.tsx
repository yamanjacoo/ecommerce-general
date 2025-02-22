"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Heart, User, Search } from "lucide-react";
import Image from "next/image";

export default function Header() {
  const pathname = usePathname();

  // If the current path is '/checkout', do not render the header
  if (pathname.startsWith("/checkout")) return null;

  return (
    <header className="sticky top-0 z-50 mx-auto my-0 flex w-full flex-wrap content-center items-center justify-between border-b border-black bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold">
          <Image src="/applogo.png" alt="" height={120} width={120} />
        </Link>

        <nav className="hidden md:flex space-x-4">
          <Link href="/products" className="hover:text-primary">
            All Products
          </Link>
          <Link href="/products" className="hover:text-primary">
            Hot Deals
          </Link>
          <Link href="/products" className="hover:text-primary">
            Mowers
          </Link>
          <Link href="/products" className="hover:text-primary">
            Coffee machines
          </Link>
          <Link href="/about" className="hover:text-primary">
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <button
            aria-label="Search"
            className="p-2 hover:bg-secondary rounded-full"
          >
            <Search size={20} />
          </button>
          <Link
            href="/wishlist"
            className="p-2 hover:bg-secondary rounded-full"
          >
            <Heart size={20} />
          </Link>
          <Link href="/cart" className="p-2 hover:bg-secondary rounded-full">
            <ShoppingCart size={20} />
          </Link>
          <Link href="/account" className="p-2 hover:bg-secondary rounded-full">
            <User size={20} />
          </Link>
        </div>
      </div>
    </header>
  );
}
