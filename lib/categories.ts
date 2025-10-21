import type { Category } from "./admin-api-client"

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export async function fetchActiveCategories(): Promise<Category[]> {
  try {
    const response = await fetch('/api/categories/active', {
      cache: "no-store"
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    
    const categories = await response.json();
    return categories || [];
  } catch (error) {
    console.error("Error fetching active categories:", error);
    // Return fallback categories if API fails
    return [
      { id: "1", name: "LILA", description: "Elegant and sophisticated collection", active: true, createdAt: "", updatedAt: "" },
      { id: "2", name: "AURA", description: "Modern and contemporary designs", active: true, createdAt: "", updatedAt: "" }
    ];
  }
}

export async function fetchAllCategories(): Promise<Category[]> {
  try {
    const response = await fetch('/api/admin/categories', {
      cache: "no-store"
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }
    
    const categories = await response.json();
    return categories || [];
  } catch (error) {
    console.error("Error fetching all categories:", error);
    // Return fallback categories if API fails
    return [
      { id: "1", name: "LILA", description: "Elegant and sophisticated collection", active: true, createdAt: "", updatedAt: "" },
      { id: "2", name: "AURA", description: "Modern and contemporary designs", active: true, createdAt: "", updatedAt: "" }
    ];
  }
}

// Helper function to get category names as strings
export function getCategoryNames(categories: Category[]): string[] {
  return categories.map(cat => cat.name);
}

// Helper function to find category by name
export function findCategoryByName(categories: Category[], name: string): Category | undefined {
  return categories.find(cat => cat.name === name);
}
