"use client"

import type React from "react"

import { useState } from "react"
import { Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"

// Sample product models - replace with your actual product models
const productModels = [
  "Coffee Maker Pro",
  "Espresso Machine Elite",
  "Pressure Washer 3000",
  "Power Drill Max",
  "Smart Home Hub",
  "Pro Audio System",
  "Garden Tool Set",
]

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    productModel: "",
    serialNumber: "",
    purchaseDate: "",
    purchaseLocation: "",
    additionalInfo: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      // Here you would typically send the data to your API
      console.log("Form submitted:", formData)

      toast.success("Product registered successfully!")

      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        productModel: "",
        serialNumber: "",
        purchaseDate: "",
        purchaseLocation: "",
        additionalInfo: "",
      })
    } catch (error) {
      toast.error("Failed to register product. Please try again.")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, productModel: value }))
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-4">Product Registration</h1>
            <p className="text-gray-600">
              Register your product to activate your warranty and receive important product updates.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john.doe@example.com"
                required
              />
            </div>

            {/* Product Model Field */}
            <div className="space-y-2">
              <Label htmlFor="productModel">Product Model</Label>
              <Select onValueChange={handleSelectChange} value={formData.productModel}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a product model" />
                </SelectTrigger>
                <SelectContent>
                  {productModels.map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Serial Number Field */}
            <div className="space-y-2">
              <Label htmlFor="serialNumber">Serial Number</Label>
              <Input
                id="serialNumber"
                name="serialNumber"
                value={formData.serialNumber}
                onChange={handleChange}
                placeholder="Enter the serial number"
                required
              />
            </div>

            {/* Purchase Date Field */}
            <div className="space-y-2">
              <Label htmlFor="purchaseDate">Purchase Date</Label>
              <div className="relative">
                <Input
                  id="purchaseDate"
                  name="purchaseDate"
                  type="date"
                  value={formData.purchaseDate}
                  onChange={handleChange}
                  required
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Purchase Location Field */}
            <div className="space-y-2">
              <Label htmlFor="purchaseLocation">Purchase Location</Label>
              <Input
                id="purchaseLocation"
                name="purchaseLocation"
                value={formData.purchaseLocation}
                onChange={handleChange}
                placeholder="Store name or website"
                required
              />
            </div>

            {/* Additional Information Field */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="Optional: Provide any extra information you think might be helpful."
                className="min-h-[100px]"
              />
            </div>

            <Button type="submit" className="w-full bg-primary text-white hover:bg-primary/90">
              Register Product
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

