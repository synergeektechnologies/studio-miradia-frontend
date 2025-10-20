import { Color } from './color';

// Unified Product type for admin operations
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  imageUrls?: string[];
  category: string;
  inStock: boolean;
  limitedEdition?: boolean;
  stockQuantity?: number;
  colors?: Color[];
}

// Type for creating new products (without id)
export type CreateProduct = Omit<Product, "id">;

// Type for updating products (all fields optional except id)
export type UpdateProduct = Partial<Omit<Product, "id">> & { id: string };
