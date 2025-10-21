"use client"

import { useState } from "react"
import { Button } from "../../components/ui/button"
import { loadRazorpayScript, openRazorpayCheckout } from "../../lib/razorpay"
import { useToast } from "../../hooks/use-toast"

export default function TestRazorpayPage() {
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()

  const handleTestPayment = async () => {
    setIsLoading(true)
    
    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript()
      if (!scriptLoaded) {
        throw new Error("Failed to load Razorpay script")
      }

      // Test payment with a dummy order ID
      const testOrderId = "order_test_123"
      const testAmount = 100 // ₹1.00
      
      openRazorpayCheckout(
        testOrderId,
        testAmount,
        "INR",
        "rzp_test_RTgl5rlU6SDz1Q",
        "Studio Miradia",
        "Test Payment",
        {
          name: "Test User",
          email: "test@example.com",
          contact: "9876543210"
        },
        (response: any) => {
          console.log("Payment successful:", response)
          toast({
            title: "Payment Successful!",
            description: `Payment ID: ${response.razorpay_payment_id}`,
          })
        },
        (error: any) => {
          console.log("Payment error callback:", error)
          
          if (error === null) {
            // Modal was dismissed by user
            toast({
              title: "Payment Cancelled",
              description: "Payment was cancelled. You can try again when ready.",
              variant: "destructive"
            })
          } else if (error && (error.code || error.description || error.message)) {
            // Real payment error
            toast({
              title: "Payment Failed",
              description: `Payment failed: ${error.description || error.message || 'Unknown error'}.`,
              variant: "destructive"
            })
          } else {
            // Generic error
            toast({
              title: "Payment Error",
              description: "There was an error processing your payment.",
              variant: "destructive"
            })
          }
        }
      )
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: "Failed to initialize payment.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="font-serif text-3xl font-bold">Razorpay Integration Test</h1>
        <p className="text-muted-foreground">
          This page tests the Razorpay integration without backend dependencies.
        </p>
        <Button 
          onClick={handleTestPayment}
          disabled={isLoading}
          className="bg-[#006D77] hover:bg-[#005761] text-white"
        >
          {isLoading ? "Loading..." : "Test Payment (₹1.00)"}
        </Button>
        <div className="text-sm text-muted-foreground">
          <p>Razorpay Key ID: rzp_test_RTgl5rlU6SDz1Q</p>
          <p>Note: This is a test payment. Use Razorpay test cards.</p>
          <p>Test Card: 4111 1111 1111 1111 (Any future date, any CVV)</p>
        </div>
      </div>
    </main>
  )
}
