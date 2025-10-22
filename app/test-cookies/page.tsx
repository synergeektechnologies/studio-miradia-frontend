"use client"

import { CookieTestComponent } from "../../components/cookie-test"
import { CartProvider } from "../../contexts/cart-context"

export default function TestCookiesPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Cookie Persistence Test</h1>
        <p className="text-muted-foreground mb-8">
          This page allows you to test the cookie persistence functionality for cart and wishlist data.
          Add items, refresh the page, and verify that your data persists across sessions.
        </p>
        
        <CookieTestComponent />
        
        <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <h3 className="font-semibold mb-2">How to Test:</h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Add test products to your cart and wishlist using the buttons above</li>
            <li>Click "Refresh Page" to test immediate persistence</li>
            <li>Close your browser completely and reopen it</li>
            <li>Navigate back to this page - your data should still be there</li>
            <li>Check your browser's developer tools → Application → Cookies to see the stored data</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
