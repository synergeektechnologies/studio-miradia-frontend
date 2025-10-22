"use client"

import { useCart } from "../contexts/cart-context"
import { Button } from "./ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { Badge } from "./ui/badge"
import { ShoppingCart, Heart, Trash2, RefreshCw, Bug, Database } from "lucide-react"
import { debugCookieData, clearAllData } from "../lib/cookies"

/**
 * Test component to demonstrate cookie persistence
 * This component can be used to test that cart and wishlist data
 * persists across browser sessions
 */
export function CookieTestComponent() {
  const { 
    cart, 
    wishlist, 
    addToCart, 
    removeFromCart, 
    clearCart, 
    toggleWishlist, 
    clearWishlist,
    cartCount,
    wishlistCount 
  } = useCart()

  const handleTestAddToCart = () => {
    // Add a test product to cart
    const testProduct = {
      id: `test-${Date.now()}`,
      name: `Test Product ${cart.length + 1}`,
      price: 99.99,
      image: "/placeholder.jpg",
      description: "Test product for cookie persistence",
      selectedColorId: "test-color-1"
    }
    addToCart(testProduct)
  }

  const handleTestAddToWishlist = () => {
    // Add a test product to wishlist
    const testProduct = {
      id: `wishlist-test-${Date.now()}`,
      name: `Wishlist Product ${wishlist.length + 1}`,
      price: 149.99,
      image: "/placeholder.jpg",
      description: "Test product for wishlist cookie persistence"
    }
    toggleWishlist(testProduct)
  }

  const handleRefreshPage = () => {
    window.location.reload()
  }

  const handleDebugCookies = () => {
    debugCookieData()
  }

  const handleClearAllData = () => {
    if (window.confirm("Are you sure you want to clear all cart and wishlist data?")) {
      clearAllData()
      clearCart()
      clearWishlist()
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RefreshCw className="h-5 w-5" />
            Cookie Persistence Test
          </CardTitle>
          <CardDescription>
            Test that cart and wishlist data persists across browser sessions
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <Button onClick={handleTestAddToCart} variant="outline">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add Test Product to Cart
            </Button>
            <Button onClick={handleTestAddToWishlist} variant="outline">
              <Heart className="h-4 w-4 mr-2" />
              Add Test Product to Wishlist
            </Button>
            <Button onClick={handleRefreshPage} variant="secondary">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Page (Test Persistence)
            </Button>
            <Button onClick={handleDebugCookies} variant="outline">
              <Bug className="h-4 w-4 mr-2" />
              Debug Cookies (Console)
            </Button>
            <Button onClick={handleClearAllData} variant="destructive">
              <Database className="h-4 w-4 mr-2" />
              Clear All Data
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4" />
                  Cart ({cartCount} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Cart is empty</p>
                ) : (
                  <div className="space-y-2">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.selectedColorId}`} className="flex items-center justify-between text-sm">
                        <span>{item.name} (Qty: {item.quantity})</span>
                        <Badge variant="secondary">${item.price}</Badge>
                      </div>
                    ))}
                    <Button 
                      onClick={clearCart} 
                      variant="destructive" 
                      size="sm"
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Cart
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Wishlist ({wishlistCount} items)
                </CardTitle>
              </CardHeader>
              <CardContent>
                {wishlist.length === 0 ? (
                  <p className="text-sm text-muted-foreground">Wishlist is empty</p>
                ) : (
                  <div className="space-y-2">
                    {wishlist.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-sm">
                        <span>{item.name}</span>
                        <Badge variant="secondary">${item.price}</Badge>
                      </div>
                    ))}
                    <Button 
                      onClick={clearWishlist} 
                      variant="destructive" 
                      size="sm"
                      className="w-full"
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear Wishlist
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="text-xs text-muted-foreground bg-muted p-3 rounded">
            <strong>Instructions:</strong>
            <ol className="list-decimal list-inside mt-2 space-y-1">
              <li>Add some test products to cart and wishlist</li>
              <li>Click "Refresh Page" to test persistence</li>
              <li>Close and reopen your browser to test full persistence</li>
              <li>Check browser developer tools → Application → Cookies to see stored data</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
