"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Heart, User, Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();

  // If the current path is '/checkout', do not render the header
  if (pathname.startsWith("/checkout")) return null;

  return (
    <header className="sticky top-0 z-50 mx-auto my-0 flex w-full flex-wrap   content-center items-center justify-between border-b border-black bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex w-full items-center justify-between gap-2">
          <Link href="/" className="text-2xl font-bold">
            <img src="/applogo.png" alt="App Logo" className="h-8" />
          </Link>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                <Link
                  href="/products"
                  className="text-lg font-medium hover:text-primary"
                >
                  All Products
                </Link>
                <Link
                  href="/products"
                  className="text-lg font-medium hover:text-primary"
                >
                  Hot Deals
                </Link>
                <Link
                  href="/products"
                  className="text-lg font-medium hover:text-primary"
                >
                  Mowers
                </Link>
                <Link
                  href="/products"
                  className="text-lg font-medium hover:text-primary"
                >
                  Coffee machines
                </Link>
                <Link
                  href="/about"
                  className="text-lg font-medium hover:text-primary"
                >
                  About
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <nav className="hidden md:flex w-full space-x-4 items-end justify-end">
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
      </div>
    </header>
  );
}
