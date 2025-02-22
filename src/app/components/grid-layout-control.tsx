"use client"

import type React from "react"

import { Grid2x2, Grid3x3, LayoutGrid, Rows } from "lucide-react"
import { Button } from "@/components/ui/button"

type GridLayout = 1 | 2 | 3 | 4

interface GridLayoutControlProps {
  currentLayout: GridLayout
  onLayoutChange: (layout: GridLayout) => void
  isMobile: boolean
}

export function GridLayoutControl({ currentLayout, onLayoutChange, isMobile }: GridLayoutControlProps) {
  const layouts: { value: GridLayout; icon: React.ReactNode; label: string }[] = [
    { value: 1, icon: <Rows className="h-4 w-4" />, label: "Single column" },
    { value: 2, icon: <Grid2x2 className="h-4 w-4" />, label: "Two columns" },
    { value: 3, icon: <Grid3x3 className="h-4 w-4" />, label: "Three columns" },
    { value: 4, icon: <LayoutGrid className="h-4 w-4" />, label: "Four columns" },
  ]

  // Filter out layouts that aren't suitable for mobile
  const availableLayouts = isMobile ? layouts.slice(0, 2) : layouts

  return (
    <div className="flex items-center space-x-2">
      {availableLayouts.map(({ value, icon, label }) => (
        <Button
          key={value}
          variant={currentLayout === value ? "default" : "outline"}
          size="icon"
          onClick={() => onLayoutChange(value)}
          title={label}
        >
          {icon}
        </Button>
      ))}
    </div>
  )
}

