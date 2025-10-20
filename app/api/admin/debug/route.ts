import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

// GET /api/admin/debug - Debug admin access
export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("sm_access")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token found" }, { status: 401 });
    }

    // Test the token by calling the profile endpoint
    const response = await fetch(`${API_BASE_URL}/api/account/profile`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { 
          error: `Token validation failed: ${response.status}`,
          status: response.status 
        },
        { status: response.status }
      );
    }

    const userData = await response.json();
    
    return NextResponse.json({
      success: true,
      user: {
        id: userData.id,
        email: userData.email,
        roles: userData.roles,
        hasAdminRole: userData.roles && userData.roles.includes('ADMIN'),
        firstName: userData.firstName,
        lastName: userData.lastName,
      }
    });
  } catch (error) {
    console.error('Debug error:', error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}
