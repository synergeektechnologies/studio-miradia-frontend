"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { useAdmin } from "../../contexts/admin-context"
import { useToast } from "../../hooks/use-toast"

interface CustomerDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  customer: any
}

export function CustomerDialog({ open, onOpenChange, customer }: CustomerDialogProps) {
  const { addCustomer, updateCustomer } = useAdmin()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    password: "",
    totalOrders: "0",
    totalSpent: "0",
  })

  useEffect(() => {
    if (customer) {
      setFormData({
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
        password: "", // Don't populate password for existing customers
        totalOrders: customer.totalOrders.toString(),
        totalSpent: customer.totalSpent.toString(),
      })
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        totalOrders: "0",
        totalSpent: "0",
      })
    }
  }, [customer, open])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const customerData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        password: formData.password,
        totalOrders: Number.parseInt(formData.totalOrders),
        totalSpent: Number.parseFloat(formData.totalSpent),
        joinedDate: customer?.joinedDate || new Date().toISOString().split("T")[0],
      }

      if (customer) {
        await updateCustomer(customer.id, customerData)
        toast({
          title: "Customer updated",
          description: "The customer has been successfully updated.",
        })
      } else {
        await addCustomer(customerData)
        toast({
          title: "Customer added",
          description: "The customer has been successfully added.",
        })
      }

      onOpenChange(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save customer. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{customer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
          <DialogDescription>
            {customer ? "Update customer information" : "Add a new customer to your database"}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
              />
            </div>
            {!customer && (
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="totalOrders">Total Orders</Label>
                <Input
                  id="totalOrders"
                  type="number"
                  value={formData.totalOrders}
                  onChange={(e) => setFormData({ ...formData, totalOrders: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="totalSpent">Total Spent (₹)</Label>
                <Input
                  id="totalSpent"
                  type="number"
                  step="0.01"
                  value={formData.totalSpent}
                  onChange={(e) => setFormData({ ...formData, totalSpent: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">{customer ? "Update" : "Add"} Customer</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
