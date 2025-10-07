import Link from 'next/link'
import { Suspense } from 'react'
import { ModeToggle } from '@/components/common/mode-toggle'
import { MessageCSR } from '@/components/message-csr'
import { MessageSSR } from '@/components/message-ssr'
import { buttonVariants } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

const GITHUB_REPO_URL = 'https://github.com/soheilghanbary/nrpc'
const COPYRIGHT_TEXT = `© ${new Date().getFullYear()} NRPC Stack ${siteConfig.v} - Soheil Ghanbary`

export default () => {
  return (
    <div className="grid h-svh w-svw place-items-center">
      <div className="grid animate-duration-700 animate-fade-up gap-4 p-4 sm:grid-cols-2">
        <section className="flex max-w-sm flex-col justify-evenly gap-3 rounded-xl border p-4 shadow-xs">
          <div className="flex items-center justify-center">
            <ModeToggle />
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-left font-black text-3xl text-transparent">
              {siteConfig.title} <span className="text-foreground">🚀</span>
            </h1>
            <p className="text-foreground/85 text-xs">
              {siteConfig.description}
            </p>
            <hr className="mt-2" />
            <Link
              href={GITHUB_REPO_URL}
              target="_blank"
              className={cn(buttonVariants(), 'mt-4 w-full')}
            >
              Get Started
            </Link>
          </div>
        </section>
        <section className="flex w-full max-w-sm flex-col justify-around rounded-xl border p-4 shadow-xs">
          <MessageCSR />
          <Suspense fallback={<Spinner className="mx-auto my-4" />}>
            <MessageSSR />
          </Suspense>
        </section>
      </div>
      <footer className="mt-auto w-full border-t p-4">
        <p className="text-center text-foreground/85 text-xs">
          {COPYRIGHT_TEXT}
        </p>
      </footer>
    </div>
  )
}
