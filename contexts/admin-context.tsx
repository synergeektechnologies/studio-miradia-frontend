"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import type { Product } from "../types/product"
import { 
  fetchCustomers, 
  createCustomer as createCustomerAPI, 
  updateCustomer as updateCustomerAPI, 
  deleteCustomer as deleteCustomerAPI,
  fetchOrders, 
  updateOrderStatus as updateOrderStatusAPI,
  deleteOrder as deleteOrderAPI,
  fetchInquiries,
  createInquiry as createInquiryAPI,
  updateInquiryStatus as updateInquiryStatusAPI,
  deleteInquiry as deleteInquiryAPI,
  fetchProducts as fetchProductsAPI,
  createProduct as createProductAPI,
  updateProduct as updateProductAPI,
  deleteProduct as deleteProductAPI,
  uploadProductImage as uploadProductImageAPI,
  uploadMultipleProductImages as uploadMultipleProductImagesAPI,
  removeProductImage as removeProductImageAPI,
  deleteAllProductImages as deleteAllProductImagesAPI,
  deleteProductImage as deleteProductImageAPI,
  getCategories as getCategoriesAPI,
  getActiveCategories as getActiveCategoriesAPI,
  createCategory as createCategoryAPI,
  updateCategory as updateCategoryAPI,
  deleteCategory as deleteCategoryAPI,
  deactivateCategory as deactivateCategoryAPI,
  activateCategory as activateCategoryAPI,
  type Customer,
  type Order,
  type Inquiry,
  type Category
} from "../lib/admin-api-client"

