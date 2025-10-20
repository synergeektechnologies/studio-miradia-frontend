"use client"

import { useCart } from "@/contexts/cart-context"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { getProductDisplayImage } from "@/lib/utils"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity } = useCart()

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 2500 ? 0 : 200
  const total = subtotal + shipping

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center mt-20">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some beautiful pieces to your cart</p>
          <Link href="/shop">
            <Button size="lg" className="bg-[#006D77] hover:bg-[#005761] text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedColorId || 'no-color'}`} className="bg-card border border-border rounded-lg p-4 flex gap-4">
                <div className="relative w-24 h-32 flex-shrink-0 rounded-md overflow-hidden bg-secondary">
                  <Image 
                    src={getProductDisplayImage(item)} 
                    alt={item.name} 
                    fill 
                    className="object-cover" 
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link href={`/product/${item.id}`} className="font-semibold hover:text-[#006D77] transition-colors">
                      {item.name}
                    </Link>
                    <div className="flex items-center gap-4 mt-1">
                      {item.selectedColorId && item.colors && (
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Color:</span>
                          {(() => {
                            const selectedColor = item.colors.find(color => color.id === item.selectedColorId)
                            return selectedColor ? (
                              <div className="flex items-center gap-1">
                                {selectedColor.imageUrl ? (
                                  <div className="relative w-4 h-4 rounded-full overflow-hidden border border-gray-200">
                                    <Image
                                      src={selectedColor.imageUrl}
                                      alt={selectedColor.name}
                                      fill
                                      className="object-cover"
                                    />
                                  </div>
                                ) : selectedColor.colorCode ? (
                                  <div
                                    className="w-4 h-4 rounded-full border border-gray-200"
                                    style={{ backgroundColor: selectedColor.colorCode }}
                                  />
                                ) : (
                                  <div className="w-4 h-4 rounded-full border border-gray-200 bg-gray-100" />
                                )}
                                <span className="text-sm text-gray-600">{selectedColor.name}</span>
                              </div>
                            ) : null
                          })()}
                        </div>
                      )}
                    </div>
                    <p className="text-lg font-semibold text-[#8B5A4A] mt-2">₹{item.price.toLocaleString()}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        className="h-8 w-8 bg-transparent"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>

                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-destructive hover:text-destructive"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
              <h2 className="font-serif text-2xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-medium">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-muted-foreground">
                    Add ₹{(2500 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}
                <div className="border-t border-border pt-3 flex justify-between">
                  <span className="font-semibold">Total</span>
                  <span className="font-bold text-xl text-[#8B5A4A]">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout">
                <Button size="lg" className="w-full bg-[#006D77] hover:bg-[#005761] text-white mb-4">
                  Proceed to Checkout
                </Button>
              </Link>

              <Link href="/shop">
                <Button size="lg" variant="outline" className="w-full bg-transparent">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
