"use client"

import { useState, useMemo, Suspense, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { ProductCard } from "../../components/product-card"
import { fetchProducts } from "../../lib/products"
import { FilterSection } from "../../components/shop/filter-section"
import { SortSection } from "../../components/shop/sort-section"
import { ScrollToTop } from "../../components/scroll-to-top"
import type { Metadata } from "next"
import { StructuredData } from "../../components/structured-data"
import { collectionPageSchema } from "../../lib/structured-data"

export const metadata: Metadata = {
  title: "Shop Studio Miradia - Luxury Fashion Collection",
  description: "Browse our complete collection of handcrafted luxury fashion pieces. Discover butterfly-inspired designs, sustainable materials, and timeless elegance in every piece.",
  keywords: "shop Studio Miradia, luxury fashion collection, handcrafted clothing, butterfly inspired fashion, sustainable fashion, artisanal clothing, luxury boutique",
  openGraph: {
    title: "Shop Studio Miradia - Luxury Fashion Collection",
    description: "Browse our complete collection of handcrafted luxury fashion pieces. Discover butterfly-inspired designs, sustainable materials, and timeless elegance in every piece.",
    type: "website",
  },
}

function ShopPageContent() {
  const searchParams = useSearchParams()
  const filterParam = searchParams.get("filter")
  const categoryParam = searchParams.get("category")

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 15000])
  const [sortBy, setSortBy] = useState<string>("newest")
  const [itemsPerPage, setItemsPerPage] = useState<number>(12)
  const [apiProducts, setApiProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Load products from backend
  useEffect(() => {
    let active = true
    setLoading(true)
    setError(null)
    fetchProducts()
      .then((ps) => {
        if (!active) return
        setApiProducts(ps)
      })
      .catch((e) => {
        if (!active) return
        setError("Failed to load products.")
      })
      .finally(() => {
        if (!active) return
        setLoading(false)
      })
    return () => {
      active = false
    }
  }, [])

  // Handle category parameter from URL
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam])
    }
  }, [categoryParam])

  // Apply filters
  const filteredProducts = useMemo(() => {
    let filtered = [...apiProducts]

    // Apply URL filter parameter
    if (filterParam === "new") {
      filtered = filtered.slice(0, 6) // Mock "new arrivals"
    } else if (filterParam === "limited") {
      filtered = filtered.filter((p) => p.limitedEdition)
    } else if (filterParam === "sale") {
      // Sale filter removed since originalPrice field was removed
      filtered = []
    }

    // Apply category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((p) => selectedCategories.includes(p.category))
    }

    // Apply price range filter
    filtered = filtered.filter((p) => p.price >= priceRange[0] && p.price <= priceRange[1])

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
      default:
        // Keep original order for newest
        break
    }

    return filtered.slice(0, itemsPerPage)
  }, [selectedCategories, priceRange, sortBy, itemsPerPage, filterParam, apiProducts])

  // Get unique categories from products, sorted alphabetically
  const categories = Array.from(new Set(apiProducts.map((p) => p.category))).sort()

  return (
    <main className="min-h-screen bg-background">
      <StructuredData data={collectionPageSchema(
        categoryParam || "All Products", 
        categoryParam 
          ? `Discover our exclusive ${categoryParam} collection of handcrafted luxury pieces`
          : "Discover our complete collection of handcrafted luxury pieces"
      )} />
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-center mb-4">
            {categoryParam ? `${categoryParam} Collection` : "Shop All Products"}
          </h1>
          <p className="text-center text-muted-foreground max-w-2xl mx-auto">
            {categoryParam 
              ? `Discover our exclusive ${categoryParam} collection of handcrafted luxury pieces`
              : "Discover our complete collection of handcrafted luxury pieces"
            }
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Sort and Show Controls */}
        <SortSection
          sortBy={sortBy}
          setSortBy={setSortBy}
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          totalProducts={filteredProducts.length}
        />

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Filter Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <FilterSection
              categories={categories}
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
            />
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            {loading ? (
              <div className="text-center py-16">Loading products...</div>
            ) : apiProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No products found.</p>
                {error && <p className="text-red-500 mt-2">{error}</p>}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground">No products found matching your filters.</p>
                <button
                  onClick={() => {
                    setSelectedCategories([])
                    setPriceRange([0, 15000])
                  }}
                  className="mt-4 text-[#006D77] hover:text-[#005761] underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Results count */}
                <div className="mt-8 text-center text-sm text-muted-foreground">
                  {error ? (
                    <span className="text-red-500 mr-2">{error}</span>
                  ) : null}
                  Showing {filteredProducts.length} of {apiProducts.length} products
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <ScrollToTop />
    </main>
  )
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ShopPageContent />
    </Suspense>
  )
}
