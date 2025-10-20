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
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { Upload, X } from "lucide-react"
import Image from "next/image"
import type { Color } from "@/types/color"
import { createColor, updateColor, uploadColorImage, deleteColorImage } from "@/lib/colors"

// Validation schema
const colorSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  colorCode: z.string()
    .optional()
    .refine((val) => {
      if (!val || val.trim() === "") return true; // Allow empty
      return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(val);
    }, "Color code must be a valid hex color (e.g., #FF0000 or #F00)"),
  active: z.boolean(),
})

type ColorFormData = z.infer<typeof colorSchema>

interface ColorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  color?: Color | null
  onColorSaved?: (color: Color) => void
}

export function ColorDialog({ open, onOpenChange, color, onColorSaved }: ColorDialogProps) {
  const [uploading, setUploading] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const { toast } = useToast()

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ColorFormData>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      colorCode: "",
      active: true,
    },
  })

  const isActive = watch("active")

  // Reset form when dialog opens/closes or color changes
  useEffect(() => {
    if (open) {
      if (color) {
        reset({
          name: color.name,
          colorCode: color.colorCode || "",
          active: color.active,
        })
        setImagePreview(color.imageUrl || null)
      } else {
        reset({
          name: "",
          colorCode: "",
          active: true,
        })
        setImagePreview(null)
      }
      setUploadedFile(null)
    }
  }, [open, color, reset])

  // Handle image upload
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image must be less than 10MB.",
          variant: "destructive",
        })
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
      setUploadedFile(file)
    }
  }

  // Remove image
  const removeImage = () => {
    setImagePreview(null)
    setUploadedFile(null)
  }

  // Remove existing color image
  const removeExistingImage = async () => {
    if (!color) return
    
    try {
      await deleteColorImage(color.id)
      setImagePreview(null)
      toast({
        title: "Image removed",
        description: "Color image has been removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove image. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Submit handler
  const onSubmit = async (data: ColorFormData) => {
    setUploading(true)
    try {
      let savedColor: Color

      const colorData = {
        name: data.name,
        colorCode: data.colorCode || undefined,
        active: data.active,
      }

      if (color) {
        savedColor = await updateColor(color.id, { ...colorData, id: color.id })
        toast({ title: "Color updated", description: "Color updated successfully." })
      } else {
        savedColor = await createColor(colorData)
        toast({ title: "Color added", description: "New color added successfully." })
      }

      // Upload image if file selected
      if (uploadedFile) {
        const updatedColor = await uploadColorImage(savedColor.id, uploadedFile)
        savedColor = updatedColor
        toast({
          title: "Image uploaded",
          description: "Color image uploaded successfully.",
        })
      }

      onColorSaved?.(savedColor)
    } catch (err) {
      console.error(err)
      toast({
        title: "Error",
        description: "Failed to save color. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{color ? "Edit Color" : "Add New Color"}</DialogTitle>
          <DialogDescription>
            {color ? "Update the color information." : "Add a new color to your inventory."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Color Name *</Label>
            <Input
              id="name"
              {...register("name")}
              placeholder="e.g., Red, Blue, Green"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="colorCode">Color Code (Hex)</Label>
            <Input
              id="colorCode"
              {...register("colorCode")}
              placeholder="e.g., #FF0000"
            />
            {errors.colorCode && (
              <p className="text-sm text-red-500">{errors.colorCode.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Color Image</Label>
            <div className="space-y-2">
              {imagePreview ? (
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-gray-200">
                  <Image
                    src={imagePreview}
                    alt="Color preview"
                    fill
                    className="object-cover"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={color ? removeExistingImage : removeImage}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Label
                    htmlFor="image"
                    className="flex items-center space-x-2 cursor-pointer border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-gray-400"
                  >
                    <Upload className="h-4 w-4" />
                    <span>Upload Color Image</span>
                  </Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="active"
              checked={isActive}
              onCheckedChange={(checked) => setValue("active", checked as boolean)}
            />
            <Label htmlFor="active">Active</Label>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? "Saving..." : color ? "Update Color" : "Add Color"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
