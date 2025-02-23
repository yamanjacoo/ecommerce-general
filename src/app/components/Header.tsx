"use client";

import type React from "react";
import { useState, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Menu, Search, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { Product } from "../types/product";
import { FixedSizeList as List } from "react-window";

interface HeaderProps {
  products: Product[];
}

export default function Header({ products }: HeaderProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    return products
      .filter((product) =>
        product.Title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      .slice(0, 50);
  }, [searchQuery, products]);

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  if (pathname.startsWith("/checkout")) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between gap-4">
          {/* Mobile Menu (Hidden on desktop) */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-full flex justify-center items-center"
            >
              <nav className="flex flex-col items-center justify-center gap-8 w-full">
                <Link
                  href="/"
                  className="text-2xl font-medium"
                  onClick={closeSearch}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-2xl font-medium"
                  onClick={closeSearch}
                >
                  Shop
                </Link>
                <Link
                  href="/about"
                  className="text-2xl font-medium"
                  onClick={closeSearch}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="text-2xl font-medium"
                  onClick={closeSearch}
                >
                  Contact
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          {/* Logo (Hidden when search is open on mobile) */}
          <Link
            href="/"
            className={`flex shrink-0 items-center transition-opacity ${
              isSearchOpen ? "hidden md:flex" : ""
            }`}
          >
            <Image src="/applogo.png" alt="Logo" width={100} height={100} />
          </Link>

          {/* Desktop Navigation (Hidden on mobile) */}
          <nav className="hidden md:flex gap-6">
            <Link href="/" className="text-sm font-medium hover:underline">
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-medium hover:underline"
            >
              Shop
            </Link>
            <Link href="/about" className="text-sm font-medium hover:underline">
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm font-medium hover:underline"
            >
              Contact
            </Link>
          </nav>

          {/* Search */}
          <div className="flex items-center gap-2 w-full md:w-[400px] lg:w-[500px]">
            <div className="relative flex items-center w-full">
              {isSearchOpen ? (
                <div className="flex w-full items-center gap-2">
                  <div className="relative flex-1">
                    <input
                      type="search"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm md:text-base"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                      onClick={closeSearch}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-9 ml-auto"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <Search className="h-4 w-4" />
                </Button>
              )}

              {/* Virtualized Search Results */}
              {isSearchOpen && searchQuery && filteredProducts.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-background border rounded-md shadow-lg mt-1 max-h-[60vh] overflow-auto">
                  <List
                    height={300}
                    itemCount={filteredProducts.length}
                    itemSize={70}
                    width={"100%"}
                  >
                    {({ index, style }) => {
                      const product = filteredProducts[index];
                      return (
                        <div style={style} key={product.Handle}>
                          <Link
                            href={`/product/${product.Handle}`}
                            className="flex items-center gap-4 p-2 hover:bg-muted border-b last:border-0"
                            onClick={closeSearch}
                          >
                            <div className="relative w-14 h-14 flex-shrink-0">
                              <Image
                                src={
                                  product.Images?.[0]?.src ||
                                  "/default-image.jpg"
                                }
                                alt={product.Title}
                                fill
                                className="rounded-md border object-cover"
                                loading="lazy"
                                sizes="56px"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="text-sm font-medium truncate">
                                {product.Title}
                              </h3>
                            </div>
                          </Link>
                        </div>
                      );
                    }}
                  </List>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
