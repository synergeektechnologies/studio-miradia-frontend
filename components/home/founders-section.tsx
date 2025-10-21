export function FoundersSection() {
  return (
    <section className="relative w-full">
      <div
        className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh]"
        style={{
          backgroundImage: "url('/Untitled-9.jpg')",
          backgroundAttachment: "scroll", // Mobile: scroll normally
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        // Desktop: fixed background (parallax effect)
        data-mobile-scroll="true"
      />
      <style jsx>{`
        @media (min-width: 768px) {
          div[data-mobile-scroll="true"] {
            background-attachment: fixed !important;
          }
        }
      `}</style>
    </section>
  )
}
