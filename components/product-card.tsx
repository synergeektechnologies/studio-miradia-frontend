"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import type { Product } from "../types/product"
import { useCart } from "../contexts/cart-context"
import type { CartProduct } from "../lib/cookies"
import { useState } from "react"
import { useToast } from "../hooks/use-toast"
import ProductImage from "./Product-Image"

interface ProductCardProps {
  product: Product
  variant?: "default" | "minimal"
  textColor?: "white" | "black"
}

export function ProductCard({ product, variant = "default", textColor = "white" }: ProductCardProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const { toast } = useToast()
  const [isHovered, setIsHovered] = useState(false)
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product as CartProduct)
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    const wasInWishlist = inWishlist
    toggleWishlist(product)
    
    if (wasInWishlist) {
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      })
    } else {
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      })
    }
  }

  if (variant === "minimal") {
    return (
      <Link href={`/product/${product.id}`}>
        <div className="group relative overflow-hidden h-full flex flex-col">
          {/* Image Container */}
          <div className="relative aspect-3/4 overflow-hidden bg-secondary/20 shrink-0">
            {/* <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            /> */}
            <ProductImage product={product} />
          </div>

          {/* Minimal Product Info */}
          <div className="mt-3 text-center flex flex-col grow">
            <h3 className={`font-light text-sm mb-1 min-h-10 overflow-hidden ${textColor === "black" ? "text-black/90" : "text-white/90"}`} style={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
            }}>{product.name}</h3>
            <span className={`text-base font-normal mt-auto ${textColor === "black" ? "text-black" : "text-white"}`}>₹{product.price.toLocaleString()}</span>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div
        className="group relative bg-card rounded-lg overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-3/4 overflow-hidden bg-secondary shrink-0">
          <ProductImage product={product} />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.limitedEdition && <Badge className="bg-[#D4A017] text-white border-none">Limited Edition</Badge>}
            {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
          </div>

          {/* Hover Actions */}
          {isHovered && product.inStock && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-3 animate-in fade-in duration-200">
              <Button
                size="icon"
                className="bg-[#006D77] hover:bg-[#005761] text-white rounded-full"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant={inWishlist ? "default" : "secondary"}
                className={`rounded-full ${inWishlist ? "bg-red-500 hover:bg-red-600 text-white" : ""}`}
                onClick={handleToggleWishlist}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
              </Button>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 flex flex-col grow">
          <h3 className="font-medium text-lg mb-2 text-balance min-h-14 overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical'
          }}>{product.name}</h3>
          <div className="flex items-center gap-2 mt-auto">
            <span className="text-lg font-semibold text-[#8B5A4A]">₹{product.price.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  )
}
