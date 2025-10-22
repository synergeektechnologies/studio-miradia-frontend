"use client"

import type React from "react"

import { useCart } from "../../contexts/cart-context"
import { useAuth } from "../../contexts/auth-context"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { ShoppingBag } from "lucide-react"
import { useState } from "react"
import { useToast } from "../../hooks/use-toast"
import { getProductDisplayImage } from "../../lib/utils"
import { type OrderCreationRequest } from "../../lib/orders"
import { 
  loadRazorpayScript, 
  createRazorpayOrder, 
  verifyRazorpayPayment, 
  openRazorpayCheckout,
  type RazorpayOrderRequest,
  type RazorpayPaymentVerificationRequest 
} from "../../lib/razorpay"


export default function CheckoutPage() {
  const { cart, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "India"
  })

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 2500 ? 0 : 200
  const total = subtotal + shipping

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    setIsSubmitting(true)

    try {
      // Split full name into first and last name
      const nameParts = formData.fullName.trim().split(' ')
      const firstName = nameParts[0] || ""
      const lastName = nameParts.slice(1).join(' ') || ""

      const orderData: OrderCreationRequest = {
        customerEmail: formData.email,
        items: cart.map(item => ({
          productId: item.id,
          quantity: item.quantity
        })),
        shippingAddress: {
          firstName,
          lastName,
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.pincode,
          country: formData.country,
          phoneNumber: formData.phone
        },
        payment: {
          amount: total,
          method: "razorpay",
          status: "pending" // Will be updated after payment
        }
      }

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        throw new Error("Failed to create order")
      }

      const createdOrder = await response.json()

      // Process Razorpay payment
      await handleRazorpayPayment(createdOrder)
    } catch (error) {
      console.error("Error creating order:", error)
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleRazorpayPayment = async (order: any) => {
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay script")
      }

      // Create Razorpay order
      const razorpayOrderData: RazorpayOrderRequest = {
        amount: total,
        currency: "INR",
        receipt: `order_${order.id}`,
        notes: `Order ID: ${order.id}`
      }

      const razorpayOrder = await createRazorpayOrder(razorpayOrderData)

      // Open Razorpay checkout
      openRazorpayCheckout(
        razorpayOrder.id,
        total,
        "INR",
        process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "",
        "Studio Miradia",
        `Payment for Order #${order.id}`,
        {
          name: formData.fullName,
          email: formData.email,
          contact: formData.phone
        },
        async (response: any) => {
          // Payment successful
          try {
            const verificationData: RazorpayPaymentVerificationRequest = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              orderId: order.id
            }

            // Verify payment with backend
            await verifyRazorpayPayment(verificationData)
            console.log('Payment verification completed successfully')

            toast({
              title: "Payment Successful!",
              description: `Order #${order.id} has been placed and payment completed. You will receive a confirmation email shortly.`,
            })

            clearCart()
            router.push("/")
          } catch (error) {
            console.error("Payment verification failed:", error)
            toast({
              title: "Payment Verification Failed",
              description: "Your payment was successful but verification failed. Please contact support.",
              variant: "destructive"
            })
          }
        },
        (error: any) => {
          // Payment failed or cancelled
          console.log("Payment error callback:", error)
          
          // Check if it's a real error or just modal dismissal
          if (error === null) {
            // Modal was dismissed by user (no actual error)
            console.log("Payment cancelled by user")
            toast({
              title: "Payment Cancelled",
              description: "Payment was cancelled. You can try again when ready.",
              variant: "destructive"
            })
          } else if (error && (error.code || error.description || error.message)) {
            // Real payment error
            console.error("Payment failed with error:", error)
            toast({
              title: "Payment Failed",
              description: `Payment failed: ${error.description || error.message || 'Unknown error'}. Please try again.`,
              variant: "destructive"
            })
          } else {
            // Generic error or initialization failure
            console.error("Payment error:", error)
            toast({
              title: "Payment Error",
              description: "There was an error processing your payment. Please try again.",
              variant: "destructive"
            })
          }
        }
      )
    } catch (error) {
      console.error("Razorpay payment error:", error)
      toast({
        title: "Payment Error",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive"
      })
    }
  }

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="h-24 w-24 mx-auto mb-6 text-muted-foreground" />
          <h1 className="font-serif text-3xl font-bold mb-4">Your Cart is Empty</h1>
          <p className="text-muted-foreground mb-8">Add some beautiful pieces to your cart before checkout</p>
          <Link href="/shop">
            <Button size="lg" className="bg-[#006D77] hover:bg-[#005761] text-white">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24">
        <h1 className="font-serif text-3xl md:text-4xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Shipping Information */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h2 className="font-serif text-2xl font-semibold mb-6">Shipping Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input 
                      id="fullName" 
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="John Doe" 
                      required 
                      className="mt-1.5" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john@example.com" 
                      required 
                      className="mt-1.5" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input 
                      id="phone" 
                      type="tel" 
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+91 98765 43210" 
                      required 
                      className="mt-1.5" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input 
                      id="address" 
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="123 Main Street" 
                      required 
                      className="mt-1.5" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input 
                      id="city" 
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="Coimbatore" 
                      required 
                      className="mt-1.5" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input 
                      id="state" 
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="Tamil Nadu" 
                      required 
                      className="mt-1.5" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input 
                      id="pincode" 
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="641042" 
                      required 
                      className="mt-1.5" 
                    />
                  </div>
                  <div>
                    <Label htmlFor="country">Country *</Label>
                    <Input 
                      id="country" 
                      value={formData.country}
                      onChange={handleInputChange}
                      placeholder="India" 
                      required 
                      className="mt-1.5" 
                    />
                  </div>
                </div>
              </div>

            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-lg p-6 sticky top-24">
                <h2 className="font-serif text-2xl font-semibold mb-6">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.selectedColorId || 'no-color'}`} className="flex gap-3">
                      <div className="relative w-16 h-20 shrink-0 rounded-md overflow-hidden bg-secondary">
                        <Image 
                          src={getProductDisplayImage(item)} 
                          alt={item.name} 
                          fill 
                          className="object-cover" 
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{item.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                          {item.selectedColorId && item.colors && (
                            <div className="flex items-center gap-1">
                              {(() => {
                                const selectedColor = item.colors.find(color => color.id === item.selectedColorId)
                                return selectedColor ? (
                                  <>
                                    {selectedColor.imageUrl ? (
                                      <div className="relative w-3 h-3 rounded-full overflow-hidden border border-gray-200">
                                        <Image
                                          src={selectedColor.imageUrl}
                                          alt={selectedColor.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                    ) : selectedColor.colorCode ? (
                                      <div
                                        className="w-3 h-3 rounded-full border border-gray-200"
                                        style={{ backgroundColor: selectedColor.colorCode }}
                                      />
                                    ) : (
                                      <div className="w-3 h-3 rounded-full border border-gray-200 bg-gray-100" />
                                    )}
                                    <span className="text-xs text-gray-600">{selectedColor.name}</span>
                                  </>
                                ) : null
                              })()}
                            </div>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-[#8B5A4A] mt-1">
                          ₹{(item.price * item.quantity).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="font-bold text-xl text-[#8B5A4A]">₹{total.toLocaleString()}</span>
                  </div>
                </div>

                <Button 
                  type="submit" 
                  size="lg" 
                  className="w-full bg-[#006D77] hover:bg-[#005761] text-white mb-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Proceed to Payment"}
                </Button>

                <Link href="/cart">
                  <Button type="button" size="lg" variant="outline" className="w-full bg-transparent">
                    Back to Cart
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  )
}
