import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

function getAuthHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

// GET /api/admin/inquiries/[id] - Get inquiry by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sm_access")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${API_BASE_URL}/api/inquiries/${params.id}`, {
      headers: getAuthHeaders(token),
    });

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
      }
      throw new Error(`Backend responded with ${res.status}`);
    }

    const inquiry = await res.json();
    return NextResponse.json(inquiry);
  } catch (error) {
    console.error('Error fetching inquiry:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/inquiries/[id] - Delete inquiry
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sm_access")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${API_BASE_URL}/api/inquiries/${params.id}`, {
      method: "DELETE",
      headers: getAuthHeaders(token),
    });

    if (!res.ok) {
      if (res.status === 404) {
        return NextResponse.json({ error: "Inquiry not found" }, { status: 404 });
      }
      throw new Error(`Backend responded with ${res.status}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting inquiry:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}