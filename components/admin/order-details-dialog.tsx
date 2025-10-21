"use client"

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Badge } from "../ui/badge"
import { Separator } from "../ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { useAdmin } from "../../contexts/admin-context"
import { useToast } from "../../hooks/use-toast"
import { useState } from "react"

interface OrderDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  orderId: string | null
}

export function OrderDetailsDialog({ open, onOpenChange, orderId }: OrderDetailsDialogProps) {
  const { getOrderById, updateOrderStatus } = useAdmin()
  const { toast } = useToast()
  const [isUpdating, setIsUpdating] = useState(false)
  const order = orderId ? getOrderById(orderId) : null

  if (!order) return null

  const handleStatusUpdate = async (newStatus: string) => {
    if (!orderId) return
    
    console.log(`Order Details Dialog: Updating order ${orderId} status to ${newStatus}`);
    setIsUpdating(true)
    try {
      await updateOrderStatus(orderId, newStatus as any)
      console.log(`Order Details Dialog: Order status updated successfully`);
      toast({
        title: "Order Status Updated",
        description: `Order status has been updated to ${newStatus.toLowerCase()}.`,
      })
    } catch (error) {
      console.error(`Order Details Dialog: Failed to update order status:`, error);
      toast({
        title: "Update Failed",
        description: `Failed to update order status: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Order Details - {order.id}</DialogTitle>
          <DialogDescription>Complete order information and payment details</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Order Status</p>
                <Badge
                  variant={getStatusColor(order.status)}
                  className="mt-1"
                >
                  {order.status}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground mb-2">Update Status</p>
                <Select
                  value={order.status}
                  onValueChange={handleStatusUpdate}
                  disabled={isUpdating}
                >
                  <SelectTrigger className="w-32">
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
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Order Date</p>
              <p className="font-medium">{order.date}</p>
            </div>
          </div>

          <Separator />

          {/* Customer Information */}
          <div>
            <h3 className="font-semibold mb-3">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Name</p>
                <p className="font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{order.customerEmail}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="font-medium">{order.customerPhone}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Customer ID</p>
                <p className="font-medium">{order.customerId}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Shipping Address */}
          <div>
            <h3 className="font-semibold mb-3">Shipping Address</h3>
            <div className="text-sm space-y-1">
              <p className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
              <p>{order.shippingAddress.street}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
              <p className="text-muted-foreground">Phone: {order.shippingAddress.phoneNumber}</p>
            </div>
          </div>

          {/* Billing Address */}
          {order.billingAddress && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold mb-3">Billing Address</h3>
                <div className="text-sm space-y-1">
                  <p className="font-medium">{order.billingAddress.firstName} {order.billingAddress.lastName}</p>
                  <p>{order.billingAddress.street}</p>
                  <p>
                    {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zipCode}
                  </p>
                  <p>{order.billingAddress.country}</p>
                  <p className="text-muted-foreground">Phone: {order.billingAddress.phoneNumber}</p>
                </div>
              </div>
            </>
          )}

          <Separator />

          {/* Payment Information */}
          <div>
            <h3 className="font-semibold mb-3">Payment Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Payment Method</p>
                <Badge variant="outline" className="mt-1">
                  {order.paymentMethod.toUpperCase()}
                </Badge>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Payment Status</p>
                <Badge variant={order.paymentStatus === "paid" ? "default" : "secondary"} className="mt-1">
                  {order.paymentStatus}
                </Badge>
              </div>
              {order.payment && (
                <>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment ID</p>
                    <p className="font-medium text-sm">{order.payment.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Payment Date</p>
                    <p className="font-medium text-sm">
                      {new Date(order.payment.paymentDate).toLocaleDateString()}
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <div>
            <h3 className="font-semibold mb-3">Order Items</h3>
            <div className="space-y-3">
              {order.items.map((item, index) => (
                <div key={item.id || index} className="flex justify-between items-start border rounded-lg p-3">
                  <div className="flex gap-3">
                    {item.productImage && (
                      <img 
                        src={item.productImage} 
                        alt={item.productName}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div>
                      <p className="font-medium">{item.productName}</p>
                      <p className="text-sm text-muted-foreground">Product ID: {item.productId}</p>
                      <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                      <p className="text-sm text-muted-foreground">Unit Price: ₹{item.unitPrice.toFixed(2)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{item.totalPrice.toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Order Summary */}
          <div>
            <h3 className="font-semibold mb-3">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <p className="text-muted-foreground">Subtotal</p>
                <p>₹{order.subtotal.toFixed(2)}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-muted-foreground">Shipping</p>
                <p>₹{order.shipping.toFixed(2)}</p>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-base">
                <p>Total</p>
                <p>₹{order.total.toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
