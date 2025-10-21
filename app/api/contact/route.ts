import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

// POST /api/contact - Create a new inquiry from contact form (public endpoint)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      throw new Error(`Backend responded with ${res.status}`);
    }

    const inquiry = await res.json();
    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('Error creating inquiry:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
