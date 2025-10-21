import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

function getAuthHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

// GET /api/admin/inquiries - Fetch all inquiries
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sm_access")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
      headers: getAuthHeaders(token),
    });

    if (!res.ok) {
      throw new Error(`Backend responded with ${res.status}`);
    }

    const inquiries = await res.json();
    return NextResponse.json(inquiries);
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// POST /api/admin/inquiries - Create a new inquiry
export async function POST(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sm_access")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const res = await fetch(`${API_BASE_URL}/api/inquiries`, {
      method: "POST",
      headers: getAuthHeaders(token),
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