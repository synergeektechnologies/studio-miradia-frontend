import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "../contexts/cart-context"
import { AuthProvider } from "../contexts/auth-context"
import { AdminProvider } from "../contexts/admin-context"
import { Toaster } from "../components/ui/toaster"
import { Suspense } from "react"
import { ConditionalLayout } from "../components/conditional-layout"

export const metadata: Metadata = {
  title: "Studio Miradia - Elegance in Every Thread",
  description: "Luxury fashion brand featuring handcrafted butterfly-inspired pieces",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <ConditionalLayout>{children}</ConditionalLayout>
                <Toaster />
                <Analytics />
              </Suspense>
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
