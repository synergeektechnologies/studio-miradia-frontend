"use client"

import { useCart } from "@/contexts/cart-context"
import { ProductCard } from "@/components/product-card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"

export default function WishlistPage() {
  const { wishlist, addToCart, clearWishlist } = useCart()
  const { toast } = useToast()
  const [isClearing, setIsClearing] = useState(false)

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => {
      addToCart(product)
    })
    clearWishlist()
    toast({
      title: "Success!",
      description: `${wishlist.length} ${wishlist.length === 1 ? "item" : "items"} moved to cart`,
    })
  }

  const handleClearWishlist = () => {
    if (window.confirm("Are you sure you want to clear your wishlist?")) {
      setIsClearing(true)
      setTimeout(() => {
        clearWishlist()
        setIsClearing(false)
        toast({
          title: "Wishlist cleared",
          description: "All items have been removed from your wishlist",
        })
      }, 300)
    }
  }

  if (wishlist.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 bg-gray-100 rounded-full blur-2xl" />
            </div>
            <Heart className="h-24 w-24 mx-auto text-gray-400 relative" strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4 text-gray-900">Your Wishlist is Empty</h1>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Save your favorite pieces and create your perfect collection
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-base font-medium">
              Discover Our Collection
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {/* Header Section */}
        <div className="mb-12 mt-7">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900">My Wishlist</h1>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-6">
            <p className="text-gray-600 text-lg">
              {wishlist.length} {wishlist.length === 1 ? "treasured piece" : "treasured pieces"} saved
            </p>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button onClick={handleMoveAllToCart} className="bg-gray-900 hover:bg-gray-800 text-white gap-2">
                <ShoppingCart className="h-4 w-4" />
                Move All to Cart
              </Button>
              <Button
                onClick={handleClearWishlist}
                variant="outline"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 gap-2 bg-white"
                disabled={isClearing}
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-12" />

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {wishlist.map((product, index) => (
            <div
              key={product.id}
              className="animate-in fade-in slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 50}ms`, animationFillMode: "backwards" }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">Looking for more inspiration?</p>
          <Link href="/shop">
            <Button
              variant="outline"
              className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-white"
            >
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
