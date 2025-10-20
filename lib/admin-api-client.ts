import type { Product } from "@/types/product"

// Use relative paths to call Next.js API routes
const API_BASE_URL = "";

// Frontend types
export interface Category {
  id: string
  name: string
  description?: string
  active: boolean
  createdAt: string
  updatedAt: string
}
export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  password?: string
  joinedDate: string
  totalOrders: number
  totalSpent: number
}

export interface Order {
  id: string
  customerId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  items: Array<{
    id: string
    productId: string
    productName: string
    productImage: string
    quantity: number
    unitPrice: number
    totalPrice: number
  }>
  subtotal: number
  shipping: number
  total: number
  status: "pending" | "paid" | "shipped" | "cancelled"
  paymentMethod: "card" | "upi" | "cod"
  paymentStatus: "paid" | "pending" | "failed"
  shippingAddress: {
    id: string
    firstName: string
    lastName: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    phoneNumber: string
    type: string
  }
  billingAddress?: {
    id: string
    firstName: string
    lastName: string
    street: string
    city: string
    state: string
    zipCode: string
    country: string
    phoneNumber: string
    type: string
  }
  payment?: {
    id: string
    amount: number
    status: string
    method: string
    paymentDate: string
  }
  orderDate: string
  date: string
}

export interface Inquiry {
  id: string
  name: string
  email: string
  phoneNumber?: string
  subject: string
  message: string
  status: "PENDING" | "RESPONDED" | "CLOSED"
  createdAt: string
  updatedAt: string
}

// ---------------- Helper API function ----------------
async function apiCall<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  const response = await fetch(endpoint, {
    ...options,
    headers,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ error: "Unknown error" }))
    throw new Error(errorData.error || `HTTP ${response.status}`)
  }

  return response.json()
}

// ---------------- Helper transformers ----------------
function mapBackendProduct(p: any): Product {
  return {
    id: String(p.id),
    name: p.name,
    description: p.description || "",
    price: p.price,
    image: p.imageUrl || "",
    imageUrls: p.imageUrls || [],
    category: p.category,
    inStock: p.stockQuantity > 0,
    limitedEdition: p.limitedEdition || false,
    stockQuantity: p.stockQuantity,
    colors: p.colors || [],
  }
}

function mapBackendCustomer(u: any, extra?: Partial<Customer>): Customer {
  const name = `${u.firstName || ""} ${u.lastName || ""}`.trim() || u.email
  return {
    id: String(u.id),
    name,
    email: u.email,
    phone: u.phoneNumber || "",
    address: extra?.address || "",
    joinedDate: new Date(u.createdAt).toISOString().split("T")[0],
    totalOrders: extra?.totalOrders || 0,
    totalSpent: extra?.totalSpent || 0,
  }
}

function mapBackendOrder(o: any): Order {
  return {
    id: String(o.id),
    customerId: o.customerId || o.customerEmail,
    customerName: o.customerName || o.customerEmail,
    customerEmail: o.customerEmail,
    customerPhone: o.customerPhone || "N/A",
    items: o.items?.map((item: any) => ({
      id: String(item.id),
      productId: String(item.productId),
      productName: item.productName || "Unknown Product",
      productImage: item.productImage || "",
      quantity: item.quantity,
      unitPrice: Number(item.unitPrice),
      totalPrice: Number(item.totalPrice),
    })) || [],
    subtotal: Number(o.totalAmount),
    shipping: 50,
    total: Number(o.totalAmount) + 50,
    status: o.status?.toLowerCase() as Order["status"] || "pending",
    paymentMethod: o.payment?.method?.toLowerCase() as Order["paymentMethod"] || "card",
    paymentStatus: o.payment?.status?.toLowerCase() as Order["paymentStatus"] || "pending",
    shippingAddress: {
      id: String(o.shippingAddress?.id || ""),
      firstName: o.shippingAddress?.firstName || "N/A",
      lastName: o.shippingAddress?.lastName || "N/A",
      street: o.shippingAddress?.street || "Address not available",
      city: o.shippingAddress?.city || "City not available",
      state: o.shippingAddress?.state || "State not available",
      zipCode: o.shippingAddress?.zipCode || "00000",
      country: o.shippingAddress?.country || "Country not available",
      phoneNumber: o.shippingAddress?.phoneNumber || "Phone not available",
      type: o.shippingAddress?.type || "SHIPPING",
    },
    billingAddress: o.billingAddress ? {
      id: String(o.billingAddress.id),
      firstName: o.billingAddress.firstName || "N/A",
      lastName: o.billingAddress.lastName || "N/A",
      street: o.billingAddress.street || "Address not available",
      city: o.billingAddress.city || "City not available",
      state: o.billingAddress.state || "State not available",
      zipCode: o.billingAddress.zipCode || "00000",
      country: o.billingAddress.country || "Country not available",
      phoneNumber: o.billingAddress.phoneNumber || "Phone not available",
      type: o.billingAddress.type || "BILLING",
    } : undefined,
    payment: o.payment ? {
      id: String(o.payment.id),
      amount: Number(o.payment.amount),
      status: o.payment.status,
      method: o.payment.method,
      paymentDate: o.payment.paymentDate,
    } : undefined,
    orderDate: o.orderDate,
    date: new Date(o.orderDate).toISOString().split("T")[0],
  }
}

