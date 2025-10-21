"use client"

import { useState, useMemo, useEffect } from "react"
import { Search, X, Sparkles } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import { Input } from "./ui/input"
import Link from "next/link"
import Image from "next/image"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { fetchProducts } from "../lib/products"
import type { Product } from "../types/product"
import { getProductDisplayImage } from "../lib/utils"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Fetch products when dialog opens
  useEffect(() => {
    if (open && products.length === 0) {
      const loadProducts = async () => {
        try {
          setIsLoading(true)
          const fetchedProducts = await fetchProducts()
          setProducts(fetchedProducts)
        } catch (error) {
          console.error("Error fetching products for search:", error)
        } finally {
          setIsLoading(false)
        }
      }
      loadProducts()
    }
  }, [open, products.length])

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase()
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        (product.description && product.description.toLowerCase().includes(query)),
    )
  }, [searchQuery, products])

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full sm:max-w-sm overflow-hidden flex flex-col bg-background border-l-2 border-background"
      >
        <SheetHeader className="border-b border-[#D8A7B1]/30 pb-4">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
              <Search className="h-5 w-5 text-black" />
            </div>
            <SheetTitle className="font-serif text-3xl text-black">Discover</SheetTitle>
          </div>
        </SheetHeader>

        <div className="relative mt-6 px-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-black group-focus-within:text-black transition-colors" />
            <Input
              type="text"
              placeholder="Search for elegant pieces..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-12 h-14 text-base bg-white border-2 border-[#D8A7B1]/30 focus:border-[#8B5A4A] focus:ring-2 focus:ring-[#8B5A4A]/20 transition-all placeholder:text-[#8B5A4A]/40"
              autoFocus
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full hover:bg-[#D8A7B1]/20 text-[#8B5A4A]"
                onClick={handleClearSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto mt-6 pr-2 custom-scrollbar">
          {isLoading ? (
            <div className="text-center py-16 px-6">
              <div className="relative inline-block mb-3">
                <div className="relative h-20 w-20 mx-auto rounded-full bg-white flex items-center justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#8B5A4A]"></div>
                </div>
              </div>
              <p className="text-lg font-serif text-grey mb-2">Loading Products...</p>
              <p className="text-sm text-grey/60">Fetching our latest collection</p>
            </div>
          ) : !searchQuery.trim() ? (
            <div className="text-center py-16 px-6">
              <div className="relative inline-block mb-3">
                <div className="relative h-20 w-20 mx-auto rounded-full bg-white flex items-center justify-center">
                  <Sparkles className="h-10 w-10 text-grey" />
                </div>
              </div>
              <p className="text-lg font-serif text-grey mb-2">Begin Your Search</p>
              <p className="text-sm text-grey/60">Explore our curated collection of handcrafted elegance</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-16 px-6">
              <div className="h-16 w-16 mx-auto rounded-full bg-[#D8A7B1]/20 flex items-center justify-center mb-4">
                <Search className="h-8 w-8 text-[#8B5A4A]/60" />
              </div>
              <p className="text-lg font-serif text-[#8B5A4A] mb-2">No Matches Found</p>
              <p className="text-sm text-[#8B5A4A]/60">Try different keywords or browse our collections</p>
            </div>
          ) : (
            <div className="space-y-4 pb-4">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-gradient-to-r from-[#D8A7B1] to-[#8B5A4A] text-white border-0 px-3 py-1">
                  {searchResults.length} {searchResults.length === 1 ? "Result" : "Results"}
                </Badge>
                <div className="h-px flex-1 bg-gradient-to-r from-[#D8A7B1]/30 to-transparent" />
              </div>

              {searchResults.map((product, index) => (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={() => onOpenChange(false)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-white border-2 border-[#D8A7B1]/20 hover:border-[#8B5A4A] hover:shadow-lg transition-all duration-300 group"
                  style={{
                    animation: `fadeInUp 0.3s ease-out ${index * 0.05}s both`,
                  }}
                >
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-[#FFF5E8] ring-2 ring-[#D8A7B1]/20 group-hover:ring-[#8B5A4A]/40 transition-all">
                    <Image
                      src={getProductDisplayImage(product)}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif text-lg mb-1 truncate text-[#8B5A4A] group-hover:text-[#D8A7B1] transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-[#8B5A4A]/60 mb-2 capitalize">{product.category}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#8B5A4A] text-lg">₹{product.price.toLocaleString()}</span>
                    </div>
                  </div>
                  {!product.inStock && (
                    <Badge variant="destructive" className="text-xs">
                      Out of Stock
                    </Badge>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          .custom-scrollbar::-webkit-scrollbar-track {
            background: #FFF5E8;
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: linear-gradient(to bottom, #D8A7B1, #8B5A4A);
            border-radius: 10px;
          }
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(to bottom, #8B5A4A, #D8A7B1);
          }
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}</style>
      </SheetContent>
    </Sheet>
  )
}