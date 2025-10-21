export function FoundersSection() {
  return (
    <section className="relative w-full">
      <div
        className="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[90vh]"
        style={{
          backgroundImage: "url('/Untitled-9.jpg')",
          backgroundAttachment: "scroll", // Changed from "fixed" to "scroll" for mobile compatibility
          backgroundPosition: "center top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    </section>
  )
}
