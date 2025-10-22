import Cookies from 'js-cookie'
import type { Product } from '../types/product'

export interface CartProduct extends Product {
  selectedColorId?: string
}

export interface CartItem extends CartProduct {
  quantity: number
}

// Cookie keys
const CART_COOKIE_KEY = 'studio_miradia_cart'
const WISHLIST_COOKIE_KEY = 'studio_miradia_wishlist'

// Cookie options
const COOKIE_OPTIONS = {
  expires: 30, // 30 days
  secure: process.env.NODE_ENV === 'production',
  sameSite: 'lax' as const,
  path: '/'
}

/**
 * Get cart data from cookies
 */
export function getCartFromCookies(): CartItem[] {
  if (typeof window === 'undefined') return []
  
  try {
    const cartData = Cookies.get(CART_COOKIE_KEY)
    return cartData ? JSON.parse(cartData) : []
  } catch (error) {
    console.error('Error parsing cart from cookies:', error)
    return []
  }
}

/**
 * Save cart data to cookies
 */
export function saveCartToCookies(cart: CartItem[]): void {
  if (typeof window === 'undefined') return
  
  try {
    Cookies.set(CART_COOKIE_KEY, JSON.stringify(cart), COOKIE_OPTIONS)
  } catch (error) {
    console.error('Error saving cart to cookies:', error)
  }
}

/**
 * Get wishlist data from cookies
 */
export function getWishlistFromCookies(): Product[] {
  if (typeof window === 'undefined') return []
  
  try {
    const wishlistData = Cookies.get(WISHLIST_COOKIE_KEY)
    return wishlistData ? JSON.parse(wishlistData) : []
  } catch (error) {
    console.error('Error parsing wishlist from cookies:', error)
    return []
  }
}

/**
 * Save wishlist data to cookies
 */
export function saveWishlistToCookies(wishlist: Product[]): void {
  if (typeof window === 'undefined') return
  
  try {
    Cookies.set(WISHLIST_COOKIE_KEY, JSON.stringify(wishlist), COOKIE_OPTIONS)
  } catch (error) {
    console.error('Error saving wishlist to cookies:', error)
  }
}

/**
 * Clear cart cookies
 */
export function clearCartCookies(): void {
  if (typeof window === 'undefined') return
  
  Cookies.remove(CART_COOKIE_KEY, { path: '/' })
}

/**
 * Clear wishlist cookies
 */
export function clearWishlistCookies(): void {
  if (typeof window === 'undefined') return
  
  Cookies.remove(WISHLIST_COOKIE_KEY, { path: '/' })
}

/**
 * Clear all cart and wishlist cookies
 */
export function clearAllCartCookies(): void {
  clearCartCookies()
  clearWishlistCookies()
}

/**
 * Check if we're on the client side
 */
export function isClientSide(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Get cart count from cookies (for SSR)
 */
export function getCartCountFromCookies(): number {
  if (!isClientSide()) return 0
  
  try {
    const cart = getCartFromCookies()
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  } catch (error) {
    console.error('Error getting cart count from cookies:', error)
    return 0
  }
}

/**
 * Get wishlist count from cookies (for SSR)
 */
export function getWishlistCountFromCookies(): number {
  if (!isClientSide()) return 0
  
  try {
    const wishlist = getWishlistFromCookies()
    return wishlist.length
  } catch (error) {
    console.error('Error getting wishlist count from cookies:', error)
    return 0
  }
}

/**
 * Debug function to log all cookie data
 */
export function debugCookieData(): void {
  if (!isClientSide()) {
    console.log('Not on client side - cannot access cookies')
    return
  }
  
  console.log('=== Cookie Debug Information ===')
  console.log('Cart data:', getCartFromCookies())
  console.log('Wishlist data:', getWishlistFromCookies())
  console.log('Cart count:', getCartCountFromCookies())
  console.log('Wishlist count:', getWishlistCountFromCookies())
  console.log('All cookies:', document.cookie)
  console.log('================================')
}

/**
 * Clear all cart and wishlist data (for testing)
 */
export function clearAllData(): void {
  if (!isClientSide()) return
  
  clearAllCartCookies()
  console.log('All cart and wishlist data cleared')
}
