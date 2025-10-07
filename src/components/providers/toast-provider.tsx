'use client'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'
import { font } from '@/assets/font'
import { cn } from '@/lib/utils'

export const ToastProvider = () => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position="top-center"
      richColors
      toastOptions={{
        className: cn(font.className, 'sonner'),
      }}
    />
  )
}
