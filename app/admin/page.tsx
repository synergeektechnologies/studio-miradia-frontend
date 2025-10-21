"use client"

import { ProtectedRoute } from "../../components/protected-route"
import { useAdmin } from "../../contexts/admin-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { Badge } from "../../components/ui/badge"
import { Button } from "../../components/ui/button"
import { Package, ShoppingBag, Users, DollarSign, Plus, Pencil, Trash2, Eye, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { useState, useEffect } from "react"
import Image from "next/image"
import { ProductDialog } from "../../components/admin/product-dialog"
import { CustomerDialog } from "../../components/admin/customer-dialog"
import { OrderDetailsDialog } from "../../components/admin/order-details-dialog"
import { InquiryDetailsDialog } from "../../components/admin/inquiry-details-dialog"
import { CategoryDialog } from "../../components/admin/category-dialog"
import type { Category } from "../../lib/admin-api-client"
import { ColorManagement } from "../../components/admin/color-management"
import { useToast } from "../../hooks/use-toast"
import type { Product } from "../../types/product"

function AdminDashboard() {
  const {
    products,
    customers,
    orders,
    inquiries,
    categories,
    isLoading,
    refreshData,
    deleteProduct,
    deleteCustomer,
    updateOrderStatus,
    deleteOrder,
    deleteInquiry,
    updateInquiryStatus,
    addCategory,
    updateCategory,
    deleteCategory,
    deactivateCategory,
    activateCategory,
  } = useAdmin()
  const { toast } = useToast()
  const [productDialogOpen, setProductDialogOpen] = useState(false)
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false)
  const [orderDetailsOpen, setOrderDetailsOpen] = useState(false)
  const [inquiryDetailsOpen, setInquiryDetailsOpen] = useState(false)
  const [categoryDialogOpen, setCategoryDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null)
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [selectedInquiryId, setSelectedInquiryId] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = async () => {
    setIsRefreshing(true)
    try {
      await refreshData()
      toast({
        title: "Data Refreshed",
        description: "All data has been successfully refreshed.",
      })
    } catch (error) {
      toast({
        title: "Refresh Failed",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsRefreshing(false)
    }
  }

  const stats = [
    {
      title: "Total Orders",
      value: orders.length.toString(),
      icon: ShoppingBag,
      change: "+12%",
      changeType: "positive" as const,
    },
    {
      title: "Total Products",
      value: products.length.toString(),
      icon: Package,
      change: "+3",
      changeType: "positive" as const,
    },
    {
      title: "Total Customers",
      value: customers.length.toString(),
      icon: Users,
      change: "+8%",
      changeType: "positive" as const,
    },
    {
      title: "Revenue",
      value: `₹${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}`,
      icon: DollarSign,
      change: "+18%",
      changeType: "positive" as const,
    },
  ]

  const handleDeleteProduct = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id)
        toast({
          title: "Product deleted",
          description: "The product has been successfully deleted.",
        })
        // Data is automatically updated via the admin context
      } catch (error) {
        console.error("Failed to delete product:", error)
        toast({
          title: "Error",
          description: `Failed to delete product: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive",
        })
      }
    }
  }

  const handleDeleteCustomer = async (id: string) => {
    if (confirm("Are you sure you want to delete this customer?")) {
      try {
        await deleteCustomer(id)
        toast({
          title: "Customer deleted",
          description: "The customer has been successfully deleted.",
        })
        // Data is automatically updated via the admin context
      } catch (error) {
        console.error("Failed to delete customer:", error)
        toast({
          title: "Error",
          description: `Failed to delete customer: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive",
        })
      }
    }
  }

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product)
    setProductDialogOpen(true)
  }

  const handleEditCustomer = (customer: any) => {
    setSelectedCustomer(customer)
    setCustomerDialogOpen(true)
  }

  const handleViewOrder = (orderId: string) => {
    setSelectedOrderId(orderId)
    setOrderDetailsOpen(true)
  }

  const handleQuickStatusUpdate = async (orderId: string, newStatus: string) => {
    try {
      await updateOrderStatus(orderId, newStatus as any)
      toast({
        title: "Order Status Updated",
        description: `Order status has been updated to ${newStatus.toLowerCase()}.`,
      })
      // Data is automatically updated via the admin context
    } catch (error) {
      console.error("Failed to update order status:", error)
      toast({
        title: "Update Failed",
        description: `Failed to update order status: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      })
    }
  }

  const handleDeleteOrder = async (id: string) => {
    if (confirm("Are you sure you want to delete this order? This action cannot be undone.")) {
      try {
        await deleteOrder(id)
        toast({
          title: "Order deleted",
          description: "The order has been successfully deleted.",
        })
        // Data is automatically updated via the admin context
      } catch (error) {
        console.error("Failed to delete order:", error)
        toast({
          title: "Error",
          description: `Failed to delete order: ${error instanceof Error ? error.message : 'Unknown error'}`,
          variant: "destructive",
        })
      }
    }
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "outline"
      case "paid":
        return "secondary"
      case "shipped":
        return "default"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  const handleViewInquiry = async (inquiryId: string) => {
    const inquiry = inquiries.find((i) => i.id === inquiryId)
    if (inquiry?.status === "PENDING") {
      try {
        await updateInquiryStatus(inquiryId, "RESPONDED")
      } catch (error) {
        console.error("Failed to update inquiry status:", error)
      }
    }
    setSelectedInquiryId(inquiryId)
    setInquiryDetailsOpen(true)
  }

  const handleQuickInquiryStatusUpdate = async (inquiryId: string, newStatus: string) => {
    try {
      await updateInquiryStatus(inquiryId, newStatus as any)
      toast({
        title: "Inquiry Status Updated",
        description: `Inquiry status has been updated to ${newStatus.toLowerCase()}.`,
      })
      // Data is automatically updated via the admin context
    } catch (error) {
      console.error("Failed to update inquiry status:", error)
      toast({
        title: "Update Failed",
        description: `Failed to update inquiry status: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      })
    }
  }

  const handleDeleteInquiry = async (id: string) => {
    if (confirm("Are you sure you want to delete this inquiry?")) {
      try {
        await deleteInquiry(id)
        toast({
          title: "Inquiry deleted",
          description: "The inquiry has been successfully deleted.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete inquiry. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleEditCategory = (category: Category) => {
    setSelectedCategory(category)
    setCategoryDialogOpen(true)
  }

  const handleDeleteCategory = async (id: string) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id)
        toast({
          title: "Category deleted",
          description: "The category has been successfully deleted.",
        })
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to delete category. Please try again.",
          variant: "destructive",
        })
      }
    }
  }

  const handleToggleCategoryStatus = async (category: Category) => {
    try {
      if (category.active) {
        await deactivateCategory(category.id)
        toast({
          title: "Category deactivated",
          description: "The category has been deactivated.",
        })
      } else {
        await activateCategory(category.id)
        toast({
          title: "Category activated",
          description: "The category has been activated.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update category status. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleSaveCategory = async (data: { name: string; description?: string; active: boolean }) => {
    if (selectedCategory) {
      await updateCategory(selectedCategory.id, data)
    } else {
      await addCategory(data)
    }
  }

  const unreadCount = inquiries.filter((i) => i.status === "PENDING").length

  // Auto-refresh data when dialogs are closed (indicating successful operations)
  useEffect(() => {
    if (!productDialogOpen && !customerDialogOpen && !categoryDialogOpen) {
      // Dialogs were closed, data might have been updated
      console.log("Admin Dashboard: Dialogs closed, data may have been updated")
    }
  }, [productDialogOpen, customerDialogOpen, categoryDialogOpen])

  // Auto-refresh data periodically (every 30 seconds) to catch external changes
  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Admin Dashboard: Auto-refreshing data...")
      refreshData().catch(error => {
        console.error("Auto-refresh failed:", error)
      })
    }, 30000) // 30 seconds

    return () => clearInterval(interval)
  }, [refreshData])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background pt-12 md:pt-16 px-4 md:px-8 mt-12 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5A4A] mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-12 md:pt-16 px-4 md:px-8 mt-12">
      {/* Header with Refresh Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <Button
          onClick={handleRefresh}
          disabled={isRefreshing}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
          {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
              <stat.icon className="w-4 h-4 text-[#8B5A4A]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              {/* <p className="text-xs text-muted-foreground mt-1">
                <span className={stat.changeType === "positive" ? "text-green-600" : "text-red-600"}>
                  {stat.change}
                </span>{" "}
                from last month
              </p> */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabs */}
      <Tabs defaultValue="orders" className="space-y-4">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="colors">Colors</TabsTrigger>
          <TabsTrigger value="customers">Customers</TabsTrigger>
          <TabsTrigger value="inquiries" className="relative">
            Inquiries
            {unreadCount > 0 && (
              <Badge
                variant="destructive"
                className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {unreadCount}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Orders</CardTitle>
              <CardDescription>Manage and track customer orders with payment details</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orders.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center text-muted-foreground py-8">
                        No orders found
                      </TableCell>
                    </TableRow>
                  ) : (
                    orders.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.customerName}</TableCell>
                      <TableCell>{order.customerPhone}</TableCell>
                      <TableCell>₹{order.total.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1">
                          <Badge variant="outline" className="w-fit">
                            {order.paymentMethod.toUpperCase()}
                          </Badge>
                          <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"} className="w-fit">
                            {order.paymentStatus}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Badge variant={getStatusColor(order.status)}>
                            {order.status}
                          </Badge>
                          <Select
                            value={order.status}
                            onValueChange={(newStatus) => handleQuickStatusUpdate(order.id, newStatus)}
                          >
                            <SelectTrigger className="w-24 h-6 text-xs">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </TableCell>
                      <TableCell>{order.date}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleViewOrder(order.id)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteOrder(order.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Products</CardTitle>
                <CardDescription>Manage your product inventory</CardDescription>
              </div>
              <Button
                onClick={() => {
                  setSelectedProduct(null)
                  setProductDialogOpen(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Image</TableHead>
                    <TableHead>Product</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No products found
                      </TableCell>
                    </TableRow>
                  ) : (
                    products.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}${
                            product.imageUrls && product.imageUrls.length > 0
                              ? product.imageUrls[product.imageUrls.length - 1]
                              : product.image || ""
                          }`}
                          width={48}
                          height={48}
                          alt={product.name}
                          className="w-12 h-12 object-cover object-top rounded"
                        />
                      </TableCell>
                      <TableCell className="font-medium">{product.name}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell>₹{product.price}</TableCell>
                      <TableCell>
                        <Badge variant={product.inStock ? "default" : "secondary"}>
                          {product.inStock ? "In Stock" : "Out of Stock"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditProduct(product)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Manage product categories</CardDescription>
              </div>
              <Button
                onClick={() => {
                  setSelectedCategory(null)
                  setCategoryDialogOpen(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {categories.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                        No categories found
                      </TableCell>
                    </TableRow>
                  ) : (
                    categories.map((category) => (
                      <TableRow key={category.id}>
                        <TableCell className="font-medium">{category.name}</TableCell>
                        <TableCell className="max-w-xs truncate">{category.description || "—"}</TableCell>
                        <TableCell>
                          <Badge variant={category.active ? "default" : "secondary"}>
                            {category.active ? "Active" : "Inactive"}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(category.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              onClick={() => handleToggleCategoryStatus(category)}
                            >
                              {category.active ? "Deactivate" : "Activate"}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleEditCategory(category)}>
                              <Pencil className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="colors" className="space-y-4">
          <ColorManagement />
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Customers</CardTitle>
                <CardDescription>View and manage customer information</CardDescription>
              </div>
              <Button
                onClick={() => {
                  setSelectedCustomer(null)
                  setCustomerDialogOpen(true)
                }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Customer
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {customers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground py-8">
                        No customers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    customers.map((customer) => (
                    <TableRow key={customer.id}>
                      <TableCell className="font-medium">{customer.name}</TableCell>
                      <TableCell>{customer.email}</TableCell>
                      <TableCell>{customer.phone}</TableCell>
                      <TableCell>{customer.totalOrders}</TableCell>
                      <TableCell>₹{customer.totalSpent.toFixed(2)}</TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm" onClick={() => handleEditCustomer(customer)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleDeleteCustomer(customer.id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inquiries" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Customer Inquiries</CardTitle>
              <CardDescription>Manage customer messages from the contact form</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inquiries.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center text-muted-foreground py-8">
                        No inquiries yet
                      </TableCell>
                    </TableRow>
                  ) : (
                    inquiries.map((inquiry) => (
                      <TableRow key={inquiry.id}>
                        <TableCell className="text-sm">{new Date(inquiry.createdAt).toLocaleDateString()}</TableCell>
                        <TableCell className="font-medium">{inquiry.name}</TableCell>
                        <TableCell>{inquiry.email}</TableCell>
                        <TableCell>{inquiry.phoneNumber || "N/A"}</TableCell>
                        <TableCell className="max-w-xs truncate">{inquiry.subject}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                inquiry.status === "RESPONDED"
                                  ? "default"
                                  : inquiry.status === "CLOSED"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {inquiry.status}
                            </Badge>
                            <Select
                              value={inquiry.status}
                              onValueChange={(newStatus) => handleQuickInquiryStatusUpdate(inquiry.id, newStatus)}
                            >
                              <SelectTrigger className="w-28 h-6 text-xs">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="PENDING">Pending</SelectItem>
                                <SelectItem value="RESPONDED">Responded</SelectItem>
                                <SelectItem value="CLOSED">Closed</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" onClick={() => handleViewInquiry(inquiry.id)}>
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDeleteInquiry(inquiry.id)}>
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <ProductDialog open={productDialogOpen} onOpenChange={setProductDialogOpen} product={selectedProduct} />
      <CustomerDialog open={customerDialogOpen} onOpenChange={setCustomerDialogOpen} customer={selectedCustomer} />
      <OrderDetailsDialog open={orderDetailsOpen} onOpenChange={setOrderDetailsOpen} orderId={selectedOrderId} />
      <InquiryDetailsDialog
        open={inquiryDetailsOpen}
        onOpenChange={setInquiryDetailsOpen}
        inquiryId={selectedInquiryId}
      />
      <CategoryDialog
        open={categoryDialogOpen}
        onOpenChange={setCategoryDialogOpen}
        category={selectedCategory}
        onSave={handleSaveCategory}
      />
    </div>
  )
}

export default function AdminPage() {
  return (
    <ProtectedRoute requireAdmin={true}>
      <AdminDashboard />
    </ProtectedRoute>
  )
}