// ---------------- Customers ----------------
export async function fetchCustomers(): Promise<Customer[]> {
  const users = await apiCall<any[]>("/api/admin/customers")
  return users.map(u => mapBackendCustomer(u))
}

export async function createCustomer(customer: Omit<Customer, "id">): Promise<Customer> {
  const userData: any = {
    firstName: customer.name.split(" ")[0] || "",
    lastName: customer.name.split(" ").slice(1).join(" ") || "",
    email: customer.email,
    phoneNumber: customer.phone,
    enabled: true,
    ...(customer.password && { passwordHash: customer.password }),
  }

  const createdUser = await apiCall<any>("/api/admin/customers", {
    method: "POST",
    body: JSON.stringify(userData),
  })

  return mapBackendCustomer(createdUser, customer)
}

export async function updateCustomer(id: string, customer: Partial<Customer>): Promise<Customer> {
  const userData: any = {}
  if (customer.name) {
    const parts = customer.name.split(" ")
    userData.firstName = parts[0] || ""
    userData.lastName = parts.slice(1).join(" ") || ""
  }
  if (customer.email) userData.email = customer.email
  if (customer.phone) userData.phoneNumber = customer.phone

  const updatedUser = await apiCall<any>(`/api/admin/customers/${id}`, {
    method: "PUT",
    body: JSON.stringify(userData),
  })

  return mapBackendCustomer(updatedUser, customer)
}

export async function deleteCustomer(id: string): Promise<void> {
  await apiCall(`/api/admin/customers/${id}`, { method: "DELETE" })
}

// ---------------- Orders ----------------
export async function fetchOrders(): Promise<Order[]> {
  const orders = await apiCall<any[]>("/api/admin/orders")
  return orders.map(mapBackendOrder)
}

export async function updateOrderStatus(id: string, status: Order["status"]): Promise<Order> {
  console.log(`Admin API: Updating order ${id} status to ${status.toUpperCase()}`);
  try {
    const backendOrder = await apiCall<any>(`/api/admin/orders/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status: status.toUpperCase() }),
    })
    console.log(`Admin API: Order status updated successfully`, backendOrder);
    return mapBackendOrder(backendOrder)
  } catch (error) {
    console.error(`Admin API: Failed to update order status:`, error);
    throw error;
  }
}

export async function deleteOrder(id: string): Promise<void> {
  console.log(`Admin API: Deleting order ${id}`);
  try {
    await apiCall(`/api/admin/orders/${id}`, {
      method: "DELETE",
    })
    console.log(`Admin API: Order deleted successfully`);
  } catch (error) {
    console.error(`Admin API: Failed to delete order:`, error);
    throw error;
  }
}

// ---------------- Inquiries ----------------
export async function fetchInquiries(): Promise<Inquiry[]> {
  return await apiCall<Inquiry[]>("/api/admin/inquiries")
}

export async function createInquiry(inquiry: Omit<Inquiry, "id" | "createdAt" | "updatedAt" | "status">): Promise<Inquiry> {
  return await apiCall<Inquiry>("/api/admin/inquiries", {
    method: "POST",
    body: JSON.stringify(inquiry),
  })
}

export async function updateInquiryStatus(id: string, status: Inquiry["status"]): Promise<Inquiry> {
  console.log(`Admin API: Updating inquiry ${id} status to ${status}`);
  try {
    const updatedInquiry = await apiCall<Inquiry>(`/api/admin/inquiries/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    })
    console.log(`Admin API: Inquiry status updated successfully`, updatedInquiry);
    return updatedInquiry
  } catch (error) {
    console.error(`Admin API: Failed to update inquiry status:`, error);
    throw error;
  }
}


