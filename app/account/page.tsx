"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "../../contexts/auth-context"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Separator } from "../../components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../components/ui/tabs"
import { Package, Heart, User, LogOut, Settings, MapPin } from "lucide-react"
import Link from "next/link"
import { ProfileEditDialog } from "../../components/account/profile-edit-dialog"
import { PasswordChangeDialog } from "../../components/account/password-change-dialog"
import { OrderHistory } from "../../components/account/order-history"
import { AddressManagement } from "../../components/account/address-management"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Account - Studio Miradia",
  description: "Manage your Studio Miradia account, view order history, update profile information, and access your wishlist. Your personal luxury fashion dashboard.",
  keywords: "Studio Miradia account, customer dashboard, order history, profile management, luxury fashion account",
  openGraph: {
    title: "My Account - Studio Miradia",
    description: "Manage your Studio Miradia account, view order history, update profile information, and access your wishlist.",
    type: "website",
  },
}

export default function AccountPage() {
  const { user, logout, isLoading } = useAuth()
  const router = useRouter()
  const [refreshKey, setRefreshKey] = useState(0)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }
  }, [user, isLoading, router])

  const handleProfileUpdate = () => {
    setRefreshKey(prev => prev + 1)
  }

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <img src="/logo.png" alt="Studio Miradia Logo" className="w-12 h-12"/>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="font-serif text-4xl mb-2">My Account</h1>
          <p className="text-muted-foreground">
            Welcome back, {user.firstName && user.lastName 
              ? `${user.firstName} ${user.lastName}` 
              : user.name || user.email}
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="addresses" className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <User className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Profile Information</CardTitle>
                        <CardDescription>Manage your account details</CardDescription>
                      </div>
                    </div>
                    <ProfileEditDialog onProfileUpdate={handleProfileUpdate} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Full Name</p>
                    <p className="font-medium">
                      {user.firstName && user.lastName 
                        ? `${user.firstName} ${user.lastName}` 
                        : user.name || 'Not provided'}
                    </p>
                  </div>
                  <Separator />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium">{user.email}</p>
                  </div>
                  <Separator />
                  {user.phoneNumber && (
                    <>
                      <div>
                        <p className="text-sm text-muted-foreground">Phone Number</p>
                        <p className="font-medium">{user.phoneNumber}</p>
                      </div>
                      <Separator />
                    </>
                  )}
                  <div>
                    <p className="text-sm text-muted-foreground">Account Type</p>
                    <p className="font-medium capitalize">{user.role}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Heart className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Wishlist</CardTitle>
                      <CardDescription>Your saved items</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Link href="/wishlist">
                    <Button variant="outline" className="w-full bg-transparent">
                      View Wishlist
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <OrderHistory />
          </TabsContent>

          <TabsContent value="addresses" className="space-y-6">
            <AddressManagement />
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <Settings className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Password & Security</CardTitle>
                        <CardDescription>Update your password</CardDescription>
                      </div>
                    </div>
                    <PasswordChangeDialog />
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Keep your account secure by regularly updating your password.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-destructive/10 rounded-lg">
                      <LogOut className="h-5 w-5 text-destructive" />
                    </div>
                    <div>
                      <CardTitle>Sign Out</CardTitle>
                      <CardDescription>Log out of your account</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="destructive" className="w-full" onClick={logout}>
                    Sign Out
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
