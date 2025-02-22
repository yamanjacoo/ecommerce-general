import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./styles/testimonials.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TopHeader from "./components/TopHeader";
import { Toaster } from "sonner";
import { CartProvider } from "../context/cartProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eleika  - High-quality Equipment & Solutions",
  description:
    "Eleika : Your one-stop shop for high-quality equipment and solutions for every project",
  keywords:
    "Eleika , equipment, tools, home improvement, outdoor power equipment, appliances, lawn mower",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="overflow-x-hidden">
        <CartProvider>
          <TopHeader />
          <Header />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}
