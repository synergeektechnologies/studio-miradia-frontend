"use client"

import { useEffect, useRef } from "react"

export function FoundersSection() {
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

  return (
    <section className="relative w-full overflow-hidden">
      <div
        ref={parallaxRef}
        className="absolute inset-0 w-full h-[120%] -top-[10%]"
        style={{
          backgroundImage: "url('/Untitled-9.jpg')",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          willChange: "transform",
          transform: "translateZ(0)", // Force hardware acceleration
          backfaceVisibility: "hidden", // Prevent flickering
        }}
      />
      <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh]" />
    </section>
  )
}
