import { getProducts } from "../lib/products"
import Link from "next/link"

export default async function TestProductsPage() {
  const products = await getProducts()

  // Group products by type for better organization
  const productsByType = products.reduce(
    (acc, product) => {
      const type = product.Type || "Uncategorized"
      if (!acc[type]) {
        acc[type] = []
      }
      acc[type].push(product)
      return acc
    },
    {} as Record<string, typeof products>,
  )

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Product Test Page</h1>
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-lg mb-2">
              Total Products: <span className="font-bold">{products.length}</span>
            </p>
            <p className="text-lg mb-2">
              Total Categories: <span className="font-bold">{Object.keys(productsByType).length}</span>
            </p>
          </div>
        </div>

        {Object.entries(productsByType).map(([type, typeProducts]) => (
          <div key={type} className="mb-8">
            <h2 className="text-2xl font-bold mb-4">
              {type} ({typeProducts.length})
            </h2>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left">Handle</th>
                    <th className="px-4 py-2 text-left">Title</th>
                    <th className="px-4 py-2 text-left">Price</th>
                    <th className="px-4 py-2 text-left">Stock</th>
                    <th className="px-4 py-2 text-left">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {typeProducts.map((product) => (
                    <tr key={product.Handle} className="hover:bg-gray-50">
                      <td className="px-4 py-2 font-mono text-sm">{product.Handle}</td>
                      <td className="px-4 py-2">{product.Title}</td>
                      <td className="px-4 py-2">${product.DiscountedPrice.toFixed(2)}</td>
                      <td className="px-4 py-2">{product.InventoryQty}</td>
                      <td className="px-4 py-2">
                        <Link href={`/product/${product.Handle}`} className="text-primary hover:underline">
                          View Product
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

