// Structured data utilities for SEO and rich snippets

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Studio Miradia",
  "description": "Luxury fashion brand featuring handcrafted butterfly-inspired pieces",
  "url": "https://studiomiradia.com",
  "logo": "https://studiomiradia.com/logo.png",
  "foundingDate": "2024",
  "founders": [
    {
      "@type": "Person",
      "name": "Studio Miradia Founders"
    }
  ],
  "sameAs": [
    "https://www.instagram.com/studiomiradia",
    "https://www.facebook.com/studiomiradia",
    "https://twitter.com/studiomiradia",
    "https://www.pinterest.com/studiomiradia"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-98765-43210",
    "contactType": "customer service",
    "availableLanguage": ["English", "Hindi"],
    "areaServed": "IN",
    "hoursAvailable": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      "opens": "10:00",
      "closes": "18:00"
    }
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Fashion Street",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400001",
    "addressCountry": "IN"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "knowsAbout": [
    "Luxury Fashion",
    "Handcrafted Clothing",
    "Sustainable Fashion",
    "Butterfly-Inspired Design",
    "Artisanal Craftsmanship"
  ]
}

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Studio Miradia",
  "url": "https://studiomiradia.com",
  "description": "Luxury fashion brand featuring handcrafted butterfly-inspired pieces",
  "publisher": {
    "@type": "Organization",
    "name": "Studio Miradia",
    "url": "https://studiomiradia.com"
  },
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://studiomiradia.com/shop?q={search_term_string}",
    "query-input": "required name=search_term_string"
  },
  "mainEntity": {
    "@type": "Organization",
    "name": "Studio Miradia"
  }
}

export const breadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://studiomiradia.com${item.url}`
  }))
})

export const productSchema = (product: any) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": product.name,
  "description": product.description,
  "image": product.imageUrls || [product.image],
  "brand": {
    "@type": "Brand",
    "name": "Studio Miradia"
  },
  "category": product.category,
  "offers": {
    "@type": "Offer",
    "price": product.price,
    "priceCurrency": "INR",
    "availability": product.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    "seller": {
      "@type": "Organization",
      "name": "Studio Miradia"
    },
    "priceValidUntil": new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": "150",
    "bestRating": "5",
    "worstRating": "1"
  },
  "additionalProperty": [
    {
      "@type": "PropertyValue",
      "name": "Material",
      "value": "Natural Fabrics"
    },
    {
      "@type": "PropertyValue",
      "name": "Craftsmanship",
      "value": "Handcrafted"
    },
    {
      "@type": "PropertyValue",
      "name": "Sustainability",
      "value": "Eco-Friendly"
    }
  ]
})

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://studiomiradia.com/#business",
  "name": "Studio Miradia",
  "description": "Luxury fashion brand featuring handcrafted butterfly-inspired pieces",
  "url": "https://studiomiradia.com",
  "telephone": "+91-98765-43210",
  "email": "hello@studiomiradia.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Fashion Street",
    "addressLocality": "Mumbai",
    "addressRegion": "Maharashtra",
    "postalCode": "400001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "19.0760",
    "longitude": "72.8777"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "10:00",
      "closes": "19:00"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": "Saturday",
      "opens": "10:00",
      "closes": "18:00"
    }
  ],
  "priceRange": "$$$",
  "paymentAccepted": ["Cash", "Credit Card", "Debit Card", "UPI", "Net Banking"],
  "currenciesAccepted": "INR",
  "areaServed": {
    "@type": "Country",
    "name": "India"
  }
}

export const faqSchema = (faqs: Array<{question: string, answer: string}>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
})

export const collectionPageSchema = (collectionName: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": `${collectionName} Collection - Studio Miradia`,
  "description": description,
  "url": `https://studiomiradia.com/shop?category=${collectionName.toLowerCase()}`,
  "mainEntity": {
    "@type": "ItemList",
    "name": `${collectionName} Collection`,
    "description": description
  }
})

export const howToSchema = (steps: Array<{name: string, text: string, image?: string}>) => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Care for Studio Miradia Garments",
  "description": "Learn how to properly care for your luxury handcrafted garments",
  "image": "https://studiomiradia.com/care-instructions.jpg",
  "totalTime": "PT10M",
  "supply": [
    {
      "@type": "HowToSupply",
      "name": "Mild Detergent"
    },
    {
      "@type": "HowToSupply", 
      "name": "Cold Water"
    }
  ],
  "tool": [
    {
      "@type": "HowToTool",
      "name": "Gentle Washing Machine"
    }
  ],
  "step": steps.map((step, index) => ({
    "@type": "HowToStep",
    "position": index + 1,
    "name": step.name,
    "text": step.text,
    "image": step.image
  }))
})

export const reviewSchema = (reviews: Array<{author: string, rating: number, text: string, date: string}>) => ({
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "Studio Miradia Collection",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "reviewCount": reviews.length.toString(),
    "bestRating": "5",
    "worstRating": "1"
  },
  "review": reviews.map(review => ({
    "@type": "Review",
    "author": {
      "@type": "Person",
      "name": review.author
    },
    "reviewRating": {
      "@type": "Rating",
      "ratingValue": review.rating,
      "bestRating": "5",
      "worstRating": "1"
    },
    "reviewBody": review.text,
    "datePublished": review.date
  }))
})

export const eventSchema = (eventName: string, startDate: string, endDate: string, location: string) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": eventName,
  "description": "Join us for an exclusive fashion showcase featuring our latest collection",
  "startDate": startDate,
  "endDate": endDate,
  "location": {
    "@type": "Place",
    "name": location,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Fashion Street",
      "addressLocality": "Mumbai",
      "addressRegion": "Maharashtra",
      "postalCode": "400001",
      "addressCountry": "IN"
    }
  },
  "organizer": {
    "@type": "Organization",
    "name": "Studio Miradia",
    "url": "https://studiomiradia.com"
  },
  "eventStatus": "https://schema.org/EventScheduled",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode"
})
