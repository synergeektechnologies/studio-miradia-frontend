import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { CartProvider } from "../contexts/cart-context"
import { AuthProvider } from "../contexts/auth-context"
import { AdminProvider } from "../contexts/admin-context"
import { MobileToast } from "../components/mobile-toast"
import { Suspense } from "react"
import { ConditionalLayout } from "../components/conditional-layout"
import { DefaultStructuredData } from "../components/structured-data"

export const metadata: Metadata = {
  title: {
    default: "Studio Miradia - Elegance in Every Thread",
    template: "%s | Studio Miradia"
  },
  description: "Luxury fashion brand featuring handcrafted butterfly-inspired pieces. Discover sustainable, elegant, and timeless designs from Studio Miradia. Shop our exclusive collection of artisanal clothing.",
  keywords: [
    "luxury fashion",
    "handcrafted clothing", 
    "butterfly inspired fashion",
    "sustainable fashion",
    "artisanal clothing",
    "Studio Miradia",
    "elegant wear",
    "timeless fashion",
    "luxury boutique",
    "fashion brand",
    "premium clothing",
    "designer fashion"
  ],
  authors: [{ name: "Studio Miradia" }],
  creator: "Studio Miradia",
  publisher: "Studio Miradia",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://studiomiradia.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://studiomiradia.com',
    siteName: 'Studio Miradia',
    title: 'Studio Miradia - Elegance in Every Thread',
    description: 'Luxury fashion brand featuring handcrafted butterfly-inspired pieces. Discover sustainable, elegant, and timeless designs from Studio Miradia.',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Studio Miradia - Luxury Fashion Brand',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@studiomiradia',
    creator: '@studiomiradia',
    title: 'Studio Miradia - Elegance in Every Thread',
    description: 'Luxury fashion brand featuring handcrafted butterfly-inspired pieces. Discover sustainable, elegant, and timeless designs.',
    images: ['/logo.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
    yahoo: 'your-yahoo-verification-code',
  },
  category: 'fashion',
  classification: 'Luxury Fashion Brand',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' }
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/manifest.json',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'Studio Miradia',
    'application-name': 'Studio Miradia',
    'msapplication-TileColor': '#8B5A4A',
    'msapplication-config': '/browserconfig.xml',
    'theme-color': '#8B5A4A',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags for better SEO and social sharing */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="theme-color" content="#8B5A4A" />
        <meta name="msapplication-TileColor" content="#8B5A4A" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Studio Miradia" />
        <meta name="application-name" content="Studio Miradia" />
        
        {/* Structured Data for SEO */}
        <DefaultStructuredData />
      </head>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <AuthProvider>
          <AdminProvider>
            <CartProvider>
              <Suspense fallback={<div>Loading...</div>}>
                <ConditionalLayout>{children}</ConditionalLayout>
                <MobileToast />
                <Analytics />
              </Suspense>
            </CartProvider>
          </AdminProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
