"use client"

import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Badge } from "../../components/ui/badge"
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Key,
  Shield
} from "lucide-react"
import Link from "next/link"

export default function TestForgotPasswordPage() {
  const testScenarios = [
    {
      title: "Valid Email",
      description: "Test with a valid email address",
      email: "test@example.com",
      expected: "Should receive reset email"
    },
    {
      title: "Invalid Email Format",
      description: "Test with invalid email format",
      email: "invalid-email",
      expected: "Should show validation error"
    },
    {
      title: "Non-existent Email",
      description: "Test with email not in database",
      email: "nonexistent@example.com",
      expected: "Should still show success (security)"
    },
    {
      title: "Empty Email",
      description: "Test with empty email field",
      email: "",
      expected: "Should show required field error"
    }
  ]

  const resetScenarios = [
    {
      title: "Valid Token",
      description: "Test with valid reset token",
      url: "/reset-password?token=valid-token-123",
      expected: "Should show reset form"
    },
    {
      title: "Invalid Token",
      description: "Test with invalid/expired token",
      url: "/reset-password?token=invalid-token",
      expected: "Should show invalid token message"
    },
    {
      title: "No Token",
      description: "Test without token parameter",
      url: "/reset-password",
      expected: "Should show invalid token message"
    }
  ]

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              Forgot Password Test
            </CardTitle>
            <CardDescription>
              Test the complete forgot password flow and functionality
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            
            {/* Forgot Password Page Test */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Forgot Password Page
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link href="/forgot-password">
                  <Button variant="outline" className="w-full justify-between">
                    <span>Visit Forgot Password Page</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button variant="outline" className="w-full justify-between">
                    <span>Check Login Page Link</span>
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Test Scenarios */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                Email Test Scenarios
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {testScenarios.map((scenario, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{scenario.title}</h4>
                        <Badge variant="outline">Test {index + 1}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{scenario.description}</p>
                      <div className="text-xs text-gray-500">
                        <strong>Email:</strong> {scenario.email || "Empty"}
                      </div>
                      <div className="text-xs text-green-600">
                        <strong>Expected:</strong> {scenario.expected}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* Reset Password Test Scenarios */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Reset Password Test Scenarios
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {resetScenarios.map((scenario, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{scenario.title}</h4>
                        <Badge variant="outline">Test {index + 1}</Badge>
                      </div>
                      <p className="text-sm text-gray-600">{scenario.description}</p>
                      <div className="text-xs text-gray-500">
                        <strong>URL:</strong> {scenario.url}
                      </div>
                      <div className="text-xs text-green-600">
                        <strong>Expected:</strong> {scenario.expected}
                      </div>
                      <Link href={scenario.url}>
                        <Button size="sm" variant="outline" className="w-full mt-2">
                          Test This Scenario
                        </Button>
                      </Link>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* API Endpoints */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                API Endpoints
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <h4 className="font-medium mb-2">POST /api/auth/forgot-password</h4>
                  <p className="text-sm text-gray-600 mb-2">Request password reset email</p>
                  <div className="text-xs text-gray-500">
                    <strong>Body:</strong> {"{ email: string }"}
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">GET /api/auth/validate-reset-token</h4>
                  <p className="text-sm text-gray-600 mb-2">Validate reset token</p>
                  <div className="text-xs text-gray-500">
                    <strong>Query:</strong> {"?token=string"}
                  </div>
                </Card>
                <Card className="p-4">
                  <h4 className="font-medium mb-2">POST /api/auth/reset-password</h4>
                  <p className="text-sm text-gray-600 mb-2">Reset password with token</p>
                  <div className="text-xs text-gray-500">
                    <strong>Body:</strong> {"{ token: string, password: string }"}
                  </div>
                </Card>
              </div>
            </div>

            {/* Testing Instructions */}
            <div className="p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <h4 className="font-semibold mb-2">Testing Instructions:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm">
                <li>Visit the forgot password page and test email submission</li>
                <li>Check that validation works for invalid emails</li>
                <li>Test the reset password page with different token scenarios</li>
                <li>Verify that all links and navigation work correctly</li>
                <li>Test the complete flow: forgot password → email → reset password → login</li>
                <li>Check responsive design on mobile devices</li>
              </ol>
            </div>

            {/* Features Checklist */}
            <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
              <h4 className="font-semibold mb-2">Features Implemented:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Studio Miradia branded design</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Email validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Token validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Password strength validation</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Responsive design</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Error handling</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Loading states</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Success states</span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Link href="/">
                <Button className="bg-[#8B5A4A] hover:bg-[#8B5A4A]/90">
                  Return to Homepage
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
