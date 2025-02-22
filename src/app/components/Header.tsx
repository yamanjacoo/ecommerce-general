"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export default function Header() {
  const pathname = usePathname();

  if (pathname.startsWith("/checkout")) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/" className="text-2xl font-bold">
            <img src="/applogo.png" alt="App Logo" className="h-8" />
          </Link>

          {/* Desktop Navigation */}
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

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
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
        </div>
      </div>
    </header>
  );
}
