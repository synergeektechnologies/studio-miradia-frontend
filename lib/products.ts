import type { Product } from "../types/product"

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

function normalizeImageUrl(imagePath: string | undefined): string {
  if (!imagePath || imagePath.trim().length === 0) return "/placeholder-user.jpg";
  // If already absolute URL, return as-is
  if (/^https?:\/\//i.test(imagePath)) return imagePath;
  // Ensure no duplicate slashes
  const cleaned = imagePath.replace(/^\/+/, "");
  return `${API_BASE_URL}/${cleaned}`;
}

export async function fetchProducts(options?: { token?: string }): Promise<Product[]> {
  const url = `${API_BASE_URL}/api/products`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (options?.token) headers["Authorization"] = `Bearer ${options.token}`;

  const res = await fetch(url, { headers, cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch products: ${res.status}`);

  const data = await res.json();
  // Map backend product to frontend Product shape
  const mapped: Product[] = (data || []).map((p: any) => ({
    id: String(p.id),
    name: p.name,
    description: p.description ?? "",
    price: Number(p.price ?? 0),
    image: normalizeImageUrl(p.imageUrl),
    imageUrls: p.imageUrls ? p.imageUrls.map((url: string) => normalizeImageUrl(url)) : [],
    category: p.category ?? "Uncategorized",
    inStock: (p.stockQuantity ?? 0) > 0,
    limitedEdition: Boolean(p.limitedEdition),
    stockQuantity: p.stockQuantity ?? 0,
    colors: p.colors ? p.colors.map((color: any) => ({
      id: String(color.id),
      name: color.name,
      colorCode: color.colorCode,
      imageUrl: color.imageUrl ? normalizeImageUrl(color.imageUrl) : undefined,
      active: Boolean(color.active)
    })) : [],
  }));
  return mapped;
}

export async function fetchNewestProducts(limit: number = 10, options?: { token?: string }): Promise<Product[]> {
  const url = `${API_BASE_URL}/api/products/newest?limit=${limit}`;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (options?.token) headers["Authorization"] = `Bearer ${options.token}`;

  const res = await fetch(url, { headers, cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch newest products: ${res.status}`);

  const data = await res.json();
  // Map backend product to frontend Product shape
  const mapped: Product[] = (data || []).map((p: any) => ({
    id: String(p.id),
    name: p.name,
    description: p.description ?? "",
    price: Number(p.price ?? 0),
    image: normalizeImageUrl(p.imageUrl),
    imageUrls: p.imageUrls ? p.imageUrls.map((url: string) => normalizeImageUrl(url)) : [],
    category: p.category ?? "Uncategorized",
    inStock: (p.stockQuantity ?? 0) > 0,
    limitedEdition: Boolean(p.limitedEdition),
    stockQuantity: p.stockQuantity ?? 0,
    colors: p.colors ? p.colors.map((color: any) => ({
      id: String(color.id),
      name: color.name,
      colorCode: color.colorCode,
      imageUrl: color.imageUrl ? normalizeImageUrl(color.imageUrl) : undefined,
      active: Boolean(color.active)
    })) : [],
  }));
  return mapped;
}

export async function createProduct(body: {
  name: string
  description?: string
  category?: string
  price: number
  stockQuantity?: number
}, options: { token: string }): Promise<Product> {
  const url = `${API_BASE_URL}/api/products`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${options.token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to create product: ${res.status}`);
  const p = await res.json();
  return {
    id: String(p.id),
    name: p.name,
    description: p.description ?? "",
    price: Number(p.price ?? 0),
    image: normalizeImageUrl(p.imageUrl),
    imageUrls: p.imageUrls ? p.imageUrls.map((url: string) => normalizeImageUrl(url)) : [],
    category: p.category ?? "Uncategorized",
    inStock: (p.stockQuantity ?? 0) > 0,
    limitedEdition: Boolean(p.limitedEdition),
    stockQuantity: p.stockQuantity ?? 0,
    colors: p.colors ? p.colors.map((color: any) => ({
      id: String(color.id),
      name: color.name,
      colorCode: color.colorCode,
      imageUrl: color.imageUrl ? normalizeImageUrl(color.imageUrl) : undefined,
      active: Boolean(color.active)
    })) : [],
  };
}

export async function updateProductRequest(id: string, body: {
  name?: string
  description?: string
  category?: string
  price?: number
  stockQuantity?: number
}, options: { token: string }): Promise<Product> {
  const url = `${API_BASE_URL}/api/products/${id}`;
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${options.token}`,
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`Failed to update product: ${res.status}`);
  const p = await res.json();
  return {
    id: String(p.id),
    name: p.name,
    description: p.description ?? "",
    price: Number(p.price ?? 0),
    image: normalizeImageUrl(p.imageUrl),
    imageUrls: p.imageUrls ? p.imageUrls.map((url: string) => normalizeImageUrl(url)) : [],
    category: p.category ?? "Uncategorized",
    inStock: (p.stockQuantity ?? 0) > 0,
    limitedEdition: Boolean(p.limitedEdition),
    stockQuantity: p.stockQuantity ?? 0,
    colors: p.colors ? p.colors.map((color: any) => ({
      id: String(color.id),
      name: color.name,
      colorCode: color.colorCode,
      imageUrl: color.imageUrl ? normalizeImageUrl(color.imageUrl) : undefined,
      active: Boolean(color.active)
    })) : [],
  };
}

export async function deleteProductRequest(id: string, options: { token: string }): Promise<void> {
  const url = `${API_BASE_URL}/api/products/${id}`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${options.token}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to delete product: ${res.status}`);
}

export async function uploadProductImage(
  productId: string, 
  file: File, 
  options: { token: string }
): Promise<Product> {
  const url = `${API_BASE_URL}/api/products/${productId}/image`;
  const formData = new FormData();
  
  formData.append('file', file);

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${options.token}`,
    },
    body: formData,
  });
  
  if (!res.ok) throw new Error(`Failed to upload image: ${res.status}`);
  const p = await res.json();
  return {
    id: String(p.id),
    name: p.name,
    description: p.description ?? "",
    price: Number(p.price ?? 0),
    image: normalizeImageUrl(p.imageUrl),
    imageUrls: p.imageUrls ? p.imageUrls.map((url: string) => normalizeImageUrl(url)) : [],
    category: p.category ?? "Uncategorized",
    inStock: (p.stockQuantity ?? 0) > 0,
    limitedEdition: Boolean(p.limitedEdition),
    stockQuantity: p.stockQuantity ?? 0,
    colors: p.colors ? p.colors.map((color: any) => ({
      id: String(color.id),
      name: color.name,
      colorCode: color.colorCode,
      imageUrl: color.imageUrl ? normalizeImageUrl(color.imageUrl) : undefined,
      active: Boolean(color.active)
    })) : [],
  };
}

export async function deleteProductImage(
  productId: string, 
  options: { token: string }
): Promise<void> {
  const url = `${API_BASE_URL}/api/products/${productId}/image`;
  const res = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${options.token}`,
    },
  });
  if (!res.ok) throw new Error(`Failed to delete image: ${res.status}`);
}

// Helper functions that work with fetched products
export function getProductById(products: Product[], id: string): Product | undefined {
  return products.find((p) => p.id === id)
}

export function getProductsByCategory(products: Product[], category: string): Product[] {
  return products.filter((p) => p.category === category)
}

export function getFeaturedProducts(products: Product[]): Product[] {
  return products.slice(0, 4)
}
