"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Menu, Search, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Product } from "../types/product";

interface HeaderProps {
  products: Product[];
}

export default function Header({ products }: HeaderProps) {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (query.trim()) {
      setFilteredProducts(
        products.filter((product) =>
          product.Title.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setFilteredProducts([]);
    }
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setFilteredProducts([]);
  };

  if (pathname.startsWith("/checkout")) return null;

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
        <div className="container mx-auto px-4">
          <div className="relative flex h-16 items-center justify-between gap-4">
            {/* Logo */}
            <Link
              href="/"
              className={`flex shrink-0 items-center transition-opacity ${
                isSearchOpen ? "hidden md:flex" : ""
              }`}
            >
              <img src="/applogo.png" alt="App Logo" className="h-8 w-auto" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/products"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                All Products
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Hot Deals
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Mowers
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                Coffee machines
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                About
              </Link>
            </nav>

            {/* Search and Mobile Menu */}
            <div className="flex items-center gap-2 flex-1 md:flex-initial w-full  md:w-[400px] lg:w-[500px] justify-end">
              {/* Search Input */}
              <div className="relative flex items-center w-full">
                {isSearchOpen ? (
                  <div className="flex w-full items-center gap-2">
                    <div className="relative flex-1">
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm md:text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring pr-8"
                        autoFocus
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                        onClick={closeSearch}
                      >
                        <X className="h-4 w-4" />
                        <span className="sr-only">Clear search</span>
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
                    <span className="sr-only">Search products</span>
                  </Button>
                )}

                {/* Search Results Dropdown */}
                {searchQuery && filteredProducts.length > 0 && (
                  <div className="absolute top-full right-0 w-full mt-1 z-50 rounded-md border bg-background shadow-lg max-h-[50vh] overflow-y-auto">
                    <div className="divide-y">
                      {filteredProducts.map((product) => (
                        <Link
                          key={product.Handle}
                          href={`/product/${product.Handle.toString()}`}
                          className="flex items-center gap-4 p-2 transition-colors hover:bg-muted"
                          onClick={closeSearch}
                        >
                          <img
                            src={product.Images[0].src || "/default-image.jpg"}
                            alt=""
                            className="h-14 w-14 rounded-md border border-slate-100 object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm  font-medium truncate">
                              {product.Title}
                            </h3>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Navigation */}
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-9 w-9">
                      <Menu className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-80">
                    <nav className="mt-8 flex flex-col gap-4">
                      <Link
                        href="/products"
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        All Products
                      </Link>
                      <Link
                        href="/products"
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        Hot Deals
                      </Link>
                      <Link
                        href="/products"
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        Mowers
                      </Link>
                      <Link
                        href="/products"
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        Coffee machines
                      </Link>
                      <Link
                        href="/about"
                        className="text-lg font-medium transition-colors hover:text-primary"
                      >
                        About
                      </Link>
                    </nav>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </header>
      {isSearchOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={closeSearch}
        />
      )}
    </>
  );
}
