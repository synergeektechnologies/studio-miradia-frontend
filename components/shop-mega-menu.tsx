"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { fetchProducts } from "../lib/products"
import { ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import type { Product } from "../types/product"
import { getProductDisplayImage } from "../lib/utils"

interface ShopMegaMenuProps {
  isHomePage: boolean
  onMouseEnter?: () => void
  onMouseLeave?: () => void
}

export function ShopMegaMenu({ isHomePage, onMouseEnter, onMouseLeave }: ShopMegaMenuProps) {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    let active = true
    
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchProducts()
        if (!active) return
        setProducts(fetchedProducts)
      } catch (e) {
        console.error("Failed to load products:", e)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProducts()
    return () => { active = false }
  }, [])

  // Get all unique categories from products
  const uniqueCategories = Array.from(new Set(products.map(p => p.category))).filter(Boolean)
  
  // Create categories array with first product from each category
  const categories = uniqueCategories.map(categoryName => {
    const firstProduct = products.find(p => p.category === categoryName)
    return {
      name: categoryName,
      product: firstProduct,
      href: `/shop?category=${encodeURIComponent(categoryName)}`
    }
  }).filter(cat => cat.product) // Only show categories that have products
  
  const [hoveredCategory, setHoveredCategory] = useState<typeof categories[0] | null>(null)

  // Set the first category as default when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !hoveredCategory) {
      setHoveredCategory(categories[0])
    }
  }, [categories, hoveredCategory])

  const textColor = isHomePage ? "text-foreground" : "text-foreground"

  if (loading) {
    return (
      <div 
        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-auto max-w-3xl bg-white border border-border rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="grid grid-cols-[250px_350px] min-h-[350px]">
          <div className="bg-background p-6 border-r border-border flex items-center justify-center">
            <p className="text-muted-foreground">Loading products...</p>
          </div>
          <div className="relative bg-background p-6 flex items-center justify-center">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
      </div>
    )
  }

  if (products.length === 0 || categories.length === 0) {
    return (
      <div 
        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-auto max-w-3xl bg-white border border-border rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="grid grid-cols-[250px_350px] min-h-[350px]">
          <div className="bg-background p-6 border-r border-border flex items-center justify-center">
            <p className="text-muted-foreground">No products found</p>
          </div>
          <div className="relative bg-background p-6 flex items-center justify-center">
            <div className="text-muted-foreground">No products available</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-auto max-w-3xl bg-white border border-border rounded-lg shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-300"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="grid grid-cols-[250px_350px] min-h-[350px]">
        {/* Left side - Category links */}
        <div className="bg-background p-6 border-r border-border">
          <h3 className="font-serif text-xl mb-4 text-[#8B5A4A]">Our Collections</h3>
          <div className="flex flex-col gap-1">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                onMouseEnter={() => setHoveredCategory(category)}
                className={`group flex items-center justify-between px-4 py-3 rounded-md transition-all duration-200 ${
                  hoveredCategory?.name === category.name
                    ? "bg-white shadow-sm text-[#8B5A4A]"
                    : "hover:bg-white/50 text-foreground"
                }`}
              >
                <span className="font-medium text-sm">{category.name}</span>
                <ChevronRight
                  className={`h-4 w-4 transition-transform duration-200 ${
                    hoveredCategory?.name === category.name ? "translate-x-1" : "group-hover:translate-x-1"
                  }`}
                />
              </Link>
            ))}
          </div>

          {/* View all products link */}
          <button
            onClick={() => {
              // Navigate to shop page without any URL parameters to clear all filters
              router.push('/shop')
            }}
            className="mt-4 w-full text-center py-3 px-4 bg-[#8B5A4A] text-white rounded-md hover:bg-[#6d4538] transition-colors duration-200 font-medium text-sm"
          >
            View All Products
          </button>
        </div>

        {/* Right side - Product showcase */}
        <div className="relative bg-gradient-to-br from-[#FFF5E8] via-white to-[#F5E8E0] p-8 flex items-center justify-center overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-[#D8A7B1]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#8B5A4A]/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative w-full h-full max-w-sm">
            <div className="flex flex-col items-center justify-center space-y-6">
              {hoveredCategory?.product && (
                <div className="text-center group">
                  {/* Product image with enhanced styling */}
                  <div className="relative w-56 h-72 mb-6 mx-auto">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#D8A7B1]/20 to-[#8B5A4A]/20 rounded-2xl blur-sm scale-105"></div>
                    <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl ring-2 ring-white/50">
                      <Image
                        src={getProductDisplayImage(hoveredCategory.product)}
                        alt={hoveredCategory.product.name}
                        fill
                        className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
                        key={hoveredCategory.product.id}
                      />
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                    </div>
                  </div>
                  
                  {/* Product information with enhanced typography */}
                  <div className="space-y-3">
                    <h4 className="font-serif text-xl font-semibold text-[#8B5A4A] leading-tight">
                      {hoveredCategory.product.name}
                    </h4>
                    
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-2 h-2 bg-[#D8A7B1] rounded-full"></div>
                      <p className="text-sm font-medium text-[#8B5A4A]/70 uppercase tracking-wider">
                        {hoveredCategory.name} Collection
                      </p>
                      <div className="w-2 h-2 bg-[#D8A7B1] rounded-full"></div>
                    </div>
                    
                    {/* Decorative line */}
                    <div className="flex items-center justify-center pt-2">
                      <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#D8A7B1] to-transparent"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
