'use client'
import { BackButton } from '@/components/common/back-button'
import {
  CircleCheck,
  CircleIcon,
  Laptop2,
  MoonIcon,
  SunIcon,
} from 'lucide-react'
import { useTheme } from 'next-themes'
import { Fragment } from 'react/jsx-runtime'

export default function ThemePage() {
  const { theme, setTheme } = useTheme()
  const handleThemeChange = (t: string) => setTheme(t)

  return (
    <Fragment>
      <header className="relative mb-4 flex w-full items-center justify-between">
        <BackButton />
        <h1 className="-translate-x-1/2 absolute left-1/2 font-medium text-base">
          تم اپلیکیشن
        </h1>
      </header>
      <div className="grid grid-cols-3 gap-2">
        <button
          type="button"
          onClick={() => handleThemeChange('light')}
          className="relative grid place-items-center gap-2 rounded-lg border bg-card p-3 ring-primary/50 transition-all hover:ring-2 active:scale-95"
        >
          {theme === 'light' ? (
            <CircleCheck className="absolute top-2 right-2 size-3 text-muted-foreground/60" />
          ) : (
            <CircleIcon className="absolute top-2 right-2 size-3 text-muted-foreground/60" />
          )}
          <SunIcon className="size-6" />
          <span className="font-medium text-xs">روشن</span>
        </button>
        <button
          type="button"
          onClick={() => handleThemeChange('dark')}
          className="relative grid place-items-center gap-2 rounded-lg border bg-card p-3 ring-primary/50 transition-all hover:ring-2 active:scale-95"
        >
          {theme === 'dark' ? (
            <CircleCheck className="absolute top-2 right-2 size-3 text-muted-foreground/60" />
          ) : (
            <CircleIcon className="absolute top-2 right-2 size-3 text-muted-foreground/60" />
          )}
          <MoonIcon className="size-6" />
          <span className="font-medium text-xs">تاریک</span>
        </button>
        <button
          type="button"
          onClick={() => handleThemeChange('system')}
          className="relative grid place-items-center gap-2 rounded-lg border bg-card p-3 ring-primary/50 transition-all hover:ring-2 active:scale-95"
        >
          {theme === 'system' ? (
            <CircleCheck className="absolute top-2 right-2 size-3 text-muted-foreground/60" />
          ) : (
            <CircleIcon className="absolute top-2 right-2 size-3 text-muted-foreground/60" />
          )}
          <Laptop2 className="size-6" />
          <span className="font-medium text-xs">سیستم</span>
        </button>
      </div>
    </Fragment>
  )
}
