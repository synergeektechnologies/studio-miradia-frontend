"use client"

import Script from "next/script"
import { useEffect } from "react"

// Google Analytics configuration
const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "G-HQHH081SH3"

// Declare gtag function for TypeScript
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      config?: Record<string, any>
    ) => void
    dataLayer: any[]
  }
}

// Google Analytics component
export function GoogleAnalytics() {
  useEffect(() => {
    // Initialize dataLayer
    window.dataLayer = window.dataLayer || []
    
    // Define gtag function
    window.gtag = function gtag() {
      window.dataLayer.push(arguments)
    }
    
    // Set initial timestamp
    window.gtag("js", new Date())
  }, [])

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        strategy="afterInteractive"
      />
      
      {/* Google Analytics Configuration */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_title: document.title,
              page_location: window.location.href,
            });
          `,
        }}
      />
    </>
  )
}

// Utility functions for tracking events
export const trackEvent = (action: string, category: string, label?: string, value?: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", action, {
      event_category: category,
      event_label: label,
      value: value,
    })
  }
}

// E-commerce tracking functions
export const trackPurchase = (transactionId: string, value: number, currency: string = "USD", items: any[] = []) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "purchase", {
      transaction_id: transactionId,
      value: value,
      currency: currency,
      items: items,
    })
  }
}

export const trackAddToCart = (itemId: string, itemName: string, category: string, value: number, quantity: number = 1) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "add_to_cart", {
      currency: "USD",
      value: value,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          item_category: category,
          quantity: quantity,
          price: value,
        },
      ],
    })
  }
}

export const trackRemoveFromCart = (itemId: string, itemName: string, category: string, value: number, quantity: number = 1) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "remove_from_cart", {
      currency: "USD",
      value: value,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          item_category: category,
          quantity: quantity,
          price: value,
        },
      ],
    })
  }
}

export const trackViewItem = (itemId: string, itemName: string, category: string, value: number) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "view_item", {
      currency: "USD",
      value: value,
      items: [
        {
          item_id: itemId,
          item_name: itemName,
          item_category: category,
          price: value,
        },
      ],
    })
  }
}

export const trackBeginCheckout = (value: number, currency: string = "USD", items: any[] = []) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("event", "begin_checkout", {
      currency: currency,
      value: value,
      items: items,
    })
  }
}

// Page view tracking
export const trackPageView = (url: string, title?: string) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      page_title: title || document.title,
      page_location: url,
    })
  }
}
