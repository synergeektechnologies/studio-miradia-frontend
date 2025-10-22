"use client"

import { useIsIOS } from "../../hooks/use-ios"

export function FoundersSection() {
  const isIOS = useIsIOS()

  return (
    <section className="relative">
      {/* Parallax Background Image */}
      <div
        className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center"
        style={{
          backgroundImage: "url('/Untitled-9.jpg')",
          backgroundAttachment: isIOS ? "scroll" : "fixed",
          backgroundPosition: isIOS ? "center top" : "top",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // Add will-change for better performance on iOS
          willChange: isIOS ? "auto" : "transform",
        }}
      />
    </section>
  )
}
