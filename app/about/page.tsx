import Image from "next/image"
import { Palette, Leaf, Heart, Sparkles } from "lucide-react"
import { ScrollToTop } from "../../components/scroll-to-top"
import type { Metadata } from "next"
import { StructuredData } from "../../components/structured-data"
import { faqSchema } from "../../lib/structured-data"

export const metadata: Metadata = {
  title: "About Studio Miradia - Our Story & Craftsmanship",
  description: "Learn about Studio Miradia's journey of creating handcrafted luxury fashion. Discover our values, sustainable practices, and the artisans behind our butterfly-inspired designs.",
  keywords: "about Studio Miradia, luxury fashion brand, handcrafted clothing, sustainable fashion, artisanal craftsmanship, butterfly philosophy, fashion brand story",
  openGraph: {
    title: "About Studio Miradia - Our Story & Craftsmanship",
    description: "Learn about Studio Miradia's journey of creating handcrafted luxury fashion. Discover our values, sustainable practices, and the artisans behind our butterfly-inspired designs.",
    type: "website",
  },
}

export default function AboutPage() {
  const faqs = [
    {
      question: "What makes Studio Miradia unique?",
      answer: "Studio Miradia combines traditional Indian craftsmanship with modern design, creating butterfly-inspired luxury fashion pieces that are sustainable and timeless."
    },
    {
      question: "Are your products sustainable?",
      answer: "Yes, we use only natural fabrics and sustainable production methods, ensuring each piece is eco-friendly and ethically made."
    },
    {
      question: "How are your products made?",
      answer: "Each piece is handcrafted by skilled artisans using traditional techniques, ensuring exceptional quality and unique character in every garment."
    }
  ]

  return (
    <main className="min-h-screen bg-background">
      <StructuredData data={faqSchema(faqs)} />
      {/* Hero Section */}
      <section className="relative h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/Untitled-12.jpg"
            alt="Studio MiraDia artisans at work"
            width={1920}
            height={800}
            className="object-top"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-white mb-4">About Studio MiraDia</h1>
          <p className="text-xl text-white/90 font-light">Where craftsmanship meets elegance</p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="mb-8">
          <Image src="/logo.png" alt="Studio MiraDia Logo" width={100} height={100} className="mx-auto" />
        </div>
        <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-6">
          At Studio MiraDia, we craft timeless wardrobe pieces from natural fabrics, featuring versatile silhouettes and
          intricate butterfly-inspired details.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          A conscious fashion brand rooted in Indian artistry, we weave heritage techniques with modern elegance to
          create pieces that flow effortlessly through every season of life.
        </p>
      </section>

      {/* How We Work */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-center mb-16">How We Work</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Design Process */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F5E8E0] text-[#8B5A4A] mb-6 group-hover:bg-[#006D77] group-hover:text-white transition-all duration-300">
                <Palette className="h-10 w-10" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4">Design Process</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our skilled artisans and designers transform raw fabric into exquisite butterfly-inspired pieces with
                utmost care and attention to detail.
              </p>
            </div>

            {/* Sustainable Production */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F5E8E0] text-[#8B5A4A] mb-6 group-hover:bg-[#006D77] group-hover:text-white transition-all duration-300">
                <Leaf className="h-10 w-10" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4">Sustainable Production</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our timeless collection is made from sustainable, natural fabrics. Each piece is ready-to-wear and
                crafted with love for the planet.
              </p>
            </div>

            {/* Community Connection */}
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#F5E8E0] text-[#8B5A4A] mb-6 group-hover:bg-[#006D77] group-hover:text-white transition-all duration-300">
                <Heart className="h-10 w-10" />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4">Community Connection</h3>
              <p className="text-muted-foreground leading-relaxed">
                We showcase the talents of local artisans, growing our brand with every handpicked piece and supporting
                traditional craftsmanship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
            <Image
              src="/0L8A7556.jpg"
              alt="Studio MiraDia craftsmanship"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4A017] text-white mb-6">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">We Deliver Genuine Elegance</h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Discover the beauty of handmade products with exquisite designs, created just for you. Each piece tells a
              story of transformation, inspired by the delicate beauty of butterflies.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From the first sketch to the final stitch, we pour our hearts into every creation, ensuring that when you
              wear Studio MiraDia, you're wearing a piece of art that celebrates your unique journey.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="bg-[#F5E8E0] py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-serif text-xl font-semibold mb-3 text-[#8B5A4A]">Authenticity</h3>
              <p className="text-muted-foreground">
                Every piece is genuinely handcrafted, preserving traditional techniques while embracing modern design.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-serif text-xl font-semibold mb-3 text-[#8B5A4A]">Quality</h3>
              <p className="text-muted-foreground">
                We use only the finest natural fabrics and materials, ensuring each piece stands the test of time.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-serif text-xl font-semibold mb-3 text-[#8B5A4A]">Sustainability</h3>
              <p className="text-muted-foreground">
                Our commitment to the environment guides every decision, from fabric selection to production methods.
              </p>
            </div>
            <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-serif text-xl font-semibold mb-3 text-[#8B5A4A]">Empowerment</h3>
              <p className="text-muted-foreground">
                We support local artisans and communities, creating opportunities and celebrating their incredible
                talents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Butterfly Transformation Story */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
        <div className="mb-8">
          <Image src="/logo.png" alt="Studio MiraDia Logo" width={100} height={100} className="mx-auto" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">The Butterfly Philosophy</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          Just as a butterfly undergoes a beautiful transformation, we believe fashion should celebrate your personal
          journey and evolution. Each piece in our collection is designed to make you feel confident, elegant, and
          authentically yourself.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Like butterfly wings that catch the light in different ways, our designs reveal new beauty with every
          movement, every season, and every chapter of your life.
        </p>
      </section>

      <ScrollToTop />
    </main>
  )
}
