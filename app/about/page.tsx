import Image from "next/image"
import { Sparkles } from "lucide-react"
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
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-8 text-center">
          <Image src="/logo.png" alt="Studio MiraDia Logo" width={100} height={100} className="mx-auto" />
        </div>
        <div className="space-y-6 text-center">
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
            AT STUDIOMIRADIA WE SPECIALIZE IN CREATING EXQUISITE DESIGNER SAREES.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            ALL OF OUR PRODUCTS ARE MADE WITH THE HIGHEST-GRADE MATERIALS AND CRAFTED WITH IMPECCABLE ATTENTION TO DETAIL. OUR PIECES ARE CONCEIVED TO CELEBRATE THE BEAUTY, ELEGANCE, AND GRACE OF WOMEN, WHILE ALSO PROVIDING A UNIQUE AND PERSONALIZED TOUCH TO EACH GARMENT.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            OUR BRAND IS MORE THAN JUST A BRAND. IT IS A CELEBRATION OF WOMEN'S EMPOWERMENT AND THE CREATIVITY THAT COMES FROM THE PASSION FOR FASHION. WE BELIEVE THAT EVERY WOMAN DESERVES TO FEEL CONFIDENT, GORGEOUS, AND EMPOWERED, AND THAT IS WHY WE CREATE PIECES THAT ARE TAILORED TO THE INDIVIDUAL STYLE AND PERSONALITY OF OUR CLIENTS.
          </p>
        </div>
      </section>

      {/* Vision and the Owners */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="relative h-[500px] rounded-lg overflow-hidden shadow-xl order-2 md:order-1">
            <Image
              src="/0L8A7556.jpg"
              alt="Studio MiraDia founders"
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Text */}
          <div className="order-1 md:order-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#D4A017] text-white mb-6">
              <Sparkles className="h-8 w-8" />
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">VISION AND THE OWNERS</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                OUR FOUNDERS ARE A VISIONARY WITH A DEEP PASSION FOR EMPOWERING WOMEN THROUGH FASHION. THEY HAVE SPENT YEARS HONING THEIR CRAFT AND DEVELOPING A DISTINCTIVE STYLE THAT INTEGRATES TRADITIONAL INDIAN MOTIFS WITH CONTEMPORARY DESIGN ELEMENTS.
              </p>
              <p>
                AT STUDIOMIRADIA WE ARE COMMITTED TO CREATING A SUPPORTIVE AND INCLUSIVE ENVIRONMENT FOR WOMEN. WE BELIEVE THAT FASHION HELPS ENHANCE THE INNER BEAUTY OF A WOMAN. THAT IS WHY WE STRIVE TO CREATE PIECES THAT CELEBRATE WOMEN'S BODIES AND SHOWCASE THEIR UNIQUE BEAUTY AND GRACE.
              </p>
              <p>
                WE OFFER A RANGE OF STYLES TO SUIT EVERY TASTE AND OCCASION. OUR FOCUS IS ON CREATING TIMELESS PIECES THAT CAN BE WORN FOR ANY OCCASION, WHETHER IT'S A FORMAL EVENT OR A CASUAL GATHERING WITH FRIENDS. AT STUDIOMIRADIA WE BELIEVE THAT FASHION IS NOT JUST ABOUT LOOKING GOOD, BUT ALSO ABOUT FEELING GOOD.
              </p>
              <p>
                AT STUDIOMIRADIA WE ALSO OFFER A PERSONALIZED SHOPPING EXPERIENCE. OUR TEAM OF EXPERTS WILL WORK WITH YOU TO UNDERSTAND YOUR UNIQUE STYLE AND PREFERENCES, AND HELP YOU FIND THE PERFECT PIECE TO SUIT YOUR NEEDS. WE BELIEVE THAT EVERY WOMAN DESERVES TO FEEL SPECIAL AND UNIQUE, AND WE STRIVE TO CREATE A SHOPPING EXPERIENCE THAT REFLECTS THAT.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="mb-8 text-center">
          <Image src="/logo.png" alt="Studio MiraDia Logo" width={100} height={100} className="mx-auto" />
        </div>
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-center">MISSION</h2>
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            OUR MISSION AT STUDIOMIRADIA IS TO CREATE UNIQUE, ELEGANT, AND HIGH-QUALITY CLOTHING.
          </p>
          <p>
            WE ARE COMMITTED TO CREATING PRODUCTS THAT ARE NOT JUST BEAUTIFUL, BUT ALSO COMFORTABLE, DURABLE, AND SOCIALLY RESPONSIBLE.
          </p>
          <p>
            TO ACHIEVE OUR MISSION, WE WORK CLOSELY WITH OUR TEAM OF SKILLED ARTISANS AND DESIGNERS TO CREATE PRODUCTS THAT ARE BOTH TRADITIONAL AND MODERN, REFLECTING THE DIVERSE CULTURAL INFLUENCES OF INDIA.
          </p>
          <p className="text-center pt-4">
            IN CONCLUSION, STUDIOMIRADIA IS A WOMEN-EMPOWERED BRAND THAT IS COMMITTED TO EMPOWERING WOMEN THROUGH FASHION. THANK YOU FOR CONSIDERING STUDIOMIRADIA FOR YOUR FASHION NEEDS.
          </p>
        </div>
      </section>

      <ScrollToTop />
    </main>
  )
}
