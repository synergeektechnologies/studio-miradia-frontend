import Image from 'next/image'
import React from 'react'
import { getProductDisplayImage } from '@/lib/utils'

interface ProductImageProps {
  product: {
    id: string
    name: string
    image?: string
    imageUrls?: string[]
    price: number
  }
}

const ProductImage = ({ product }: ProductImageProps) => {
  const displayImage = getProductDisplayImage(product, "")

  if (!displayImage) {
    return (
      <div className="relative aspect-[3/4] overflow-hidden bg-secondary flex items-center justify-center">
        <span className="text-muted-foreground">No image</span>
      </div>
    )
  }

  return (
    <div className="relative aspect-[3/4] overflow-hidden bg-secondary group">
      <Image
        src={displayImage}
        alt={product.name}
        fill
        className="object-cover group-hover:scale-105 transition-transform duration-500"
        priority
      />
    </div>
  )
}

export default ProductImage
