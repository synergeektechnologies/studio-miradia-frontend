import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Get the display image for a product, prioritizing the most recent image from imageUrls
 * @param product - Product object with image and imageUrls properties
 * @param fallback - Fallback image URL if no image is available
 * @returns The best image URL to display
 */
export function getProductDisplayImage(
  product: { image?: string; imageUrls?: string[] }, 
  fallback: string = "/placeholder.svg"
): string {
  if (product.imageUrls && product.imageUrls.length > 0) {
    // Return the last uploaded image (most recent)
    return product.imageUrls[product.imageUrls.length - 1]
  }
  return product.image || fallback
}
