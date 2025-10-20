import { HeroSection } from "@/components/home/hero-section"
import { FoundersSection } from "@/components/home/founders-section"
import { ProductGrid } from "@/components/home/product-grid"
import { NewArrivalsCarousel } from "@/components/home/new-arrivals-carousel"
import { ParallaxWhyChooseUs } from "@/components/home/parallax-why-choose-us"
import { CollectionsGrid } from "@/components/home/collections-grid"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function HomePage() {
  return (
    <main>
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
