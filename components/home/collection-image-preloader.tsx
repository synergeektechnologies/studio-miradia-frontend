"use client"

import { useEffect } from "react"

export function CollectionImagePreloader() {
  useEffect(() => {
    // Preload the first two critical collection images
    const criticalImages = [
      "/0L8A7602.webp", // Organza Tissue Silk
      "/0L8A7546.webp", // Banarasi Katan Silk
    ]

    criticalImages.forEach((src) => {
      const link = document.createElement("link")
      link.rel = "preload"
      link.as = "image"
      link.href = src
      link.fetchPriority = "high"
      document.head.appendChild(link)
    })

    return () => {
      // Cleanup on unmount
      criticalImages.forEach((src) => {
        const links = document.querySelectorAll(`link[href="${src}"]`)
        links.forEach((link) => link.remove())
      })
    }
  }, [])

  return null
}

