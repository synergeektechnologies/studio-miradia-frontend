"use client"

/**
 * Mobile-optimized toast component that positions notifications at the bottom of the screen
 * on mobile devices with proper safe area support for devices with notches/home indicators.
 * 
 * Features:
 * - Bottom positioning on all screen sizes
 * - Safe area support for modern mobile devices
 * - Full width on mobile, constrained width on desktop
 * - Proper z-index to appear above other content
 */

import { useToast } from '../hooks/use-toast'
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from './ui/toast'

export function MobileToast() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport className="fixed bottom-0 left-0 right-0 z-[100] flex max-h-screen w-full flex-col p-4 pb-safe sm:right-4 sm:left-auto sm:max-w-[420px] md:max-w-[420px]" />
    </ToastProvider>
  )
}
