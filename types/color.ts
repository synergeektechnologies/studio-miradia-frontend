export interface Color {
  id: string;
  name: string;
  colorCode?: string;
  imageUrl?: string;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export type CreateColor = Omit<Color, "id" | "createdAt" | "updatedAt">;

export type UpdateColor = Partial<Omit<Color, "id" | "createdAt" | "updatedAt">> & { id: string };
