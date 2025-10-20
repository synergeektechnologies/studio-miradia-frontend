"use client"

import Image from "next/image"
import Link from "next/link"

const collections = [
  {
    name: "LILA",
    image: "/0L8A7634.jpg",
    href: "/shop?category=LILA",
  },
  {
    name: "AURA",
    image: "/0L8A7638.jpg",
    href: "/shop?category=AURA",
  },
  {
    name: "SARA",
    image: "/0L8A7626.jpg",
    href: "/shop?category=SARA",
  },
  {
    name: "TESSA",
    image: "/0L8A7623.jpg",
    href: "/shop?category=TESSA",
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
              className="object-cover transition-transform duration-700 group-hover:scale-110"
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
