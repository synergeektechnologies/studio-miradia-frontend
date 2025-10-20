import { NextResponse } from "next/server"

export async function POST() {
  const res = NextResponse.json({ success: true })
  const isProd = process.env.NODE_ENV === "production"

  // Clear cookies by setting maxAge to 0
  res.cookies.set("sm_access", "", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  res.cookies.set("sm_refresh", "", {
    httpOnly: true,
    secure: isProd,
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  })
  return res
}


