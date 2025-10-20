"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAdmin } from "@/contexts/admin-context"
import { Mail, Calendar, MessageSquare, Phone } from "lucide-react"

interface InquiryDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  inquiryId: string | null
}

export function InquiryDetailsDialog({ open, onOpenChange, inquiryId }: InquiryDetailsDialogProps) {
  const { getInquiryById } = useAdmin()

  const inquiry = inquiryId ? getInquiryById(inquiryId) : null

  if (!inquiry) return null

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Inquiry Details</span>
            <Badge
              variant={
                inquiry.status === "RESPONDED" ? "default" : inquiry.status === "CLOSED" ? "secondary" : "destructive"
              }
            >
              {inquiry.status}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Customer Information */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm">
              <Mail className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">From:</span>
              <span>{inquiry.name}</span>
              <span className="text-muted-foreground">({inquiry.email})</span>
            </div>
            {inquiry.phoneNumber && (
              <div className="flex items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span className="font-medium">Phone:</span>
                <span>{inquiry.phoneNumber}</span>
              </div>
            )}
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Date:</span>
              <span>{formatDate(inquiry.createdAt)}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <MessageSquare className="w-4 h-4 text-muted-foreground" />
              <span className="font-medium">Subject:</span>
              <span>{inquiry.subject}</span>
            </div>
          </div>

          {/* Message */}
          <div className="space-y-2">
            <h3 className="font-semibold">Message</h3>
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm whitespace-pre-wrap">{inquiry.message}</p>
            </div>
          </div>

          {/* Close Button */}
          <div className="flex justify-end">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
