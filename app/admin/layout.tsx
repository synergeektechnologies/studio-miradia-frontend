import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Admin Dashboard - Studio Miradia",
  description: "Admin dashboard for managing Studio Miradia's luxury fashion platform. Manage products, orders, customers, and inquiries.",
  keywords: "Studio Miradia admin, admin dashboard, fashion admin, luxury fashion management, admin panel",
  openGraph: {
    title: "Admin Dashboard - Studio Miradia",
    description: "Admin dashboard for managing Studio Miradia's luxury fashion platform.",
    type: "website",
  },
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
