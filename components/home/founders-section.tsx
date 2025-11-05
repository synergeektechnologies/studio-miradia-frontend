export function FoundersSection() {
  return (
    <section className="relative">
      {/* Parallax Background Image - Fixed on desktop, scroll on mobile */}
      <div
        className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center bg-top bg-no-repeat bg-cover parallax-bg"
        style={{
          backgroundImage: "url('/Untitled-9.webp')",
        }}
      />
    </section>
  )
}
