"use client"

import Image from "next/image"
import Link from "next/link"

const collections = [
  {
    name: "Organza Tissue Silk",
    image: "/0L8A7602.webp",
    href: "/shop?category=Organza%20Tissue%20Silk%20Sarees",
  },
  {
    name: "Banarasi Katan Silk",
    image: "/0L8A7546.webp",
    href: "/shop?category=Banarasi%20Katan%20Silk%20Saree",
  },
  {
    name: "Kota Silk",
    image: "/0L8A7584.webp",
    href: "/shop?category=Kota%20Silk%20Saree",
  },
  {
    name: "Muslin Silk",
    image: "/0L8A7495.webp",
    href: "/shop?category=Muslin%20Silk%20Sarees",
  },
]

export function CollectionsGrid() {
  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2">
        {collections.map((collection, index) => (
          <Link key={index} href={collection.href} className="group relative aspect-square overflow-hidden">
            <Image
              src={collection.image || "/placeholder.svg"}
              alt={collection.name}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index < 2}
              quality={85}
              fetchPriority={index < 2 ? "high" : "auto"}
              className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
              loading={index < 2 ? "eager" : "lazy"}
              unoptimized={false}
            />
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Collection name overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h3 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white text-center px-6 transition-transform duration-500 group-hover:scale-105">
                {collection.name}
              </h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
