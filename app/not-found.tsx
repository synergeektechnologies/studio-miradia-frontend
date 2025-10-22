import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { 
  Home, 
  Search, 
  ShoppingBag, 
  Heart, 
  ArrowLeft,
  Sparkles
} from "lucide-react"
import Image from "next/image"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-linear-to-br from-[#8B5A4A]/5 via-white to-[#8B5A4A]/10 flex items-center justify-center px-4">
      <div className="max-w-4xl mx-auto text-center">
        {/* Heart decoration */}
        <div className="relative mb-8">
          <div className="absolute -top-4 -left-4 text-[#8B5A4A]/20">
            <Heart className="h-8 w-8 rotate-12" />
          </div>
          <div className="absolute -top-2 -right-6 text-[#8B5A4A]/15">
            <Heart className="h-6 w-6 -rotate-12" />
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-[#8B5A4A]/10">
            <Heart className="h-4 w-4 rotate-45" />
          </div>
        </div>

        {/* Main 404 Content */}
        <div className="mb-12">
          <h1 className="font-serif text-8xl md:text-9xl font-light text-[#8B5A4A] mb-4">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-serif text-[#8B5A4A] mb-6">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have fluttered away like a butterfly. 
            Let us guide you back to our beautiful collection.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <Home className="h-8 w-8 text-[#8B5A4A] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-[#8B5A4A] mb-2">Home</h3>
              <p className="text-sm text-gray-600 mb-4">Return to our homepage</p>
              <Link href="/">
                <Button variant="outline" size="sm" className="w-full">
                  Go Home
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <ShoppingBag className="h-8 w-8 text-[#8B5A4A] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-[#8B5A4A] mb-2">Shop</h3>
              <p className="text-sm text-gray-600 mb-4">Browse our collection</p>
              <Link href="/shop">
                <Button variant="outline" size="sm" className="w-full">
                  Explore Shop
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <Heart className="h-8 w-8 text-[#8B5A4A] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-[#8B5A4A] mb-2">Wishlist</h3>
              <p className="text-sm text-gray-600 mb-4">View your favorites</p>
              <Link href="/wishlist">
                <Button variant="outline" size="sm" className="w-full">
                  My Wishlist
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <CardContent className="p-6 text-center">
              <Search className="h-8 w-8 text-[#8B5A4A] mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-[#8B5A4A] mb-2">Search</h3>
              <p className="text-sm text-gray-600 mb-4">Find what you need</p>
              <Link href="/shop">
                <Button variant="outline" size="sm" className="w-full">
                  Search Products
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Popular Categories */}
        <div className="mb-12">
          <h3 className="text-xl font-serif text-[#8B5A4A] mb-6">Popular Categories</h3>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/shop?category=dresses">
              <Badge variant="secondary" className="px-4 py-2 text-sm hover:bg-[#8B5A4A] hover:text-white transition-colors">
                Dresses
              </Badge>
            </Link>
            <Link href="/shop?category=tops">
              <Badge variant="secondary" className="px-4 py-2 text-sm hover:bg-[#8B5A4A] hover:text-white transition-colors">
                Tops
              </Badge>
            </Link>
            <Link href="/shop?category=bottoms">
              <Badge variant="secondary" className="px-4 py-2 text-sm hover:bg-[#8B5A4A] hover:text-white transition-colors">
                Bottoms
              </Badge>
            </Link>
            <Link href="/shop?category=accessories">
              <Badge variant="secondary" className="px-4 py-2 text-sm hover:bg-[#8B5A4A] hover:text-white transition-colors">
                Accessories
              </Badge>
            </Link>
            <Link href="/shop?category=new-arrivals">
              <Badge variant="secondary" className="px-4 py-2 text-sm hover:bg-[#8B5A4A] hover:text-white transition-colors">
                New Arrivals
              </Badge>
            </Link>
          </div>
        </div>

        {/* Main Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button size="lg" className="bg-[#8B5A4A] hover:bg-[#8B5A4A]/90 text-white px-8 py-3">
              <Home className="h-5 w-5 mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <Link href="/shop">
            <Button variant="outline" size="lg" className="border-[#8B5A4A] text-[#8B5A4A] hover:bg-[#8B5A4A] hover:text-white px-8 py-3">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Start Shopping
            </Button>
          </Link>
        </div>

        {/* Decorative Elements */}
        <div className="mt-16 flex justify-center space-x-8 opacity-30">
          <Sparkles className="h-6 w-6 text-[#8B5A4A]" />
          <Heart className="h-8 w-8 text-[#8B5A4A]" />
          <Sparkles className="h-6 w-6 text-[#8B5A4A]" />
        </div>

        {/* Help Text */}
        <div className="mt-12 p-6 bg-white/50 rounded-lg max-w-2xl mx-auto">
          <p className="text-sm text-gray-600 mb-4">
            <strong>Need help finding something?</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="text-[#8B5A4A] hover:underline text-sm">
              Contact Us
            </Link>
            <span className="hidden sm:inline text-gray-400">•</span>
            <Link href="/about" className="text-[#8B5A4A] hover:underline text-sm">
              About Studio Miradia
            </Link>
            <span className="hidden sm:inline text-gray-400">•</span>
            <Link href="/shipping" className="text-[#8B5A4A] hover:underline text-sm">
              Shipping Info
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
