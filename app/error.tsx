"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { AlertTriangle, RefreshCw, Home, Bug } from "lucide-react"

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error)
  }, [error])

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <AlertTriangle className="h-10 w-10 text-red-600" />
          </div>
        </div>

        {/* Error Content */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-red-600 mb-2">
              Oops! Something went wrong
            </CardTitle>
            <CardDescription className="text-lg">
              We encountered an unexpected error. Don't worry, our team has been notified.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-start gap-3">
                <Bug className="h-5 w-5 text-red-600 mt-0.5 shrink-0" />
                <div className="text-sm">
                  <p className="font-medium text-red-800 mb-1">Error Details:</p>
                  <p className="text-red-700 font-mono text-xs break-all">
                    {error.message || "An unexpected error occurred"}
                  </p>
                  {error.digest && (
                    <p className="text-red-600 text-xs mt-2">
                      Error ID: {error.digest}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-3">What you can do:</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button 
                  onClick={reset}
                  variant="outline" 
                  className="w-full"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Try Again
                </Button>
                
                <Link href="/">
                  <Button variant="outline" className="w-full">
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <div className="bg-white/50 rounded-lg p-6">
          <h3 className="font-semibold text-gray-800 mb-4">Need Help?</h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
            <Link href="/contact" className="text-[#8B5A4A] hover:underline">
              Contact Support
            </Link>
            <span className="hidden sm:inline text-gray-400">•</span>
            <Link href="/about" className="text-[#8B5A4A] hover:underline">
              About Studio Miradia
            </Link>
            <span className="hidden sm:inline text-gray-400">•</span>
            <Link href="/shop" className="text-[#8B5A4A] hover:underline">
              Browse Products
            </Link>
          </div>
        </div>

        {/* Technical Info for Development */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
              Technical Details (Development Mode)
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
              {JSON.stringify({
                message: error.message,
                stack: error.stack,
                digest: error.digest,
                name: error.name
              }, null, 2)}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