interface AdminContextType {
  products: Product[]
  customers: Customer[]
  orders: Order[]
  inquiries: Inquiry[]
  categories: Category[]
  isLoading: boolean
  refreshData: () => Promise<void>
  addProduct: (product: Omit<Product, "id">) => Promise<Product>
  updateProduct: (id: string, product: Partial<Product>) => Promise<Product>
  deleteProduct: (id: string) => Promise<void>
  uploadProductImage: (productId: string, file: File) => Promise<Product>
  uploadMultipleProductImages: (productId: string, files: File[]) => Promise<Product>
  removeProductImage: (productId: string, imageUrl: string) => Promise<Product>
  deleteAllProductImages: (productId: string) => Promise<void>
  deleteProductImage: (productId: string) => Promise<void>
  addCustomer: (customer: Omit<Customer, "id">) => Promise<Customer>
  updateCustomer: (id: string, customer: Partial<Customer>) => Promise<Customer>
  deleteCustomer: (id: string) => Promise<void>
  updateOrderStatus: (id: string, status: Order["status"]) => Promise<Order>
  deleteOrder: (id: string) => Promise<void>
  getOrderById: (id: string) => Order | undefined
  addInquiry: (inquiry: Omit<Inquiry, "id" | "createdAt" | "updatedAt" | "status">) => Promise<Inquiry>
  updateInquiryStatus: (id: string, status: Inquiry["status"]) => Promise<Inquiry>
  deleteInquiry: (id: string) => Promise<void>
  getInquiryById: (id: string) => Inquiry | undefined
  addCategory: (category: Omit<Category, "id" | "createdAt" | "updatedAt">) => Promise<Category>
  updateCategory: (id: string, category: Partial<Category>) => Promise<Category>
  deleteCategory: (id: string) => Promise<void>
  deactivateCategory: (id: string) => Promise<void>
  activateCategory: (id: string) => Promise<void>
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([])
  const [customers, setCustomers] = useState<Customer[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const loadAdminData = async () => {
    try {
      setIsLoading(true)
      const [productsData, customersData, ordersData, inquiriesData, categoriesData] = await Promise.all([
        fetchProductsAPI(),
        fetchCustomers(),
        fetchOrders(),
        fetchInquiries(),
        getCategoriesAPI().catch(error => {
          console.error("Failed to load categories:", error)
          // Return empty array as fallback
          return []
        }),
      ])
      setProducts(productsData)
      setCustomers(customersData)
      setOrders(ordersData)
      setInquiries(inquiriesData)
      setCategories(categoriesData)
    } catch (error) {
      console.error("Error loading admin data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshData = async () => {
    console.log("Admin Context: Refreshing all data...")
    await loadAdminData()
  }

  useEffect(() => {
    loadAdminData()
  }, [])

  // ---------- Products ----------
  const addProduct = async (product: Omit<Product, "id">) => {
    try {
      console.log("Admin Context: Adding new product...")
      const created = await createProductAPI(product)
      setProducts(prev => [...prev, created])
      console.log("Admin Context: Product added successfully")
      return created
    } catch (error) {
      console.error("Admin Context: Failed to add product:", error)
      throw error
    }
  }

  const updateProduct = async (id: string, productUpdate: Partial<Product>) => {
    try {
      console.log(`Admin Context: Updating product ${id}...`)
      const updated = await updateProductAPI(id, productUpdate)
      setProducts(prev => prev.map(p => (p.id === id ? updated : p)))
      console.log("Admin Context: Product updated successfully")
      return updated
    } catch (error) {
      console.error("Admin Context: Failed to update product:", error)
      throw error
    }
  }

  const deleteProduct = async (id: string) => {
    try {
      console.log(`Admin Context: Deleting product ${id}...`)
      await deleteProductAPI(id)
      setProducts(prev => prev.filter(p => p.id !== id))
      console.log("Admin Context: Product deleted successfully")
    } catch (error) {
      console.error("Admin Context: Failed to delete product:", error)
      throw error
    }
  }

  const uploadProductImage = async (productId: string, file: File) => {
    const updated = await uploadProductImageAPI(productId, file)
    setProducts(prev => prev.map(p => (p.id === productId ? updated : p)))
    return updated
  }

  const uploadMultipleProductImages = async (productId: string, files: File[]) => {
    const updated = await uploadMultipleProductImagesAPI(productId, files)
    setProducts(prev => prev.map(p => (p.id === productId ? updated : p)))
    return updated
  }

  const removeProductImage = async (productId: string, imageUrl: string) => {
    const updated = await removeProductImageAPI(productId, imageUrl)
    setProducts(prev => prev.map(p => (p.id === productId ? updated : p)))
    return updated
  }

  const deleteAllProductImages = async (productId: string) => {
    await deleteAllProductImagesAPI(productId)
    setProducts(prev =>
      prev.map(p => 
        p.id === productId ? { ...p, imageUrls: [] } : p
      )
    )
  }

  const deleteProductImage = async (productId: string) => {
    await deleteProductImageAPI(productId)
    setProducts(prev =>
      prev.map(p => 
        p.id === productId ? { ...p, image: "" } : p
      )
    )
  }

  // ---------- Customers ----------
  const addCustomer = async (customer: Omit<Customer, "id">) => {
    try {
      console.log("Admin Context: Adding new customer...")
      const newCustomer = await createCustomerAPI(customer)
      setCustomers(prev => [...prev, newCustomer])
      console.log("Admin Context: Customer added successfully")
      return newCustomer
    } catch (error) {
      console.error("Admin Context: Failed to add customer:", error)
      throw error
    }
  }

  const updateCustomer = async (id: string, customerUpdate: Partial<Customer>) => {
    try {
      console.log(`Admin Context: Updating customer ${id}...`)
      const updated = await updateCustomerAPI(id, customerUpdate)
      setCustomers(prev => prev.map(c => (c.id === id ? updated : c)))
      console.log("Admin Context: Customer updated successfully")
      return updated
    } catch (error) {
      console.error("Admin Context: Failed to update customer:", error)
      throw error
    }
  }

  const deleteCustomer = async (id: string) => {
    try {
      console.log(`Admin Context: Deleting customer ${id}...`)
      await deleteCustomerAPI(id)
      setCustomers(prev => prev.filter(c => c.id !== id))
      console.log("Admin Context: Customer deleted successfully")
    } catch (error) {
      console.error("Admin Context: Failed to delete customer:", error)
      throw error
    }
  }

  // ---------- Orders ----------
  const updateOrderStatus = async (id: string, status: Order["status"]) => {
    try {
      console.log(`Admin Context: Updating order ${id} status to ${status}...`)
      const updated = await updateOrderStatusAPI(id, status)
      setOrders(prev => prev.map(o => (o.id === id ? updated : o)))
      console.log("Admin Context: Order status updated successfully")
      return updated
    } catch (error) {
      console.error("Admin Context: Failed to update order status:", error)
      throw error
    }
  }

  const deleteOrder = async (id: string) => {
    try {
      console.log(`Admin Context: Deleting order ${id}...`)
      await deleteOrderAPI(id)
      setOrders(prev => prev.filter(o => o.id !== id))
      console.log("Admin Context: Order deleted successfully")
    } catch (error) {
      console.error("Admin Context: Failed to delete order:", error)
      throw error
    }
  }

  const getOrderById = (id: string) => orders.find(o => o.id === id)

  // ---------- Inquiries ----------
  const addInquiry = async (inquiry: Omit<Inquiry, "id" | "createdAt" | "updatedAt" | "status">) => {
    const newInquiry = await createInquiryAPI(inquiry)
    setInquiries(prev => [newInquiry, ...prev])
    return newInquiry
  }

  const updateInquiryStatus = async (id: string, status: Inquiry["status"]) => {
    try {
      console.log(`Admin Context: Updating inquiry ${id} status to ${status}...`)
      const updated = await updateInquiryStatusAPI(id, status)
      setInquiries(prev => prev.map(i => (i.id === id ? updated : i)))
      console.log("Admin Context: Inquiry status updated successfully")
      return updated
    } catch (error) {
      console.error("Admin Context: Failed to update inquiry status:", error)
      throw error
    }
  }


  const deleteInquiry = async (id: string) => {
    await deleteInquiryAPI(id)
    setInquiries(prev => prev.filter(i => i.id !== id))
  }

  const getInquiryById = (id: string) => inquiries.find(i => i.id === id)

  // Category management functions
  const addCategory = async (category: Omit<Category, "id" | "createdAt" | "updatedAt">) => {
    const newCategory = await createCategoryAPI(category)
    setCategories(prev => [...prev, newCategory])
    return newCategory
  }

  const updateCategory = async (id: string, category: Partial<Category>) => {
    if (!category.name) {
      throw new Error("Category name is required")
    }
    const updated = await updateCategoryAPI(id, {
      name: category.name,
      description: category.description,
      active: category.active
    })
    setCategories(prev => prev.map(c => (c.id === id ? updated : c)))
    return updated
  }

  const deleteCategory = async (id: string) => {
    await deleteCategoryAPI(id)
    setCategories(prev => prev.filter(c => c.id !== id))
  }

  const deactivateCategory = async (id: string) => {
    await deactivateCategoryAPI(id)
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, active: false } : c)))
  }

  const activateCategory = async (id: string) => {
    await activateCategoryAPI(id)
    setCategories(prev => prev.map(c => (c.id === id ? { ...c, active: true } : c)))
  }

  return (
    <AdminContext.Provider
      value={{
        products,
        customers,
        orders,
        inquiries,
        categories,
        isLoading,
        refreshData,
        addProduct,
        updateProduct,
        deleteProduct,
        uploadProductImage,
        uploadMultipleProductImages,
        removeProductImage,
        deleteAllProductImages,
        deleteProductImage,
        addCustomer,
        updateCustomer,
        deleteCustomer,
        updateOrderStatus,
        deleteOrder,
        getOrderById,
        addInquiry,
  updateInquiryStatus,
  deleteInquiry,
        getInquiryById,
        addCategory,
        updateCategory,
        deleteCategory,
        deactivateCategory,
        activateCategory,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (!context) throw new Error("useAdmin must be used within an AdminProvider")
  return context
}