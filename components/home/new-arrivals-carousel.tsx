"use client"

import { useState, useEffect } from "react"
import { ProductCard } from "../product-card"
import { fetchNewestProducts } from "../../lib/products"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "../ui/button"
import type { Product } from "../../types/product"

export function NewArrivalsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(4)
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerSlide(1)
      } else {
        setItemsPerSlide(4)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    let active = true
    
    const loadProducts = async () => {
      try {
        const fetchedProducts = await fetchNewestProducts(10)
        if (!active) return
        setProducts(fetchedProducts)
      } catch (e) {
        console.error("Failed to load newest products:", e)
      } finally {
        if (active) setLoading(false)
      }
    }

    loadProducts()
    return () => { active = false }
  }, [])

  const maxIndex = Math.max(0, products.length - itemsPerSlide)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const itemWidth = 100 / itemsPerSlide
  const translateX = currentIndex * itemWidth

  if (loading) {
    return (
      <section className="bg-[#F6EFE9] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-mocha mb-2">New Arrivals</h2>
            <p className="text-mocha/70 text-lg">Fresh pieces for your wardrobe</p>
          </div>
          <div className="text-center py-16">
            <p className="text-mocha/70">Loading products...</p>
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="bg-[#F6efe9] py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl md:text-5xl font-normal text-mocha mb-2">New Arrivals</h2>
            <p className="text-mocha/70 text-lg">Fresh pieces for your wardrobe</p>
          </div>
          <div className="text-center py-16">
            <p className="text-mocha/70">No products available at the moment.</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="bg-[#F6efe9] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl md:text-5xl font-normal text-mocha mb-2">New Arrivals</h2>
          <p className="text-mocha/70 text-lg">Fresh pieces for your wardrobe</p>
        </div>

        <div className="relative">
          {/* Carousel wrapper */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{
                transform: `translateX(-${translateX}%)`,
              }}
            >
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 px-2 md:px-3" style={{ width: `${itemWidth}%` }}>
                  <ProductCard product={product} variant="minimal" textColor="black" />
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-mocha/90 hover:bg-mocha rounded-full w-10 h-10 md:w-12 md:h-12 shadow-lg"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-mocha/90 hover:bg-mocha rounded-full w-10 h-10 md:w-12 md:h-12 shadow-lg"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </Button>
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: maxIndex + 1 }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentIndex ? "bg-mocha w-8" : "bg-mocha/40"
              }`}
              aria-label={`Go to position ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
