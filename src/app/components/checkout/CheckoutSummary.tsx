"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export function CheckoutSummary() {
  const [promoCode, setPromoCode] = useState("")

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle promo code application
    console.log("Applying promo code:", promoCode)
  }

  // This would typically come from your cart state
  const subtotal = 249.98
  const shipping = 0
  const tax = 20.0
  const total = subtotal + shipping + tax

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Order Items */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image src="/placeholder.svg" alt="Product image" fill className="object-cover rounded" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Premium Coffee Maker</h3>
              <p className="text-sm text-gray-500">Qty: 1</p>
            </div>
            <p className="font-medium">$199.99</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image src="/placeholder.svg" alt="Product image" fill className="object-cover rounded" />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">Electric Kettle</h3>
              <p className="text-sm text-gray-500">Qty: 1</p>
            </div>
            <p className="font-medium">$49.99</p>
          </div>
        </div>

        {/* Promo Code */}
        <form onSubmit={handleApplyPromo} className="flex gap-2">
          <Input
            type="text"
            placeholder="Promo code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <Button type="submit" variant="outline">
            Apply
          </Button>
        </form>

        {/* Order Totals */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Tax</span>
            <span>${tax.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

