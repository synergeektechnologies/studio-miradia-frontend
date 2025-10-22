"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback, useEffect } from "react"
import { useToast } from "../hooks/use-toast"
import type { Product } from "../types/product"
import { 
  getCartFromCookies, 
  saveCartToCookies, 
  getWishlistFromCookies, 
  saveWishlistToCookies,
  clearCartCookies,
  clearWishlistCookies,
  type CartItem,
  type CartProduct
} from "../lib/cookies"
import { trackAddToCart, trackRemoveFromCart } from "../components/google-analytics"
import { useAnalytics } from "../hooks/use-analytics"

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
  const [isInitialized, setIsInitialized] = useState(false)
  const { toast } = useToast()
  const { trackWishlistAdd, trackWishlistRemove } = useAnalytics()

  // Load data from cookies on mount
  useEffect(() => {
    const loadFromCookies = () => {
      try {
        const savedCart = getCartFromCookies()
        const savedWishlist = getWishlistFromCookies()
        
        setCart(savedCart)
        setWishlist(savedWishlist)
        setIsInitialized(true)
      } catch (error) {
        console.error('Error loading cart/wishlist from cookies:', error)
        setIsInitialized(true)
      }
    }

    loadFromCookies()
  }, [])

  // Save to cookies whenever cart or wishlist changes
  useEffect(() => {
    if (isInitialized) {
      saveCartToCookies(cart)
    }
  }, [cart, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      saveWishlistToCookies(wishlist)
    }
  }, [wishlist, isInitialized])

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
      
      // Track add to cart event in Google Analytics
      trackAddToCart(
        product.id,
        product.name,
        product.category || "Fashion",
        product.price,
        1
      )
      
      toast({
        title: "Added to cart",
        description: `${product.name} has been added to your cart.`,
      })
    },
    [toast],
  )

  const removeFromCart = useCallback((productId: string) => {
    setCart((prev) => {
      const itemToRemove = prev.find((item) => item.id === productId)
      if (itemToRemove) {
        // Track remove from cart event in Google Analytics
        trackRemoveFromCart(
          itemToRemove.id,
          itemToRemove.name,
          itemToRemove.category || "Fashion",
          itemToRemove.price,
          itemToRemove.quantity
        )
      }
      return prev.filter((item) => item.id !== productId)
    })
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
    clearCartCookies()
  }, [])

  const toggleWishlist = useCallback(
    (product: Product) => {
      setWishlist((prev) => {
        const exists = prev.find((item) => item.id === product.id)
        if (exists) {
          // Track wishlist removal
          trackWishlistRemove(product.id, product.name)
          return prev.filter((item) => item.id !== product.id)
        } else {
          // Track wishlist addition
          trackWishlistAdd(product.id, product.name)
          return [...prev, product]
        }
      })
    },
    [trackWishlistAdd, trackWishlistRemove],
  )

  const clearWishlist = useCallback(() => {
    setWishlist([])
    clearWishlistCookies()
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
