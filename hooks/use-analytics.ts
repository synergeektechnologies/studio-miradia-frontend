"use client"

import { useCallback } from "react"
import { 
  trackEvent, 
  trackPurchase, 
  trackAddToCart, 
  trackRemoveFromCart, 
  trackViewItem, 
  trackBeginCheckout, 
  trackPageView 
} from "../components/google-analytics"

export function useAnalytics() {
  // Track custom events
  const trackCustomEvent = useCallback((
    action: string, 
    category: string, 
    label?: string, 
    value?: number
  ) => {
    trackEvent(action, category, label, value)
  }, [])

  // Track page views
  const trackPage = useCallback((url: string, title?: string) => {
    trackPageView(url, title)
  }, [])

  // Track product views
  const trackProductView = useCallback((
    productId: string, 
    productName: string, 
    category: string, 
    price: number
  ) => {
    trackViewItem(productId, productName, category, price)
  }, [])

  // Track cart events
  const trackCartAdd = useCallback((
    productId: string, 
    productName: string, 
    category: string, 
    price: number, 
    quantity: number = 1
  ) => {
    trackAddToCart(productId, productName, category, price, quantity)
  }, [])

  const trackCartRemove = useCallback((
    productId: string, 
    productName: string, 
    category: string, 
    price: number, 
    quantity: number = 1
  ) => {
    trackRemoveFromCart(productId, productName, category, price, quantity)
  }, [])

  // Track checkout events
  const trackCheckoutBegin = useCallback((
    value: number, 
    currency: string = "USD", 
    items: any[] = []
  ) => {
    trackBeginCheckout(value, currency, items)
  }, [])

  const trackPurchaseComplete = useCallback((
    transactionId: string, 
    value: number, 
    currency: string = "USD", 
    items: any[] = []
  ) => {
    trackPurchase(transactionId, value, currency, items)
  }, [])

  // Track user interactions
  const trackSearch = useCallback((searchTerm: string, resultsCount?: number) => {
    trackEvent("search", "engagement", searchTerm, resultsCount)
  }, [])

  const trackNewsletterSignup = useCallback(() => {
    trackEvent("newsletter_signup", "engagement", "newsletter")
  }, [])

  const trackContactForm = useCallback(() => {
    trackEvent("contact_form_submit", "engagement", "contact")
  }, [])

  const trackWishlistAdd = useCallback((productId: string, productName: string) => {
    trackEvent("add_to_wishlist", "engagement", `${productId}-${productName}`)
  }, [])

  const trackWishlistRemove = useCallback((productId: string, productName: string) => {
    trackEvent("remove_from_wishlist", "engagement", `${productId}-${productName}`)
  }, [])

  return {
    trackCustomEvent,
    trackPage,
    trackProductView,
    trackCartAdd,
    trackCartRemove,
    trackCheckoutBegin,
    trackPurchaseComplete,
    trackSearch,
    trackNewsletterSignup,
    trackContactForm,
    trackWishlistAdd,
    trackWishlistRemove,
  }
}
