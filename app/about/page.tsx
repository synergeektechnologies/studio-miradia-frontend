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
            At Studio Miradia we specialize in creating exquisite designer sarees.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            All of our products are made with the highest-grade materials and crafted with impeccable attention to detail. Our pieces are conceived to celebrate the beauty, elegance, and grace of women, while also providing a unique and personalized touch to each garment.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our brand is more than just a brand. It is a celebration of women's empowerment and the creativity that comes from the passion for fashion. We believe that every woman deserves to feel confident, gorgeous, and empowered, and that is why we create pieces that are tailored to the individual style and personality of our clients.
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
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">Vision and the Owners</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                Our founders are a visionary with a deep passion for empowering women through fashion. They have spent years honing their craft and developing a distinctive style that integrates traditional Indian motifs with contemporary design elements.
              </p>
              <p>
                At Studio Miradia we are committed to creating a supportive and inclusive environment for women. We believe that fashion helps enhance the inner beauty of a woman. That is why we strive to create pieces that celebrate women's bodies and showcase their unique beauty and grace.
              </p>
              <p>
                We offer a range of styles to suit every taste and occasion. Our focus is on creating timeless pieces that can be worn for any occasion, whether it's a formal event or a casual gathering with friends. At Studio Miradia we believe that fashion is not just about looking good, but also about feeling good.
              </p>
              <p>
                At Studio Miradia we also offer a personalized shopping experience. Our team of experts will work with you to understand your unique style and preferences, and help you find the perfect piece to suit your needs. We believe that every woman deserves to feel special and unique, and we strive to create a shopping experience that reflects that.
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
        <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6 text-center">Mission</h2>
        <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
          <p>
            Our mission at Studio Miradia is to create unique, elegant, and high-quality clothing.
          </p>
          <p>
            We are committed to creating products that are not just beautiful, but also comfortable, durable, and socially responsible.
          </p>
          <p>
            To achieve our mission, we work closely with our team of skilled artisans and designers to create products that are both traditional and modern, reflecting the diverse cultural influences of India.
          </p>
          <p className="text-center pt-4">
            In conclusion, Studio Miradia is a women-empowered brand that is committed to empowering women through fashion. Thank you for considering Studio Miradia for your fashion needs.
          </p>
        </div>
      </section>

      <ScrollToTop />
    </main>
  )
}
