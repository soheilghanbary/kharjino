import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function dataURLtoFile(dataUrl: string, filename: string): File {
  const arr = dataUrl.split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/png'
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new File([u8arr], filename, { type: mime })
}

export const colorMap = {
  amber: 'bg-amber-100 dark:bg-amber-200 text-amber-950',
  teal: 'bg-teal-100 dark:bg-teal-200 text-teal-950',
  purple: 'bg-purple-100 dark:bg-purple-200 text-purple-950',
  black: 'bg-black text-white dark:bg-black text-white',
  blue: 'bg-blue-100 dark:bg-blue-200 text-blue-950',
  rose: 'bg-rose-100 dark:bg-rose-200 text-rose-950',
  orange: 'bg-orange-100 dark:bg-orange-200 text-orange-950',
  default: 'bg-card text-foreground dark:bg-card text-foreground border-border',
}

export type ColorKey = keyof typeof colorMap
