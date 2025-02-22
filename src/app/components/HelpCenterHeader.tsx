"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"

export default function HelpCenterHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Implement search functionality here
    console.log("Searching for:", searchQuery)
  }

  return (
    <header className="bg-primary text-white py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-4 text-center">How can we help you?</h1>
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-4 pr-12 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-primary"
          >
            <Search className="w-6 h-6" />
          </button>
        </form>
      </div>
    </header>
  )
}

