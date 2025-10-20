import Link from "next/link"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background Image with birds/butterflies */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/Untitled-13.jpg"
          alt="Studio MiraDia luxury fashion"
          fill
          className="object-cover"
          priority
        />
        {/* <div className="absolute inset-0 bg-gradient-to-b from-[#8B5A4A]/80 via-[#8B5A4A]/70 to-[#8B5A4A]/60" /> */}
      </div>

      <div className="relative z-10 px-6 md:px-12 lg:px-20 max-w-3xl">
        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-normal text-white mb-6 leading-tight">
          Loved by Us,
          <br />
          Handpicked for You.
        </h1>
        <p className="text-base md:text-lg text-white/90 mb-3 font-light leading-relaxed max-w-xl">
          Thoughtfully chosen, just the way we do for ourselves –<br />
          Sindhu, Ahaana, Ishaani & Hansika.
        </p>
        <p className="text-sm md:text-base text-white/80 mb-8 font-light leading-relaxed max-w-xl">
          We are fully sold out on our first collection drop. Our next drop will be coming soon. KEEP A WATCH.
        </p>
        <Link href="/shop">
          <Button
            size="lg"
            className="bg-white hover:bg-white/90 text-[#8B5A4A] px-8 py-6 text-sm font-medium tracking-wider uppercase rounded-none transition-all"
          >
            Shop Now
          </Button>
        </Link>
      </div>
    </section>
  )
}
