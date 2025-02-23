import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/testimonials.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TopHeader from "./components/TopHeader";

import { CartProvider } from "../context/cartProvider";
import { Toaster } from "react-hot-toast";
import { getProducts } from "./lib/products";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eleika  - High-quality Equipment & Solutions",
  description:
    "Eleika : Your one-stop shop for high-quality equipment and solutions for every project",
  keywords:
    "Eleika , equipment, tools, home improvement, outdoor power equipment, appliances, lawn mower",
  verification: {
    google: "0u0Vq-as1cDppgmYgQaiCP0egs4IL0omG-m1wbbaArc",
    yandex: "yandex",
    yahoo: "yahoo",
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const products = await getProducts();
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta
          name="google-site-verification"
          content="0u0Vq-as1cDppgmYgQaiCP0egs4IL0omG-m1wbbaArc"
        />
      </head>
      <body className="overflow-x-hidden">
        <Toaster position="top-center" reverseOrder={false} />
        <CartProvider>
          <TopHeader />
           <Header products={products} />
          <main className="min-h-screen">{children}</main>
            <Footer />
        </CartProvider>
        
      </body>
    </html>
  );
}
