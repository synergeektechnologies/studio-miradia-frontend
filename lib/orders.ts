const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

export interface OrderItem {
  productId: string;
  quantity: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  phoneNumber: string;
}

export interface Payment {
  amount: number;
  method: string;
  status: string;
}

export interface OrderCreationRequest {
  customerEmail: string;
  items: OrderItem[];
  shippingAddress: Address;
  billingAddress?: Address;
  payment: Payment;
}

export async function createOrder(orderData: OrderCreationRequest, token: string): Promise<any> {
  const response = await fetch('/api/orders', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(orderData),
  });

  if (!response.ok) {
    throw new Error(`Failed to create order: ${response.status}`);
  }

  return response.json();
}
