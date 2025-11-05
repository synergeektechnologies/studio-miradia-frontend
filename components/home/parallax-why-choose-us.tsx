"use client"

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export function ParallaxWhyChooseUs() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="relative bg-[#F8F8F8] overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[400px] md:min-h-[500px]">
        {/* Left Side - Image */}
        <div className="hidden md:block relative h-full order-1">
          <Image
            src="/0L8A7623.webp"
            alt="Studio Miradia luxury fashion"
            fill
            className="object-cover"
            priority
            sizes="50vw"
          />
        </div>

        {/* Right Side - Content */}
        <div className="flex items-start md:items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 sm:py-12 md:py-16 lg:py-20 xl:py-28 order-2">
          <div className={`w-full max-w-[600px] mx-auto md:mx-0 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {/* Main Heading */}
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-5 sm:mb-6 md:mb-8 leading-tight">
              About Us
            </h2>

            {/* History Section */}
            <div className="mb-5 sm:mb-6 md:mb-8">
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-2 sm:mb-3 md:mb-4">
                History
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#666666] leading-relaxed" style={{ lineHeight: '1.7' }}>
                At Studio Miradia we specialize in creating exquisite designer sarees. All of our products are made with the highest-grade materials and crafted with impeccable attention to detail, celebrating the beauty, elegance, and grace of women.
              </p>
            </div>

            {/* Why Us Section */}
            <div>
              <h3 className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-[#1A1A1A] mb-2 sm:mb-3 md:mb-4">
                Why Us
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-[#666666] leading-relaxed" style={{ lineHeight: '1.7' }}>
                Our founders are visionaries with a deep passion for empowering women through fashion. We integrate traditional Indian motifs with contemporary design, creating pieces tailored to each woman's unique style and personality.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
