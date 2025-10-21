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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Checkbox } from "../ui/checkbox"
import { useAdmin } from "../../contexts/admin-context"
import { getActiveCategories } from "../../lib/admin-api-client"
import { useToast } from "../../hooks/use-toast"
import { Upload, Trash2, X } from "lucide-react"
import Image from "next/image"
import type { Product } from "../../types/product"
import type { Color } from "../../types/color"
import { uploadMultipleProductImages, removeProductImage } from "../../lib/admin-api-client"
import { fetchActiveColors, updateProductColors } from "../../lib/colors"

// ✅ Validation schema
const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  image: z.string().optional(),
  category: z.string().min(1, "Category is required"),
  inStock: z.boolean(),
  limitedEdition: z.boolean(),
  stockQuantity: z.string().optional(),
})

type ProductFormData = z.infer<typeof productSchema>

interface ProductDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product | null
}

export function ProductDialog({ open, onOpenChange, product }: ProductDialogProps) {
  const { addProduct, updateProduct, uploadProductImage } = useAdmin()
  const { toast } = useToast()

  const [uploadMethod, setUploadMethod] = useState<"url" | "upload">("upload")
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [imagePreviews, setImagePreviews] = useState<string[]>([])
  const [uploading, setUploading] = useState(false)
  const [availableCategories, setAvailableCategories] = useState<Array<{id: string, name: string}>>([])
  const [availableColors, setAvailableColors] = useState<Color[]>([])
  const [selectedColors, setSelectedColors] = useState<string[]>([])

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: "",
      image: "",
      category: "",
      inStock: true,
      limitedEdition: false,
      stockQuantity: "",
    },
  })

  // Load categories and colors when dialog opens
  useEffect(() => {
    if (open) {
      const loadData = async () => {
        try {
          const [categories, colors] = await Promise.all([
            getActiveCategories(),
            fetchActiveColors()
          ])
          setAvailableCategories(categories.map(cat => ({ id: cat.id, name: cat.name })))
          setAvailableColors(colors)
        } catch (error) {
          console.error("Failed to load data:", error)
          // Fallback to hardcoded categories if API fails
          setAvailableCategories([
            { id: "LILA", name: "LILA" },
            { id: "AURA", name: "AURA" }
          ])
          // Set empty colors array as fallback
          setAvailableColors([])
        }
      }
      loadData()
    }
  }, [open])

  // ✅ Populate form when editing
  useEffect(() => {
    if (product) {
      form.reset({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        image: product.image,
        category: product.category,
        inStock: product.inStock,
        limitedEdition: product.limitedEdition || false,
        stockQuantity: product.stockQuantity?.toString() || "",
      })
      setImagePreviews(product.imageUrls || [])
    } else {
      form.reset()
      setImagePreviews([])
    }
    setUploadedFiles([])
  }, [product, open, form])

  // Set selected colors when editing a product
  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColors(product.colors.map(color => color.id))
    } else {
      setSelectedColors([])
    }
  }, [product])

  // ✅ Handle file upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    if (files.length === 0) return

    const validFiles: File[] = []
    const validPreviews: string[] = []

    for (const file of files) {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} is larger than 10MB. Please upload smaller images.`,
          variant: "destructive",
        })
        continue
      }
      if (!file.type.startsWith("image/")) {
        toast({
          title: "Invalid file type",
          description: `${file.name} is not an image file. Please upload image files only.`,
          variant: "destructive",
        })
        continue
      }

      validFiles.push(file)
      validPreviews.push(URL.createObjectURL(file))
    }

    if (validFiles.length > 0) {
      setUploadedFiles(prev => [...prev, ...validFiles])
      setImagePreviews(prev => [...prev, ...validPreviews])
    }
  }

  // ✅ Clear all images
  const clearAllImages = () => {
    setUploadedFiles([])
    setImagePreviews([])
    form.setValue("image", "")
  }

  // ✅ Remove individual image
  const removeImage = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
    setImagePreviews(prev => prev.filter((_, i) => i !== index))
  }

  // ✅ Remove existing product image
  const removeExistingImage = async (imageUrl: string) => {
    if (!product) return
    
    try {
      await removeProductImage(product.id, imageUrl)
      setImagePreviews(prev => prev.filter(url => url !== imageUrl))
      toast({
        title: "Image removed",
        description: "Image has been removed successfully.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to remove image. Please try again.",
        variant: "destructive",
      })
    }
  }

  // Color selection handlers
  const handleColorToggle = (colorId: string) => {
    setSelectedColors(prev => 
      prev.includes(colorId) 
        ? prev.filter(id => id !== colorId)
        : [...prev, colorId]
    )
  }

  // ✅ Submit handler
  const onSubmit = async (data: ProductFormData) => {
    setUploading(true)
    try {
      // Create or update product first
      let savedProduct: Product

      const productData = {
        name: data.name,
        description: data.description || "",
        price: parseFloat(data.price),
        image: data.image || (imagePreviews.length > 0 ? imagePreviews[0] : "") || "",
        category: data.category,
        inStock: data.inStock,
        limitedEdition: data.limitedEdition,
        stockQuantity: parseInt(data.stockQuantity || "0"),
      }

      if (product) {
        savedProduct = await updateProduct(product.id, productData)
        toast({ title: "Product updated", description: "Product updated successfully." })
      } else {
        savedProduct = await addProduct(productData)
        toast({ title: "Product added", description: "New product added successfully." })
      }

      // Then upload images if files selected
      if (uploadedFiles.length > 0) {
        const updatedProduct = await uploadMultipleProductImages(savedProduct.id, uploadedFiles)
        setImagePreviews(updatedProduct.imageUrls || [])
        toast({
          title: "Images uploaded",
          description: `${uploadedFiles.length} image(s) uploaded successfully.`,
        })
      }

      // Update product colors
      if (selectedColors.length > 0) {
        await updateProductColors(savedProduct.id, selectedColors)
        toast({
          title: "Colors updated",
          description: "Product colors have been updated successfully.",
        })
      }

      onOpenChange(false)
    } catch (err) {
      console.error(err)
      toast({
        title: "Error",
        description: "Failed to save product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product ? "Edit Product" : "Add New Product"}</DialogTitle>
          <DialogDescription>
            {product ? "Update product details below" : "Add a new product to your inventory"}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4">
            {/* Product Name */}
            <div className="grid gap-2">
              <Label htmlFor="name">Product Name *</Label>
              <Input id="name" {...form.register("name")} />
            </div>

            {/* Description */}
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Input id="description" {...form.register("description")} />
            </div>

            {/* Price Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input id="price" type="number" step="0.01" {...form.register("price")} />
              </div>
            </div>

            {/* Stock */}
            <div className="grid gap-2">
              <Label htmlFor="stockQuantity">Stock Quantity</Label>
              <Input id="stockQuantity" type="number" {...form.register("stockQuantity")} />
            </div>

            {/* Color Selection */}
            <div className="grid gap-2">
              <Label>Available Colors</Label>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {availableColors.map((color) => {
                    const isSelected = selectedColors.includes(color.id)
                    return (
                      <button
                        key={color.id}
                        type="button"
                        className={`flex items-center space-x-2 px-3 py-2 rounded-lg border-2 transition-all duration-200 ${
                          isSelected
                            ? 'border-primary bg-primary/10 text-primary'
                            : 'border-gray-200 hover:border-gray-300 bg-white'
                        }`}
                        onClick={() => handleColorToggle(color.id)}
                      >
                        {color.imageUrl ? (
                          <div className="relative w-5 h-5 rounded-full overflow-hidden border border-gray-200">
                            <Image
                              src={color.imageUrl}
                              alt={color.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : color.colorCode ? (
                          <div
                            className="w-5 h-5 rounded-full border border-gray-200"
                            style={{ backgroundColor: color.colorCode }}
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-gray-200 bg-gray-100" />
                        )}
                        <span className="text-sm font-medium">{color.name}</span>
                        {isSelected && (
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        )}
                      </button>
                    )
                  })}
                </div>
                {selectedColors.length > 0 && (
                  <div className="mt-2 p-2 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-600">
                      Selected colors: {selectedColors.length}
                    </p>
                  </div>
                )}
                {availableColors.length === 0 && (
                  <p className="text-sm text-muted-foreground">No colors available. Add colors in the Colors section first.</p>
                )}
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="grid gap-2">
              <Label>Product Images</Label>

              <div className="flex gap-2 mb-2">
                <Button
                  type="button"
                  variant={uploadMethod === "upload" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUploadMethod("upload")}
                >
                  Upload Multiple
                </Button>
                <Button
                  type="button"
                  variant={uploadMethod === "url" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUploadMethod("url")}
                >
                  Image URL
                </Button>
              </div>

              {uploadMethod === "upload" ? (
                <div className="space-y-2">
                  <div className="border-2 border-dashed border-border rounded-lg p-4 text-center hover:border-primary transition-colors">
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">Click to upload multiple images or drag & drop</p>
                      <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB each</p>
                    </label>
                  </div>

                  {imagePreviews.length > 0 && (
                    <div className="mt-2">
                      <div className="flex justify-between items-center mb-2">
                        <p className="text-sm text-muted-foreground">{imagePreviews.length} image(s) selected</p>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={clearAllImages}
                        >
                          Clear All
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {imagePreviews.map((preview, index) => (
                          <div key={index} className="relative w-full h-32 rounded-lg overflow-hidden border">
                            {preview.startsWith("/uploads") ? (
                              <Image src={`${process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080'}${preview}`} alt={`Preview ${index + 1}`} fill className="object-cover" />
                            ) : (
                              <Image src={preview} alt={`Preview ${index + 1}`} fill className="object-cover" />
                            )}
                            <Button
                              type="button"
                              size="icon"
                              variant="destructive"
                              className="absolute top-1 right-1 h-6 w-6"
                              onClick={() => removeImage(index)}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Input
                  placeholder="https://example.com/image.jpg"
                  {...form.register("image")}
                  onChange={(e) => {
                    form.setValue("image", e.target.value)
                    if (e.target.value) {
                      setImagePreviews([e.target.value])
                    }
                  }}
                />
              )}
            </div>

            {/* Category */}
            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={form.watch("category")}
                onValueChange={(value) => form.setValue("category", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {availableCategories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Stock + Limited Edition */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="inStock"
                checked={form.watch("inStock")}
                onCheckedChange={(checked) => form.setValue("inStock", !!checked)}
              />
              <Label htmlFor="inStock">In Stock</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="limitedEdition"
                checked={form.watch("limitedEdition")}
                onCheckedChange={(checked) => form.setValue("limitedEdition", !!checked)}
              />
              <Label htmlFor="limitedEdition">Limited Edition</Label>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={uploading}>
              Cancel
            </Button>
            <Button type="submit" disabled={uploading}>
              {uploading ? "Saving..." : product ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}