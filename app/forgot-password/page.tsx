"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useToast } from "../../hooks/use-toast"
import { Mail, ArrowLeft, Heart, Sparkles, CheckCircle } from "lucide-react"
import Image from "next/image"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      if (response.ok) {
        setIsEmailSent(true)
        toast({
          title: "Reset email sent!",
          description: "Please check your email (and spam folder) for password reset instructions.",
        })
      } else {
        const errorData = await response.json()
        toast({
          title: "Error",
          description: errorData.error || "Failed to send reset email. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Forgot password error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#8B5A4A]/5 via-white to-[#8B5A4A]/10 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto">
          {/* Heart decoration */}
          <div className="relative mb-8 text-center">
            <div className="absolute -top-4 -left-4 text-[#8B5A4A]/20">
              <Heart className="h-8 w-8 rotate-12" />
            </div>
            <div className="absolute -top-2 -right-6 text-[#8B5A4A]/15">
              <Heart className="h-6 w-6 -rotate-12" />
            </div>
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif text-[#8B5A4A]">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-lg">
                We've sent password reset instructions to your email address.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Please check your email inbox and follow the instructions to reset your password.
                </p>
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
                  <p className="text-sm text-yellow-800">
                    <strong>📧 Important:</strong> If you don't see the email in your inbox, please check your spam/junk folder. Sometimes reset emails end up there.
                  </p>
                </div>
                <p className="text-sm text-gray-500">
                  Didn't receive the email? Check your spam folder or try again.
                </p>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => setIsEmailSent(false)}
                  variant="outline" 
                  className="w-full"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Send Another Email
                </Button>
                
                <Link href="/login">
                  <Button variant="outline" className="w-full">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Login
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Help section */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Need help? <Link href="/contact" className="text-[#8B5A4A] hover:underline">Contact Support</Link>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-[#8B5A4A]/5 via-white to-[#8B5A4A]/10 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto">
        {/* Heart decoration */}
        <div className="relative mb-8 text-center">
          <div className="absolute -top-4 -left-4 text-[#8B5A4A]/20">
            <Heart className="h-8 w-8 rotate-12" />
          </div>
          <div className="absolute -top-2 -right-6 text-[#8B5A4A]/15">
            <Heart className="h-6 w-6 -rotate-12" />
          </div>
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 text-[#8B5A4A]/10">
            <Sparkles className="h-4 w-4 rotate-45" />
          </div>
        </div>

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-serif text-[#8B5A4A]">
              Forgot Password?
            </CardTitle>
            <CardDescription className="text-lg">
              No worries! Enter your email address and we'll send you a link to reset your password.
            </CardDescription>
            <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>💡 Tip:</strong> After submitting, please check your spam/junk folder if you don't see the reset email in your inbox.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-[#8B5A4A] hover:bg-[#8B5A4A]/90 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="h-4 w-4 mr-2" />
                    Send Reset Link
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center space-y-3">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Login
                </Button>
              </Link>
              
              <p className="text-sm text-gray-600">
                Remember your password? <Link href="/login" className="text-[#8B5A4A] hover:underline">Sign in</Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Help section */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Need help? <Link href="/contact" className="text-[#8B5A4A] hover:underline">Contact Support</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
