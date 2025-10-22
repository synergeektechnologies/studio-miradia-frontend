"use client"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { AlertTriangle, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function Test404Page() {
  const testRoutes = [
    "/nonexistent-page",
    "/shop/invalid-product",
    "/admin/nonexistent",
    "/random-url-that-does-not-exist",
    "/products/invalid-id",
    "/checkout/invalid-step"
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              404 Page Test
            </CardTitle>
            <CardDescription>
              Test the custom 404 page by visiting non-existent routes
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="font-semibold mb-4">Test Routes (Click to trigger 404):</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {testRoutes.map((route, index) => (
                  <Link key={index} href={route}>
                    <Button variant="outline" className="w-full justify-between">
                      <span className="font-mono text-sm">{route}</span>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </Link>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h4 className="font-semibold mb-2">How to Test:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Click any of the test routes above</li>
                <li>You should see the custom 404 page</li>
                <li>Test the navigation buttons on the 404 page</li>
                <li>Verify the page matches Studio Miradia branding</li>
                <li>Check that all links work correctly</li>
              </ol>
            </div>

            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h4 className="font-semibold mb-2">404 Page Features:</h4>
              <ul className="list-disc list-inside space-y-1 text-sm">
                <li>Studio Miradia branded design with butterfly theme</li>
                <li>Quick navigation cards (Home, Shop, Wishlist, Search)</li>
                <li>Popular category badges</li>
                <li>Main action buttons (Back to Home, Start Shopping)</li>
                <li>Helpful links (Contact, About, Shipping)</li>
                <li>Responsive design for all devices</li>
              </ul>
            </div>

            <div className="text-center">
              <Link href="/">
                <Button className="bg-[#8B5A4A] hover:bg-[#8B5A4A]/90">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
