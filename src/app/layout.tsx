import '@/styles/app.css'
import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'
import { font } from '@/assets/font'
import Providers from '@/components/providers'
import { siteConfig } from '@/config/site'

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s - ${siteConfig.title}`,
  },
  description: siteConfig.description,
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="theme-color" href="#2D68FF" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        />
      </head>
      <body className={`${font.className} antialiased`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
