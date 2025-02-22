"use client"

import type React from "react"

import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Sample order data - replace with your actual data
const sampleOrder = {
  items: [
    {
      id: 1,
      name: "Premium Coffee Maker",
      price: 199.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
    {
      id: 2,
      name: "Electric Kettle",
      price: 49.99,
      quantity: 1,
      image: "/placeholder.svg",
    },
  ],
  subtotal: 249.98,
  shipping: 0,
  tax: 20.0,
}

export default function OrderSummary() {
  const [promoCode, setPromoCode] = useState("")

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle promo code application
    console.log("Applying promo code:", promoCode)
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-6">Order Summary</h2>

      {/* Order Items */}
      <div className="space-y-4 mb-6">
        {sampleOrder.items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover rounded" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-medium">${item.price.toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Promo Code */}
      <form onSubmit={handleApplyPromo} className="mb-6">
        <div className="flex gap-2">
          <Input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <Button type="submit" variant="outline">
            Apply
          </Button>
        </div>
      </form>

      {/* Order Totals */}
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${sampleOrder.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Shipping</span>
          <span>{sampleOrder.shipping === 0 ? "Free" : `$${sampleOrder.shipping.toFixed(2)}`}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax</span>
          <span>${sampleOrder.tax.toFixed(2)}</span>
        </div>
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${(sampleOrder.subtotal + sampleOrder.shipping + sampleOrder.tax).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

