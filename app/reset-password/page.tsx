"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Label } from "../../components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useToast } from "../../hooks/use-toast"
import { Lock, Eye, EyeOff, ArrowLeft, Heart, Sparkles, CheckCircle, AlertCircle } from "lucide-react"

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isValidToken, setIsValidToken] = useState<boolean | null>(null)
  const [token, setToken] = useState<string | null>(null)
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  useEffect(() => {
    const tokenParam = searchParams.get('token')
    if (tokenParam) {
      setToken(tokenParam)
      // Validate token with backend
      validateToken(tokenParam)
    } else {
      setIsValidToken(false)
    }
  }, [searchParams])

  const validateToken = async (token: string) => {
    try {
      const response = await fetch(`/api/auth/validate-reset-token?token=${token}`, {
        method: "GET",
      })

      if (response.ok) {
        setIsValidToken(true)
      } else {
        setIsValidToken(false)
      }
    } catch (error) {
      console.error("Token validation error:", error)
      setIsValidToken(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure both passwords are the same.",
        variant: "destructive",
      })
      return
    }

    if (password.length < 8) {
      toast({
        title: "Password too short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
          token, 
          newPassword: password 
        }),
      })

      if (response.ok) {
        toast({
          title: "Password reset successful!",
          description: "Your password has been updated. You can now sign in with your new password.",
        })
        router.push("/login")
      } else {
        const errorData = await response.json()
        toast({
          title: "Reset failed",
          description: errorData.error || "Failed to reset password. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Reset password error:", error)
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Loading state while validating token
  if (isValidToken === null) {
    return (
      <div className="min-h-screen bg-linear-to-br from-[#8B5A4A]/5 via-white to-[#8B5A4A]/10 flex items-center justify-center px-4">
        <div className="max-w-md mx-auto text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8B5A4A] mx-auto mb-4"></div>
          <p className="text-gray-600">Validating reset link...</p>
        </div>
      </div>
    )
  }

  // Invalid token state
  if (isValidToken === false) {
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
            <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="h-10 w-10 text-red-600" />
            </div>
          </div>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif text-red-600">
                Invalid Reset Link
              </CardTitle>
              <CardDescription className="text-lg">
                This password reset link is invalid or has expired.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  The reset link you clicked is either invalid or has expired. 
                  Please request a new password reset.
                </p>
              </div>

              <div className="space-y-3">
                <Link href="/forgot-password">
                  <Button className="w-full bg-[#8B5A4A] hover:bg-[#8B5A4A]/90 text-white">
                    Request New Reset Link
                  </Button>
                </Link>
                
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

  // Valid token - show reset form
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
              Reset Your Password
            </CardTitle>
            <CardDescription className="text-lg">
              Enter your new password below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your new password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  Password must be at least 8 characters long
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
                  Confirm New Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10"
                    required
                    minLength={8}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
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
                    Updating...
                  </>
                ) : (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Update Password
                  </>
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
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
