"use client";

import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  count: string;
}

interface OrderSummaryProps {
  product: Product;
}

export function OrderSummary({ product }: OrderSummaryProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm space-y-4">
      <h2 className="text-xl font-semibold">Order summary</h2>
      <div className="flex items-start space-x-4">
        <div className="relative aspect-square flex-shrink-0 ">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover rounded-md "
          />

          <div className="h-12 w-12 absolute right-0 top-0">
            {" "}
            {product.count}
          </div>
        </div>
        <div className="flex-1">
          <h3 className="font-medium">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.description}</p>
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between">
          <span className="font-medium">Subtotal</span>
          <span>${product.price.toFixed(2)}</span>
        </div>
      </div>
      <div className="border-t pt-4">
        <div className="flex justify-between text-lg font-semibold">
          <span>Total</span>
          <span>${product.price.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mt-1">Including VAT</p>
      </div>
    </div>
  );
}
