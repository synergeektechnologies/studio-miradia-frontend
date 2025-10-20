"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Package, Calendar, CreditCard, MapPin } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface OrderItem {
  id: number
  productName: string
  productImage: string
  quantity: number
  unitPrice: number
  totalPrice: number
}

interface Order {
  id: number
  orderNumber: string
  customerEmail: string
  orderDate: string
  totalAmount: number
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'DELIVERED' | 'CANCELLED'
  items: OrderItem[]
  payment?: {
    id: number
    amount: number
    paymentMethod: 'CARD' | 'UPI' | 'COD'
    status: 'SUCCESS' | 'PENDING' | 'FAILED'
    paymentDate: string
  }
  shippingAddress?: {
    id: number
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
    id: number
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
}

export function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/account/orders')
      if (response.ok) {
        const data = await response.json()
        setOrders(data.orders || [])
      } else {
        toast({
          title: "Error",
          description: "Failed to load order history",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load order history",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800'
      case 'PROCESSING':
        return 'bg-blue-100 text-blue-800'
      case 'SHIPPED':
        return 'bg-purple-100 text-purple-800'
      case 'DELIVERED':
        return 'bg-green-100 text-green-800'
      case 'CANCELLED':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-muted-foreground mt-2">Loading orders...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (orders.length === 0) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle>Order History</CardTitle>
              <CardDescription>View your past orders</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
            <Button asChild>
              <a href="/shop">Start Shopping</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Package className="h-5 w-5 text-primary" />
          </div>
          <div>
            <CardTitle>Order History</CardTitle>
            <CardDescription>View your past orders</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">Order #{order.orderNumber}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {formatDate(order.orderDate)}
                </p>
              </div>
              <div className="text-right">
                <Badge className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase()}
                </Badge>
                <p className="font-semibold mt-1">₹{order.totalAmount.toFixed(2)}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Items Ordered:</h4>
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span>{item.quantity}x {item.productName}</span>
                  <span>₹{item.totalPrice.toFixed(2)}</span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              {order.shippingAddress && (
                <div>
                  <h4 className="font-medium flex items-center gap-1 mb-1">
                    <MapPin className="h-3 w-3" />
                    Shipping Address
                  </h4>
                  <p className="text-muted-foreground">
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                    {order.shippingAddress.street}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                    {order.shippingAddress.country}
                  </p>
                </div>
              )}
              {order.payment && (
                <div>
                  <h4 className="font-medium flex items-center gap-1 mb-1">
                    <CreditCard className="h-3 w-3" />
                    Payment Method
                  </h4>
                  <p className="text-muted-foreground">
                    {order.payment.paymentMethod} - {order.payment.status}
                  </p>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
