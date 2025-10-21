"use client"

import { Slider } from "../ui/slider"
import { Checkbox } from "../ui/checkbox"
import { Label } from "../ui/label"
import { Button } from "../ui/button"
import { X } from "lucide-react"

interface FilterSectionProps {
  categories: string[]
  selectedCategories: string[]
  setSelectedCategories: (categories: string[]) => void
  priceRange: [number, number]
  setPriceRange: (range: [number, number]) => void
}

export function FilterSection({
  categories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
}: FilterSectionProps) {
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter((c) => c !== category)
        : [...selectedCategories, category],
    )
  }

  const clearFilters = () => {
    setSelectedCategories([])
    setPriceRange([0, 15000])
  }

  const hasActiveFilters = selectedCategories.length > 0 || priceRange[0] > 0 || priceRange[1] < 15000

  return (
    <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-serif text-2xl font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="text-xs">
            <X className="h-4 w-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <Label htmlFor={category} className="text-sm font-normal cursor-pointer">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-4 text-sm uppercase tracking-wide text-muted-foreground">Price Range</h3>
        <div className="space-y-4">
          <Slider
            min={0}
            max={15000}
            step={500}
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            className="w-full"
          />
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">₹{priceRange[0].toLocaleString()}</span>
            <span className="text-muted-foreground">₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Active Filters Summary */}
      {hasActiveFilters && (
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-muted-foreground mb-2">Active Filters:</p>
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((cat) => (
              <span key={cat} className="text-xs bg-secondary px-2 py-1 rounded-full">
                {cat}
              </span>
            ))}
            {(priceRange[0] > 0 || priceRange[1] < 15000) && (
              <span className="text-xs bg-secondary px-2 py-1 rounded-full">
                ₹{priceRange[0]}-₹{priceRange[1]}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
