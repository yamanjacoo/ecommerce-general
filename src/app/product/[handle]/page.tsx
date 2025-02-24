"use client";
import { getProducts } from "../../lib/products";
import { ProductDetails } from "../../components/product/ProductDetails";
import { RelatedProducts } from "../../components/product/RelatedProducts";
import { notFound } from "next/navigation";
import { useProductStore } from "../../stores/productProvider";
import { useEffect } from "react";

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const decodedHandle = decodeURIComponent(params.handle);
  useEffect(() => {
    console.log("Handle from URL:", decodedHandle);
  }, [params.handle]);

  const products = useProductStore((state) => state.products);
  const product = products.find((p) => {
    return p.Handle === decodedHandle; // Added the return statement
  });

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.Type === product.Type && p.Handle !== product.Handle)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <ProductDetails product={product} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
