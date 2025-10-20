"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"
import { useToast } from "@/hooks/use-toast"
import type { Product } from "@/types/product"

export interface CartProduct extends Product {
  selectedColorId?: string
}

interface CartItem extends CartProduct {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  wishlist: Product[]
  addToCart: (product: CartProduct) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  toggleWishlist: (product: Product) => void
  clearWishlist: () => void
  isInWishlist: (productId: string) => boolean
  cartCount: number
  wishlistCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [wishlist, setWishlist] = useState<Product[]>([])
  const { toast } = useToast()

  const addToCart = useCallback(
    (product: CartProduct) => {
      setCart((prev) => {
        const existing = prev.find((item) => 
          item.id === product.id && 
          item.selectedColorId === product.selectedColorId
        )
        if (existing) {
          return prev.map((item) =>
            item.id === product.id && 
            item.selectedColorId === product.selectedColorId 
              ? { ...item, quantity: item.quantity + 1 } 
              : item,
          )
        }
        return [...prev, { ...product, quantity: 1 }]
      })
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    },
    [toast],
  )

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId))
  }, [])

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(productId)
        return
      }
      setCart((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
    },
    [removeFromCart],
  )

  const clearCart = useCallback(() => {
    setCart([])
  }, [])

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const exists = prev.find((item) => item.id === product.id)
        if (exists) {
          return prev.filter((item) => item.id !== product.id)
        }
        return [...prev, product]
      })
    },
    [],
  )

  const clearWishlist = useCallback(() => {
    setWishlist([])
  }, [])

  const isInWishlist = useCallback((productId: string) => wishlist.some((item) => item.id === productId), [wishlist])

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const wishlistCount = wishlist.length

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        clearWishlist,
        isInWishlist,
        cartCount,
        wishlistCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within CartProvider")
  }
  return context
}
