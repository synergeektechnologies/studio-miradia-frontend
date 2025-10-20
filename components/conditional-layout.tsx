"use client"

import type React from "react"

import { Navbar } from "./navbar"
import { Footer } from "./footer"

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
