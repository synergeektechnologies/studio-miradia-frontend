import Link from "next/link"
import { Instagram, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border" style={{ backgroundColor: '#d8a7a7' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.png" alt="Studio Miradia Logo" className="w-8 h-8"/>
              <img src="/logo_text_white.png" alt="Studio Miradia" className="hidden md:block w-auto h-8"/>
            </div>
            <p className="text-sm text-white font-medium mb-4">Elegance in Every Thread</p>
            <p className="text-sm text-white font-medium">
              Handcrafted luxury fashion inspired by the transformative beauty of butterflies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-medium mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-white font-medium hover:text-gray-200 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-sm text-white font-medium hover:text-gray-200 transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white font-medium hover:text-gray-200 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-medium mb-4 text-white">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shipping"
                  className="text-sm text-white font-medium hover:text-gray-200 transition-colors"
                >
                  Shipping
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-sm text-white font-medium hover:text-gray-200 transition-colors">
                  Returns & Refunds
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white font-medium hover:text-gray-200 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-medium mb-4 text-white">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm text-white font-medium hover:text-gray-200 transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-white font-medium hover:text-gray-200 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media & Copyright */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white font-medium">© 2025 Studio Miradia. All rights reserved.</p>
          <div className="flex gap-4">
            <Link
              href="https://www.instagram.com/studiomiradia/"
              className="text-white hover:text-gray-200 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
