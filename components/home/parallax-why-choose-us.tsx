"use client"

import { Heart, Sparkles, Package } from "lucide-react"
import { useEffect, useRef } from "react"

export function ParallaxWhyChooseUs() {
  const parallaxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset
        const elementTop = parallaxRef.current.offsetTop
        const elementHeight = parallaxRef.current.offsetHeight
        const windowHeight = window.innerHeight
        
        // Calculate if element is in viewport
        const isInView = scrolled + windowHeight > elementTop && scrolled < elementTop + elementHeight
        
        if (isInView) {
          // Different parallax rates for mobile vs desktop
          const isMobile = window.innerWidth < 768
          const rate = isMobile ? scrolled * -0.3 : scrolled * -0.5
          parallaxRef.current.style.transform = `translateY(${rate}px)`
        }
      }
    }

    // Check user preferences
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    // Add parallax effect with throttling for better performance
    if (!prefersReducedMotion) {
      let ticking = false
      const throttledScroll = () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            handleScroll()
            ticking = false
          })
          ticking = true
        }
      }
      
      window.addEventListener('scroll', throttledScroll, { passive: true })
      return () => window.removeEventListener('scroll', throttledScroll)
    }
  }, [])

  const features = [
    {
      icon: Package,
      title: "Artisanal Craftsmanship",
      description: "Each piece is handcrafted with love and attention to detail, ensuring exceptional quality.",
    },
    {
      icon: Sparkles,
      title: "Limited Elegance",
      description: "Exclusive drops for a unique and personal experience that sets you apart.",
    },
    {
      icon: Heart,
      title: "Curated with Love",
      description: "Handpicked pieces that reflect our commitment to timeless style and sophistication.",
    },
  ]

  return (
    <section className="relative overflow-hidden">
      {/* Parallax Background Image */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          backgroundImage: "url('/Untitled-19.png')",
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          willChange: "transform",
          transform: "translateZ(0)", // Force hardware acceleration
          backfaceVisibility: "hidden", // Prevent flickering
        }}
      />
      <div className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center">
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-4xl md:text-6xl font-bold mb-6 text-white text-balance">
              Why Choose Studio Miradia
            </h2>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Experience the difference of true luxury and craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="text-center group bg-white/95 backdrop-blur-sm p-8 rounded-lg hover:bg-white transition-all duration-300 hover:scale-105"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5E8E0] text-[#8B5A4A] mb-6 group-hover:bg-[#006D77] group-hover:text-white transition-colors">
                  <feature.icon className="h-8 w-8" />
                </div>
                <h3 className="font-serif text-2xl font-semibold mb-3 text-[#8B5A4A]">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
