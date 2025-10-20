"use client"

import { useState, useEffect, use } from "react"
import { notFound } from "next/navigation"
import { getProductById, fetchProducts } from "@/lib/products"
import { ProductDetails } from "@/components/product/product-details"
import { RelatedProducts } from "@/components/product/related-products"
import { ScrollToTop } from "@/components/scroll-to-top"
import type { Product } from "@/types/product"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const [product, setProduct] = useState<Product | null>(null)
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const resolvedParams = use(params)

  useEffect(() => {
    let active = true
    
    const loadProduct = async () => {
      try {
        const products = await fetchProducts()
        if (!active) return
        
        const foundProduct = getProductById(products, resolvedParams.id)
        if (foundProduct) {
          setProduct(foundProduct)
          setAllProducts(products)
        } else {
          setError("Product not found")
        }
      } catch (e) {
        if (!active) return
        setError("Failed to load product")
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProduct()
    return () => { active = false }
  }, [resolvedParams.id])

  if (loading) {
    return (
      <main className="min-h-screen bg-background">
        <div className="text-center py-16">Loading product...</div>
      </main>
    )
  }

  if (error || !product) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background">
      <ProductDetails product={product} />
      <RelatedProducts 
        currentProductId={product.id} 
        category={product.category}
        allProducts={allProducts}
      />
      <ScrollToTop />
    </main>
  )
}
