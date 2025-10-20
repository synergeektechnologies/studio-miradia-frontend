import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("sm_access")?.value

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Call backend API to get user addresses
    const response = await fetch(`${BACKEND_URL}/api/account/addresses`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        accessToken
      }),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { message: errorData.message || "Failed to fetch addresses" },
        { status: response.status }
      )
    }

    const addresses = await response.json()
    return NextResponse.json({ addresses })

  } catch (error) {
    console.error("Addresses fetch error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("sm_access")?.value

    if (!accessToken) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()

    // Call backend API to create address
    const response = await fetch(`${BACKEND_URL}/api/account/addresses`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json(
        { message: errorData.message || "Failed to create address" },
        { status: response.status }
      )
    }

    const address = await response.json()
    return NextResponse.json(address)

  } catch (error) {
    console.error("Address creation error:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
