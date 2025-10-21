export function FoundersSection() {
  return (
    <section className="relative">
      {/* Parallax Background Image */}
      <div
        className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/Untitled-9.jpg')",
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      />
    </section>
  )
}
