import Image from "next/image"

export function OurJourneySection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <div className="order-2 md:order-1">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-balance">Our Journey</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Inspired by the transformative beauty of butterflies, Studio MiraDia brings you handpicked pieces that weave
            elegance into every thread.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Stay tuned for our exclusive collections that celebrate craftsmanship, heritage, and the art of slow
            fashion.
          </p>
        </div>

        {/* Image */}
        <div className="order-1 md:order-2 relative h-[400px] rounded-lg overflow-hidden shadow-xl">
          <Image src="/artisan-crafting-luxury-fabric-with-butterfly-moti.jpg" alt="Artisan crafting luxury pieces" fill className="object-cover" />
        </div>
      </div>
    </section>
  )
}
