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

// GET /api/admin/orders/[id] - Get order by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sm_access")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const response = await fetch(`${API_BASE_URL}/api/admin/orders/${id}`, {
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch order: ${response.status}` },
        { status: response.status }
      );
    }

    const order = await response.json();
    return NextResponse.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// DELETE /api/admin/orders/[id] - Delete order by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sm_access")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    console.log(`Deleting order ${id}`);
    console.log(`Backend URL: ${API_BASE_URL}/api/admin/orders/${id}`);
    console.log(`Auth headers:`, getAuthHeaders(token));

    const response = await fetch(`${API_BASE_URL}/api/admin/orders/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to delete order: ${response.status} - ${errorText}`);
      return NextResponse.json(
        { error: `Failed to delete order: ${response.status} - ${errorText}` },
        { status: response.status }
      );
    }

    console.log(`Order ${id} deleted successfully`);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting order:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}