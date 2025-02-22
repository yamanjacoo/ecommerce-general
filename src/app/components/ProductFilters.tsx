"use client"

import { useState } from "react"
import { Check, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

const filters = {
  categories: ["Wheelchairs", "Dressers", "Outdoor Equipment", "Tools", "Home Improvement"],
  brands: ["All Star Wheelchairs", "DaVinci", "Premium Tools"],
  priceRanges: ["Under $100", "$100 - $500", "$500 - $1000", "$1000 - $2000", "Over $2000"],
}

export function ProductFilters() {
  const [selectedFilters, setSelectedFilters] = useState<{
    [key: string]: string[]
  }>({
    categories: [],
    brands: [],
    priceRanges: [],
  })

  const toggleFilter = (category: string, value: string) => {
    setSelectedFilters((prev) => {
      const current = prev[category] || []
      return {
        ...prev,
        [category]: current.includes(value) ? current.filter((item) => item !== value) : [...current, value],
      }
    })
  }

  return (
    <div className="bg-white rounded-lg p-6 space-y-6 h-fit">
      <h2 className="font-semibold text-lg mb-4">Filters</h2>

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <span className="font-medium">Categories</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-2">
          {filters.categories.map((category) => (
            <label key={category} className="flex items-center space-x-2 cursor-pointer">
              <div
                className={`w-4 h-4 border rounded flex items-center justify-center ${
                  selectedFilters.categories.includes(category) ? "bg-primary border-primary" : "border-gray-300"
                }`}
              >
                {selectedFilters.categories.includes(category) && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className="text-sm">{category}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <span className="font-medium">Brands</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-2">
          {filters.brands.map((brand) => (
            <label key={brand} className="flex items-center space-x-2 cursor-pointer">
              <div
                className={`w-4 h-4 border rounded flex items-center justify-center ${
                  selectedFilters.brands.includes(brand) ? "bg-primary border-primary" : "border-gray-300"
                }`}
              >
                {selectedFilters.brands.includes(brand) && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className="text-sm">{brand}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full">
          <span className="font-medium">Price Range</span>
          <ChevronDown className="h-4 w-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-4 space-y-2">
          {filters.priceRanges.map((range) => (
            <label key={range} className="flex items-center space-x-2 cursor-pointer">
              <div
                className={`w-4 h-4 border rounded flex items-center justify-center ${
                  selectedFilters.priceRanges.includes(range) ? "bg-primary border-primary" : "border-gray-300"
                }`}
              >
                {selectedFilters.priceRanges.includes(range) && <Check className="h-3 w-3 text-white" />}
              </div>
              <span className="text-sm">{range}</span>
            </label>
          ))}
        </CollapsibleContent>
      </Collapsible>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => setSelectedFilters({ categories: [], brands: [], priceRanges: [] })}
      >
        Clear Filters
      </Button>
    </div>
  )
}

