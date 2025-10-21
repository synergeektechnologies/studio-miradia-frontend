"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

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
import { Textarea } from "../ui/textarea"
import { Checkbox } from "../ui/checkbox"
import { useToast } from "../../hooks/use-toast"
import type { Category } from "../../lib/admin-api-client"

// Validation schema
const categorySchema = z.object({
  name: z.string().min(2, "Category name must be at least 2 characters").max(50, "Category name must not exceed 50 characters"),
  description: z.string().max(200, "Description must not exceed 200 characters").optional(),
  active: z.boolean(),
})

type CategoryFormData = z.infer<typeof categorySchema>

// Category interface is imported from admin-api-client

interface CategoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  category: Category | null
  onSave: (data: CategoryFormData) => Promise<void>
}

export function CategoryDialog({ open, onOpenChange, category, onSave }: CategoryDialogProps) {
  const { toast } = useToast()

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
      active: true,
    },
  })

  // Populate form when editing
  useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        description: category.description || "",
        active: category.active,
      })
    } else {
      form.reset({
        name: "",
        description: "",
        active: true,
      })
    }
  }, [category, open, form])

  const onSubmit = async (data: CategoryFormData) => {
    try {
      await onSave(data)
      onOpenChange(false)
      toast({
        title: category ? "Category updated" : "Category created",
        description: category ? "The category has been successfully updated." : "The category has been successfully created.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save category. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Create New Category"}</DialogTitle>
          <DialogDescription>
            {category ? "Update the category information below." : "Add a new category to organize your products."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid gap-4">
            {/* Category Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Category Name *</Label>
              <Input 
                id="name" 
                {...form.register("name")} 
                placeholder="e.g., LILA, AURA, etc."
              />
              {form.formState.errors.name && (
                <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                {...form.register("description")} 
                placeholder="Optional description for this category"
                rows={3}
              />
              {form.formState.errors.description && (
                <p className="text-sm text-red-500">{form.formState.errors.description.message}</p>
              )}
            </div>

            {/* Active Status */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="active"
                checked={form.watch("active")}
                onCheckedChange={(checked) => form.setValue("active", !!checked)}
              />
              <Label htmlFor="active">Active (visible to customers)</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : category ? "Update Category" : "Create Category"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
