import { HeroSection } from "../components/home/hero-section"
import { FoundersSection } from "../components/home/founders-section"
import { ProductGrid } from "../components/home/product-grid"
import { NewArrivalsCarousel } from "../components/home/new-arrivals-carousel"
import { ParallaxWhyChooseUs } from "../components/home/parallax-why-choose-us"
import { CollectionsGrid } from "../components/home/collections-grid"
import { ScrollToTop } from "../components/scroll-to-top"
import type { Metadata } from "next"
import { StructuredData } from "../components/structured-data"
import { collectionPageSchema } from "../lib/structured-data"

export const metadata: Metadata = {
  title: "Studio Miradia - Luxury Fashion & Butterfly-Inspired Elegance",
  description: "Discover handcrafted luxury fashion pieces inspired by butterflies. Sustainable, elegant, and timeless designs from Studio Miradia. Shop our exclusive collection of artisanal clothing.",
  keywords: "luxury fashion, handcrafted clothing, butterfly inspired, sustainable fashion, artisanal, Studio Miradia, elegant wear, timeless fashion",
  openGraph: {
    title: "Studio Miradia - Luxury Fashion & Butterfly-Inspired Elegance",
    description: "Discover handcrafted luxury fashion pieces inspired by butterflies. Sustainable, elegant, and timeless designs from Studio Miradia.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Studio Miradia - Luxury Fashion & Butterfly-Inspired Elegance",
    description: "Discover handcrafted luxury fashion pieces inspired by butterflies. Sustainable, elegant, and timeless designs.",
  },
}

export default function HomePage() {
  return (
    <main>
      <StructuredData data={collectionPageSchema("Featured", "Discover our featured luxury fashion collection")} />
      <HeroSection />
      <FoundersSection />
      <ProductGrid />
      <NewArrivalsCarousel />
      <ParallaxWhyChooseUs />
      <CollectionsGrid />
      <ScrollToTop />
    </main>
  )
}
