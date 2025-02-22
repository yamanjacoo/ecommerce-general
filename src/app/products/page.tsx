import { ProductGrid } from "../components/ProductGrid";
import { getProducts } from "../lib/products";

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">
          All Products ({products.length})
        </h1>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
