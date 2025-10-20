import { NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

// GET /api/categories/active - Get all active categories (public endpoint)
export async function GET() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/categories/active`, {
      cache: "no-store"
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
      return NextResponse.json(errorData, { status: response.status });
    }

    const categories = await response.json();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('Error fetching active categories:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
