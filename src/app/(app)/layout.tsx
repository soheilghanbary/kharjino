import '@/rpc/orpc.server'
import type { PropsWithChildren } from 'react'
import { AppNavigation } from '@/components/layouts/app-navigation'

export default function AppLayout({ children }: PropsWithChildren) {
  return (
    <section className="container-sm min-h-svh bg-background p-4">
      <main className="mb-16">{children}</main>
      <AppNavigation />
    </section>
  )
}
