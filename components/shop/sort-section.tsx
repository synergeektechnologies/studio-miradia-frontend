"use client"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface SortSectionProps {
  sortBy: string
  setSortBy: (value: string) => void
  itemsPerPage: number
  setItemsPerPage: (value: number) => void
  totalProducts: number
}

export function SortSection({ sortBy, setSortBy, itemsPerPage, setItemsPerPage, totalProducts }: SortSectionProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-border">
      <p className="text-sm text-muted-foreground">
        {totalProducts} {totalProducts === 1 ? "product" : "products"} found
      </p>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Sort By */}
        <div className="flex items-center gap-2">
          <label htmlFor="sort" className="text-sm font-medium whitespace-nowrap">
            Sort by:
          </label>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger id="sort" className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest First</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Show */}
        <div className="flex items-center gap-2">
          <label htmlFor="show" className="text-sm font-medium whitespace-nowrap">
            Show:
          </label>
          <Select value={itemsPerPage.toString()} onValueChange={(value) => setItemsPerPage(Number(value))}>
            <SelectTrigger id="show" className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">12</SelectItem>
              <SelectItem value="18">18</SelectItem>
              <SelectItem value="24">24</SelectItem>
              <SelectItem value="36">36</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  )
}
