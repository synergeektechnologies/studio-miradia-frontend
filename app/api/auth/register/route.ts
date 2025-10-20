import { NextResponse } from "next/server"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080"

export async function POST(request: Request) {
  try {
    const body = await request.json()

    const resp = await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: body.email,
        password: body.password,
        firstName: body.firstname,
        lastName: body.lastname,
        phoneNumber: body.phone || "",
      }),
    })

    if (!resp.ok) {
      const text = await resp.text()
      return NextResponse.json({ error: text || "Registration failed" }, { status: resp.status })
    }

    // After registration, attempt login to issue cookies
    const loginResp = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: body.email, password: body.password }),
    })

    if (!loginResp.ok) {
      return NextResponse.json({ success: true, note: "Registered, please login" })
    }

    const data: { accessToken: string; refreshToken: string } = await loginResp.json()
    const res = NextResponse.json({ success: true })
    const isProd = process.env.NODE_ENV === "production"

    res.cookies.set("sm_access", data.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    })
    res.cookies.set("sm_refresh", data.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    })

    return res
  } catch (e) {
    return NextResponse.json({ error: "Unexpected error" }, { status: 500 })
  }
}


