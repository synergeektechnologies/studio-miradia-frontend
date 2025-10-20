import { Color, CreateColor, UpdateColor } from '@/types/color';

// Use Next.js API routes instead of direct backend calls
const API_BASE_URL = '/api/admin';

// Color CRUD operations
export async function fetchColors(): Promise<Color[]> {
  const response = await fetch(`${API_BASE_URL}/colors`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch colors: ${response.status}`);
  }

  return response.json();
}

export async function fetchActiveColors(): Promise<Color[]> {
  // For now, we'll fetch all colors and filter on the frontend
  // You can create a separate endpoint for active colors if needed
  const colors = await fetchColors();
  return colors.filter(color => color.active);
}

export async function fetchColor(id: string): Promise<Color> {
  const response = await fetch(`${API_BASE_URL}/colors/${id}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch color: ${response.status}`);
  }

  return response.json();
}

export async function createColor(color: CreateColor): Promise<Color> {
  const response = await fetch(`${API_BASE_URL}/colors`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(color),
  });

  if (!response.ok) {
    throw new Error(`Failed to create color: ${response.status}`);
  }

  return response.json();
}

export async function updateColor(id: string, color: UpdateColor): Promise<Color> {
  const response = await fetch(`${API_BASE_URL}/colors/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(color),
  });

  if (!response.ok) {
    throw new Error(`Failed to update color: ${response.status}`);
  }

  return response.json();
}

export async function deleteColor(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/colors/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete color: ${response.status}`);
  }
}

// Color image upload
export async function uploadColorImage(colorId: string, file: File): Promise<Color> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/colors/${colorId}/image`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload color image: ${response.status}`);
  }

  return response.json();
}

export async function deleteColorImage(colorId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/colors/${colorId}/image`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error(`Failed to delete color image: ${response.status}`);
  }
}

// Product color associations
export async function addColorToProduct(productId: string, colorId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/colors/${colorId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to add color to product: ${response.status}`);
  }
}

export async function removeColorFromProduct(productId: string, colorId: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/colors/${colorId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to remove color from product: ${response.status}`);
  }
}

export async function updateProductColors(productId: string, colorIds: string[]): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/products/${productId}/colors`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(colorIds),
  });

  if (!response.ok) {
    throw new Error(`Failed to update product colors: ${response.status}`);
  }
}
