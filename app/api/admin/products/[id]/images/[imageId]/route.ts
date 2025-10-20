import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

// Helper function to get auth headers
function getAuthHeaders(token: string) {
  return {
    "Authorization": `Bearer ${token}`,
  };
}

// DELETE /api/admin/products/[id]/images/[imageId] - Delete product image
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sm_access")?.value;

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id, imageId } = await params;
    const decodedImageUrl = decodeURIComponent(imageId);
    const response = await fetch(`${API_BASE_URL}/api/products/${id}/images/${decodedImageUrl}`, {
      method: 'DELETE',
      headers: getAuthHeaders(token),
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to delete image: ${response.status}` },
        { status: response.status }
      );
    }

    return NextResponse.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error('Error deleting image:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
