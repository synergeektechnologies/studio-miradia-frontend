"use client"

import Link from "next/link"
import { useState, useRef, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Menu, Search, ShoppingCart, Heart, User } from "lucide-react"
import { Button } from "./ui/button"
import { useCart } from "../contexts/cart-context"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { useAuth } from "../contexts/auth-context"
import { SearchDialog } from "./search-dialog"
import { ShopMegaMenu } from "./shop-mega-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { cartCount, wishlistCount } = useCart()
  const pathname = usePathname()
  const isHomePage = pathname === "/"
  const { user, logout } = useAuth()
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const textColor = isHomePage ? "text-white" : "text-foreground"
  const hoverColor = isHomePage ? "hover:text-white/80" : "hover:text-primary"
  const logo_white = pathname==='/'||pathname==='/about' ? '/logo_text_white.png' : '/logo_text.png';

  const handleShopDropdownEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current)
      dropdownTimeoutRef.current = null
    }
    setShopDropdownOpen(true)
  }

  const handleShopDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setShopDropdownOpen(false)
    }, 150) // 150ms delay before closing
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current)
      }
    }
  }, [])

  return (
    <>
      <nav className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="flex items-center justify-between py-6">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group transition-transform hover:scale-105">
              <img src="/logo.png" alt="Studio Miradia Logo" className="w-8 h-8"/>
              <img src={logo_white} alt="Studio Miradia" className="hidden md:block w-auto h-8"/>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">

              <div
                className="relative"
                onMouseEnter={handleShopDropdownEnter}
                onMouseLeave={handleShopDropdownLeave}
              >
                <button
                  className={`text-sm font-medium ${textColor} ${hoverColor} transition-all duration-300 hover:scale-110 relative group`}
                >
                  Shop
                  <span className="absolute bottom-0 left-1/2 w-0 h-px bg-current transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
                </button>
                {shopDropdownOpen && (
                  <ShopMegaMenu 
                    isHomePage={isHomePage} 
                    onMouseEnter={handleShopDropdownEnter}
                    onMouseLeave={handleShopDropdownLeave}
                  />
                )}
              </div>

              <Link
                href="/about"
                className={`text-sm font-medium ${textColor} ${hoverColor} transition-all duration-300 hover:scale-110 relative group`}
              >
                Our World
                <span className="absolute bottom-0 left-1/2 w-0 h-px bg-current transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
              </Link>
              <Link
                href="/contact"
                className={`text-sm font-medium ${textColor} ${hoverColor} transition-all duration-300 hover:scale-110 relative group`}
              >
                Contact
                <span className="absolute bottom-0 left-1/2 w-0 h-px bg-current transition-all duration-300 group-hover:w-full group-hover:-translate-x-1/2"></span>
              </Link>
            </div>

            {/* Right side icons */}
            <div className="flex items-center gap-3 md:gap-4">
              <Button
                size="icon"
                className={`hidden md:flex ${textColor} ${hoverColor} transition-all duration-300 hover:scale-110 bg-transparent hover:bg-transparent`}
                onClick={() => setSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* User account dropdown menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="icon"
                    className={`${textColor} ${hoverColor} transition-all duration-300 hover:scale-110 bg-transparent hover:bg-transparent`}
                  >
                    <User className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {user ? (
                    <>
                      <div className="px-2 py-1.5">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/account">My Account</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/wishlist">Wishlist</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/cart">Cart</Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-destructive">
                        Sign Out
                      </DropdownMenuItem>
                    </>
                  ) : (
                    <>
                      <DropdownMenuItem asChild>
                        <Link href="/login">Sign In</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/register">Create Account</Link>
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/wishlist">
                <Button
                  size="icon"
                  className={`relative ${textColor} ${hoverColor} transition-all duration-300 hover:scale-110 bg-transparent hover:bg-transparent`}
                >
                  <Heart className="h-5 w-5" />
                  {wishlistCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount}
                    </span>
                  )}
                </Button>
              </Link>

              <Link href="/cart">
                <Button
                  size="icon"
                  className={`relative ${textColor} ${hoverColor} transition-all duration-300 hover:scale-110 bg-transparent hover:bg-transparent`}
                >
                  <ShoppingCart className="h-5 w-5" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {cartCount}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Mobile menu button */}
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild className="md:hidden">
                  <Button
                    size="icon"
                    className={`${textColor} ${hoverColor} transition-all duration-300 hover:scale-110 min-w-[44px] min-h-[44px] bg-transparent hover:bg-transparent`}
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                  <SheetHeader className="pb-6">
                    <SheetTitle className="font-serif text-2xl">Menu</SheetTitle>
                  </SheetHeader>
                  <div className="flex flex-col gap-6 mt-8">
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setSearchOpen(true)
                      }}
                      className="text-lg font-medium hover:text-primary transition-all duration-300 text-left flex items-center gap-3 hover:scale-105"
                    >
                      <Search className="h-5 w-5" />
                      Search
                    </button>
                    <Link
                      href="/shop"
                      className="text-lg font-medium hover:text-primary transition-all duration-300 hover:scale-105"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      All Products
                    </Link>
                    <Link
                      href="/shop?filter=limited"
                      className="text-lg font-medium hover:text-primary transition-all duration-300 hover:scale-105"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Limited Editions
                    </Link>
                    <Link
                      href="/about"
                      className="text-lg font-medium hover:text-primary transition-all duration-300 hover:scale-105"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Our World
                    </Link>
                    <Link
                      href="/contact"
                      className="text-lg font-medium hover:text-primary transition-all duration-300 hover:scale-105"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Contact
                    </Link>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </nav>

      {/* SearchDialog component */}
      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
    </>
  )
}