export async function deleteInquiry(id: string): Promise<void> {
  await apiCall(`/api/admin/inquiries/${id}`, { method: "DELETE" })
}

// ---------------- Products ----------------
export async function fetchProducts(): Promise<Product[]> {
  const products = await apiCall<any[]>("/api/admin/products")
  return products.map(mapBackendProduct)
}

export async function createProduct(product: Omit<Product, "id">): Promise<Product> {
  const data = {
    name: product.name,
    description: product.description,
    price: product.price,
    category: product.category,
    stockQuantity: product.stockQuantity ?? (product.inStock ? 10 : 0),
  }
  const created = await apiCall<any>("/api/admin/products", { method: "POST", body: JSON.stringify(data) })
  return mapBackendProduct(created)
}

export async function updateProduct(id: string, product: Partial<Product>): Promise<Product> {
  const data: any = {}
  if (product.name) data.name = product.name
  if (product.description) data.description = product.description
  if (product.price) data.price = product.price
  if (product.category) data.category = product.category
  if (product.stockQuantity !== undefined) data.stockQuantity = product.stockQuantity
  else if (product.inStock !== undefined) data.stockQuantity = product.inStock ? 10 : 0

  const updated = await apiCall<any>(`/api/admin/products/${id}`, { method: "PUT", body: JSON.stringify(data) })
  return mapBackendProduct(updated)
}

export async function deleteProduct(id: string): Promise<void> {
  await apiCall(`/api/admin/products/${id}`, { method: "DELETE" })
}

export async function uploadProductImage(productId: string, file: File): Promise<Product> {
  const formData = new FormData()
  formData.append("file", file)

  try{
    const response = await fetch(`/api/admin/products/${productId}/image`, { method: "POST", body: formData })
    if (!response.ok) throw new Error(`Failed to upload image: ${response.status}`)

    const backendProduct = await response.json()
    return mapBackendProduct(backendProduct)
  } catch (error) {
    console.error("Error uploading image:", error)
    throw error
  }
}

export async function uploadMultipleProductImages(productId: string, files: File[]): Promise<Product> {
  const formData = new FormData()
  files.forEach(file => {
    formData.append("files", file)
  })

  try{
    const response = await fetch(`/api/admin/products/${productId}/images`, { method: "POST", body: formData })
    
    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Failed to upload images: ${response.status} - ${errorText}`)
    }

    const backendProduct = await response.json()
    return mapBackendProduct(backendProduct)
  } catch (error) {
    console.error("Error uploading images:", error)
    throw error
  }
}

export async function removeProductImage(productId: string, imageUrl: string): Promise<Product> {
  const encodedImageUrl = encodeURIComponent(imageUrl)
  const response = await apiCall<any>(`/api/admin/products/${productId}/images/${encodedImageUrl}`, { method: "DELETE" })
  return mapBackendProduct(response)
}

export async function deleteAllProductImages(productId: string): Promise<void> {
  await apiCall(`/api/admin/products/${productId}/images`, { method: "DELETE" })
}

export async function deleteProductImage(productId: string): Promise<void> {
  await apiCall(`/api/products/${productId}/image`, { method: "DELETE" })
}

// Category API functions
export async function getCategories(): Promise<Category[]> {
  const response = await apiCall<Category[]>("/api/admin/categories")
  return response
}

export async function getActiveCategories(): Promise<Category[]> {
  const response = await apiCall<Category[]>("/api/categories/active")
  return response
}

export async function createCategory(categoryData: {
  name: string
  description?: string
  active?: boolean
}): Promise<Category> {
  const response = await apiCall<Category>("/api/admin/categories", {
    method: "POST",
    body: JSON.stringify(categoryData),
  })
  return response
}

export async function updateCategory(id: string, categoryData: {
  name: string
  description?: string
  active?: boolean
}): Promise<Category> {
  const response = await apiCall<Category>(`/api/admin/categories/${id}`, {
    method: "PUT",
    body: JSON.stringify(categoryData),
  })
  return response
}

export async function deleteCategory(id: string): Promise<void> {
  await apiCall(`/api/admin/categories/${id}`, { method: "DELETE" })
}

export async function deactivateCategory(id: string): Promise<void> {
  await apiCall(`/api/admin/categories/${id}/deactivate`, { method: "PATCH" })
}

export async function activateCategory(id: string): Promise<void> {
  await apiCall(`/api/admin/categories/${id}/activate`, { method: "PATCH" })
}