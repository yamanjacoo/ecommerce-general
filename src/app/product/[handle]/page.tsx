import { getProducts } from "../../lib/products";
import { ProductDetails } from "../../components/product/ProductDetails";
import { RelatedProducts } from "../../components/product/RelatedProducts";
import { notFound } from "next/navigation";

interface ProductPageProps {
  params: {
    handle: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const products = await getProducts();
  const product = products.find((p) => p.Handle === params.handle);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter((p) => p.Type === product.Type && p.Handle !== product.Handle)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50   py-12">
      <div className="container mx-auto px-4">
        <ProductDetails product={product} />
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
