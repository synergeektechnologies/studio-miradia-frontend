import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

function getAuthHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

// PATCH /api/admin/inquiries/[id]/status - Update inquiry status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sm_access")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const res = await fetch(`${API_BASE_URL}/api/inquiries/${params.id}/status`, {
      method: "PATCH",
      headers: getAuthHeaders(token),
      body: JSON.stringify(body),
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
    console.error('Error updating inquiry status:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}