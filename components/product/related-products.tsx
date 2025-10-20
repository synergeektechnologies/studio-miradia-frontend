"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { ProductCard } from "@/components/product-card"
import type { Product } from "@/types/product"
import { Button } from "@/components/ui/button"

interface RelatedProductsProps {
  currentProductId: string
  category: string
  allProducts: Product[]
}

export function RelatedProducts({ currentProductId, category, allProducts }: RelatedProductsProps) {
  const relatedProducts = allProducts.filter((p) => p.category === category && p.id !== currentProductId).slice(0, 8)

  const [currentSlide, setCurrentSlide] = useState(0)
  const [itemsPerSlide, setItemsPerSlide] = useState(4)

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

  if (relatedProducts.length === 0) return null

  const totalSlides = Math.max(0, relatedProducts.length - itemsPerSlide)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev >= totalSlides ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev <= 0 ? totalSlides : prev - 1))
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-border">
      <h2 className="font-serif text-3xl md:text-4xl font-bold mb-8 text-center">You May Also Like</h2>

      <div className="relative">
        {/* Carousel Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / itemsPerSlide)}%)`,
            }}
          >
            {relatedProducts.map((product) => (
              <div key={product.id} className="flex-shrink-0 px-3" style={{ width: `${100 / itemsPerSlide}%` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        {relatedProducts.length > itemsPerSlide && (
          <>
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 shadow-lg z-10"
              aria-label="Previous products"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 shadow-lg z-10"
              aria-label="Next products"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Dot Indicators */}
        {relatedProducts.length > itemsPerSlide && (
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: totalSlides + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all ${
                  currentSlide === index ? "w-8 bg-[#8B5A4A]" : "w-2 bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
