"use client"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"
import { PayPalScriptProvider, PayPalButtons, FUNDING } from "@paypal/react-paypal-js"

interface ProductInfo {
  id: string
  name: string
  price: number
  originalPrice: number
  discountPercentage: number
  image: string
}

interface CheckoutProps {
  productInfo: ProductInfo
}

interface SimplePayPalButtonProps {
  amount: string
}

interface CreateOrderResponse {
  orderID: string
}

function SimplePayPalButton({ amount }: SimplePayPalButtonProps) {
  return (
    <PayPalScriptProvider
      options={{
        clientId: "Ab-_RGJfzR_nlzigMBpi7ca4fNNjS2nlqTdRUylABhCLkVUTZy7KdOWb9xPEGmNq262xkObg7NQlzLN6",
        currency: "USD",
      }}
    >
      <PayPalButtons
        className="z-0 w-full"
        fundingSource={FUNDING.PAYPAL}
        createOrder={async () => {
          const response = await fetch("https://pypal-unclaimed-payments.onrender.com/create_order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ receiver_email: "fdnanefouham@gmail.com", amount: amount }),
          })
          const data = (await response.json()) as CreateOrderResponse
          console.log("Create Order Response:", data)
          return data.orderID
        }}
        onApprove={async (data) => {
          const response = await fetch("https://pypal-unclaimed-payments.onrender.com/capture_order", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ orderID: data.orderID, receiver_email: "fdnanefouham@gmail.com" }),
          })
          const details = await response.json()
          console.log("Capture Response:", details)
        }}
      />
    </PayPalScriptProvider>
  )
}

export function Checkout({ productInfo }: CheckoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
      <div className="container max-w-6xl mx-auto px-4">
        <div className="flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-8">
          {/* Left Column - Checkout Form */}
          <div className="order-2 md:order-1 md:col-span-7">
            <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
              <h1 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Information</h1>

              {/* Contact Information */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <h2 className="text-base sm:text-lg font-medium">Contact information</h2>
                <div>
                  <Input type="email" placeholder="Email" className="w-full" />
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="newsletter" />
                  <Label htmlFor="newsletter">Keep me up to date on news and exclusive offers</Label>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                <h2 className="text-base sm:text-lg font-medium">Delivery</h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="First name" />
                  <Input placeholder="Last name" />
                </div>
                <Input placeholder="Address" />
                <div className="grid grid-cols-3 gap-4">
                  <Input placeholder="City" />
                  <Input placeholder="ZIP Code" />
                  <Input placeholder="State" />
                </div>
                <Input type="tel" placeholder="Phone" />
              </div>

              {/* Payment Section */}
              <div className="space-y-3 sm:space-y-4">
                <h2 className="text-base sm:text-lg font-medium">Payment</h2>

                {/* PayPal Payment */}
                <div className="bg-[#F5F5F5] p-4 sm:p-6 rounded-md">
                  <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                    <div className="relative w-12 h-12 sm:w-16 sm:h-16">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-full h-full text-gray-600"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <path d="M3 7h18" />
                        <path d="M7 3v4" />
                        <path d="M11 3v4" />
                        <path d="M15 10l2 2-2 2" />
                      </svg>
                    </div>
                    <p className="text-sm sm:text-[15px] text-gray-600 max-w-md">
                      After clicking "Pay with PayPal", you will be redirected to PayPal to complete your purchase
                      securely.
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 mt-4">
                  <Checkbox id="save-info" />
                  <Label htmlFor="save-info">Save this information for next time</Label>
                </div>

                {/* PayPal Button */}
                <SimplePayPalButton amount={productInfo.price.toFixed(2)} />
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-1 md:order-2 md:col-span-5 mb-4 sm:mb-8 md:mb-0">
            <Card className="bg-gray-50 p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-medium mb-3 sm:mb-4">Order summary</h2>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-md border">
                    <Image
                      src={productInfo.image || "/placeholder.svg"}
                      alt={productInfo.name}
                      fill
                      className="object-cover rounded-md"
                    />
                    <span className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      1
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-sm sm:text-base">{productInfo.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-500">Professional Zero Turn Mower</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-sm sm:text-base">${productInfo.price.toFixed(2)}</p>
                    <p className="text-xs sm:text-sm text-gray-500 line-through">
                      ${productInfo.originalPrice.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="border-t pt-3 sm:pt-4">
                  <div className="flex justify-between mb-2">
                    <span>Subtotal</span>
                    <span>${productInfo.originalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount ({productInfo.discountPercentage.toFixed(0)}% off)</span>
                    <span>-${(productInfo.originalPrice - productInfo.price).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${productInfo.price.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

