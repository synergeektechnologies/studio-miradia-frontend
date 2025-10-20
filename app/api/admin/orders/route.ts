import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

// Helper function to get auth headers
function getAuthHeaders(token: string) {
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

// GET /api/admin/orders - Fetch all orders
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sm_access")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const response = await fetch(`${API_BASE_URL}/api/admin/orders`, {
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch orders: ${response.status}` },
        { status: response.status }
      );
    }

    const orders = await response.json();
    return NextResponse.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
