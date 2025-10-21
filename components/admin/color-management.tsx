"use client"

import { useState, useEffect } from "react"
import { Button } from "../ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Badge } from "../ui/badge"
import { ColorDialog } from "./color-dialog"
import { useToast } from "../../hooks/use-toast"
import { Plus, Edit, Trash2 } from "lucide-react"
import Image from "next/image"
import type { Color } from "../../types/color"
import { fetchColors, deleteColor } from "../../lib/colors"

export function ColorManagement() {
  const [colors, setColors] = useState<Color[]>([])
  const [loading, setLoading] = useState(true)
  const [colorDialogOpen, setColorDialogOpen] = useState(false)
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const { toast } = useToast()

  const loadColors = async () => {
    try {
      setLoading(true)
      const colorsData = await fetchColors()
      setColors(colorsData)
    } catch (error) {
      console.error("Error loading colors:", error)
      toast({
        title: "Error",
        description: "Failed to load colors. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadColors()
  }, [])

  const handleColorSaved = (color: Color) => {
    if (selectedColor) {
      // Update existing color
      setColors(prev => prev.map(c => c.id === color.id ? color : c))
    } else {
      // Add new color
      setColors(prev => [...prev, color])
    }
    setSelectedColor(null)
    setColorDialogOpen(false)
  }

  const handleEditColor = (color: Color) => {
    setSelectedColor(color)
    setColorDialogOpen(true)
  }

  const handleDeleteColor = async (color: Color) => {
    if (!confirm(`Are you sure you want to delete "${color.name}"?`)) {
      return
    }

    try {
      await deleteColor(color.id)
      setColors(prev => prev.filter(c => c.id !== color.id))
      toast({
        title: "Color deleted",
        description: `"${color.name}" has been deleted successfully.`,
      })
    } catch (error) {
      console.error("Error deleting color:", error)
      toast({
        title: "Error",
        description: "Failed to delete color. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleAddColor = () => {
    setSelectedColor(null)
    setColorDialogOpen(true)
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Colors</CardTitle>
          <CardDescription>Manage your color inventory</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading colors...</div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Colors</CardTitle>
            <CardDescription>Manage your color inventory</CardDescription>
          </div>
          <Button onClick={handleAddColor}>
            <Plus className="w-4 h-4 mr-2" />
            Add Color
          </Button>
        </CardHeader>
        <CardContent>
          {colors.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No colors found. Add your first color to get started.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Preview</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Color Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colors.map((color) => (
                  <TableRow key={color.id}>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {color.imageUrl ? (
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                            <Image
                              src={color.imageUrl}
                              alt={color.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ) : color.colorCode ? (
                          <div
                            className="w-8 h-8 rounded-full border border-gray-200"
                            style={{ backgroundColor: color.colorCode }}
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full border border-gray-200 bg-gray-100" />
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{color.name}</TableCell>
                    <TableCell>
                      {color.colorCode ? (
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-sm">{color.colorCode}</span>
                          <div
                            className="w-4 h-4 rounded border border-gray-200"
                            style={{ backgroundColor: color.colorCode }}
                          />
                        </div>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge variant={color.active ? "default" : "secondary"}>
                        {color.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEditColor(color)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteColor(color)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <ColorDialog
        open={colorDialogOpen}
        onOpenChange={setColorDialogOpen}
        color={selectedColor}
        onColorSaved={handleColorSaved}
      />
    </>
  )
}
