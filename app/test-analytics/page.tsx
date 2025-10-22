"use client"

import { useAnalytics } from "../../hooks/use-analytics"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { 
  ShoppingCart, 
  Heart, 
  Search, 
  Mail, 
  MessageSquare, 
  Eye,
  CreditCard,
  CheckCircle
} from "lucide-react"

export default function TestAnalyticsPage() {
  const {
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
  } = useAnalytics()

  const handleTestProductView = () => {
    trackProductView("test-product-1", "Test Product", "Fashion", 99.99)
    console.log("Product view tracked")
  }

  const handleTestCartAdd = () => {
    trackCartAdd("test-product-1", "Test Product", "Fashion", 99.99, 1)
    console.log("Add to cart tracked")
  }

  const handleTestCartRemove = () => {
    trackCartRemove("test-product-1", "Test Product", "Fashion", 99.99, 1)
    console.log("Remove from cart tracked")
  }

  const handleTestWishlistAdd = () => {
    trackWishlistAdd("test-product-1", "Test Product")
    console.log("Add to wishlist tracked")
  }

  const handleTestWishlistRemove = () => {
    trackWishlistRemove("test-product-1", "Test Product")
    console.log("Remove from wishlist tracked")
  }

  const handleTestSearch = () => {
    trackSearch("test search query", 5)
    console.log("Search tracked")
  }

  const handleTestNewsletter = () => {
    trackNewsletterSignup()
    console.log("Newsletter signup tracked")
  }

  const handleTestContact = () => {
    trackContactForm()
    console.log("Contact form tracked")
  }

  const handleTestCheckout = () => {
    trackCheckoutBegin(199.98, "USD", [
      { item_id: "test-product-1", item_name: "Test Product", price: 99.99, quantity: 2 }
    ])
    console.log("Checkout begin tracked")
  }

  const handleTestPurchase = () => {
    trackPurchaseComplete("txn-123", 199.98, "USD", [
      { item_id: "test-product-1", item_name: "Test Product", price: 99.99, quantity: 2 }
    ])
    console.log("Purchase complete tracked")
  }

  const handleTestCustomEvent = () => {
    trackCustomEvent("button_click", "engagement", "test_button", 1)
    console.log("Custom event tracked")
  }

  const handleTestPageView = () => {
    trackPage("/test-analytics", "Analytics Test Page")
    console.log("Page view tracked")
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Google Analytics Test</h1>
        <p className="text-muted-foreground mb-8">
          Test Google Analytics tracking events. Check your browser's developer console and Google Analytics dashboard to verify events are being tracked.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Product Views
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={handleTestProductView} variant="outline" className="w-full">
                Track Product View
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Cart Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={handleTestCartAdd} variant="outline" className="w-full">
                Add to Cart
              </Button>
              <Button onClick={handleTestCartRemove} variant="outline" className="w-full">
                Remove from Cart
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Wishlist Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={handleTestWishlistAdd} variant="outline" className="w-full">
                Add to Wishlist
              </Button>
              <Button onClick={handleTestWishlistRemove} variant="outline" className="w-full">
                Remove from Wishlist
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <Search className="h-4 w-4" />
                Search & Engagement
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={handleTestSearch} variant="outline" className="w-full">
                Track Search
              </Button>
              <Button onClick={handleTestNewsletter} variant="outline" className="w-full">
                Newsletter Signup
              </Button>
              <Button onClick={handleTestContact} variant="outline" className="w-full">
                Contact Form
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Checkout Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={handleTestCheckout} variant="outline" className="w-full">
                Begin Checkout
              </Button>
              <Button onClick={handleTestPurchase} variant="outline" className="w-full">
                Complete Purchase
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm flex items-center gap-2">
                <CheckCircle className="h-4 w-4" />
                Other Events
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={handleTestCustomEvent} variant="outline" className="w-full">
                Custom Event
              </Button>
              <Button onClick={handleTestPageView} variant="outline" className="w-full">
                Page View
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 p-4 bg-green-50 dark:bg-green-950 rounded-lg">
          <h3 className="font-semibold mb-2 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            How to Verify Analytics:
          </h3>
          <ol className="list-decimal list-inside space-y-1 text-sm">
            <li>Open browser developer tools (F12)</li>
            <li>Go to Console tab to see tracking confirmations</li>
            <li>Go to Network tab and filter by "google-analytics" or "gtag"</li>
            <li>Click the test buttons above and verify requests are sent</li>
            <li>Check your Google Analytics dashboard (may take a few minutes to appear)</li>
            <li>Look for events in Real-time reports</li>
          </ol>
        </div>

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
          <h3 className="font-semibold mb-2">Google Analytics ID:</h3>
          <Badge variant="secondary" className="font-mono">G-HQHH081SH3</Badge>
          <p className="text-sm text-muted-foreground mt-2">
            This ID is configured in the Google Analytics component and will track all events across your site.
          </p>
        </div>
      </div>
    </div>
  )
}
