import { NextResponse } from "next/server"
import { cookies } from "next/headers"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"

export async function GET() {
  const cookieStore = await cookies()
  const access = cookieStore.get("sm_access")?.value
  const body_access = {
    accessToken: access
  }

  if (!access) {
    return NextResponse.json({ user: null }, { status: 200 })
  }

  // Fetch complete user profile from backend
  try {
    const resp = await fetch(`${BACKEND_URL}/api/account/profile`, {
      headers: { Authorization: `Bearer ${access}` },
      cache: "no-store",
    })
    if (resp.ok) {
      const userData = await resp.json()
      // Transform backend user data to frontend format
      const user = {
        id: userData.id,
        email: userData.email,
        role: userData.roles && userData.roles.length > 0 ? userData.roles[0] : 'customer',
        name: userData.firstName && userData.lastName 
          ? `${userData.firstName} ${userData.lastName}` 
          : userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phoneNumber: userData.phoneNumber
      }
      return NextResponse.json({ user }, { status: 200 })
    }else{
      throw new Error("Failed to fetch user profile")
    }
  } catch (error) {
    console.error("Session error:", error)
    // ignore
  }
}


