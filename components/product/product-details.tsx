"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Heart, ShoppingCart, Truck, RotateCcw, Shield, ZoomIn } from "lucide-react"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog"
import type { Product } from "../../types/product"
import type { Color } from "../../types/color"
import { useCart } from "../../contexts/cart-context"
import { useToast } from "../../hooks/use-toast"

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  const { addToCart, toggleWishlist, isInWishlist } = useCart()
  const { toast } = useToast()
  const inWishlist = isInWishlist(product.id)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColorId, setSelectedColorId] = useState<string | null>(
    product.colors && product.colors.length > 0 ? product.colors[0].id : null
  )

  // Get all available images (prioritize imageUrls over single image)
  const allImages = product.imageUrls && product.imageUrls.length > 0 
    ? product.imageUrls 
    : product.image 
      ? [product.image] 
      : []

  const currentImage = allImages[selectedImageIndex] || ""

  // Set first color as default when product changes
  useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      setSelectedColorId(product.colors[0].id)
    } else {
      setSelectedColorId(null)
    }
  }, [product])

  const handleAddToCart = () => {
    const productWithColor = {
      ...product,
      selectedColorId: selectedColorId || undefined
    }
    addToCart(productWithColor)
  }

  const handleBuyNow = () => {
    const productWithColor = {
      ...product,
      selectedColorId: selectedColorId || undefined
    }
    addToCart(productWithColor)
    window.location.href = "/cart"
  }

  const handleToggleWishlist = () => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 md:pt-24 pb-8 md:pb-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <div className="space-y-4">
          {/* Main Image */}
          <Dialog>
            <DialogTrigger asChild>
              <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-secondary cursor-zoom-in group">
                <Image
                  src={currentImage || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <ZoomIn className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <div className="relative aspect-[3/4] w-full">
                <Image
                  src={currentImage || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>

          {/* Thumbnail Gallery */}
          {allImages.length > 1 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                {allImages.length === 1 ? 'Product Image' : `${allImages.length} Images`}
              </p>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {allImages.map((image: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 flex-shrink-0 transition-colors ${
                      index === selectedImageIndex ? 'border-primary' : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {/* Title and Stock */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h1 className="font-serif text-3xl md:text-4xl font-bold text-balance">{product.name}</h1>
              <Button
                variant={inWishlist ? "default" : "outline"}
                size="icon"
                onClick={handleToggleWishlist}
                className={inWishlist ? "bg-red-500 hover:bg-red-600 text-white" : ""}
              >
                <Heart className={`h-5 w-5 ${inWishlist ? "fill-current" : ""}`} />
              </Button>
            </div>
            <div className="flex items-center gap-3">
              {product.inStock ? (
                <Badge className="bg-green-500 text-white">In Stock</Badge>
              ) : (
                <Badge variant="destructive">Out of Stock</Badge>
              )}
              {product.limitedEdition && <Badge className="bg-[#D4A017] text-white">Limited Edition</Badge>}
            </div>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3">
            <span className="text-4xl font-bold text-[#8B5A4A]">₹{product.price.toLocaleString()}</span>
          </div>

          {/* Available Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-semibold text-lg">Available Colors</h3>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color: Color) => {
                  const isSelected = selectedColorId === color.id
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColorId(color.id)}
                      className={`relative w-8 h-8 rounded-full overflow-hidden border-2 transition-all duration-200 ${
                        isSelected 
                          ? 'border-primary ring-2 ring-primary/20' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      title={color.name}
                    >
                      {color.imageUrl ? (
                        <Image
                          src={color.imageUrl}
                          alt={color.name}
                          fill
                          className="object-cover"
                        />
                      ) : color.colorCode ? (
                        <div
                          className="w-full h-full"
                          style={{ backgroundColor: color.colorCode }}
                        />
                      ) : (
                        <div className="w-full h-full bg-gray-100" />
                      )}
                      {isSelected && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full shadow-sm"></div>
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Description */}
          <div className="prose prose-sm max-w-none">
            <p className="text-muted-foreground leading-relaxed">
              This {product.name} features delicate hand-embroidered butterfly patterns, with a flowing silhouette that
              dances with every step. Crafted from breathable natural fabrics, it embodies elegance in every thread.
              Each piece is handcrafted by skilled artisans, making it truly one-of-a-kind.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              size="lg"
              className="w-full bg-[#006D77] hover:bg-[#005761] text-white"
              onClick={handleBuyNow}
              disabled={!product.inStock}
            >
              Buy Now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full bg-transparent"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border">
            <div className="text-center">
              <Truck className="h-6 w-6 mx-auto mb-2 text-[#006D77]" />
              <p className="text-xs font-medium">Free Shipping</p>
              <p className="text-xs text-muted-foreground">On orders above ₹2,500</p>
            </div>
            <div className="text-center">
              <RotateCcw className="h-6 w-6 mx-auto mb-2 text-[#006D77]" />
              <p className="text-xs font-medium">7-Day Returns</p>
              <p className="text-xs text-muted-foreground">Easy returns policy</p>
            </div>
            <div className="text-center">
              <Shield className="h-6 w-6 mx-auto mb-2 text-[#006D77]" />
              <p className="text-xs font-medium">Secure Payment</p>
              <p className="text-xs text-muted-foreground">100% secure checkout</p>
            </div>
          </div>

          {/* Additional Info */}
          <div className="space-y-4 pt-6 border-t border-border">
            <div>
              <h3 className="font-semibold mb-2">Wash Care</h3>
              <p className="text-sm text-muted-foreground">
                Hand wash in cold water. Dry in shade to preserve colors. Iron on low heat.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Material</h3>
              <p className="text-sm text-muted-foreground">100% natural silk with hand-embroidered details</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
