import { redirect } from 'next/navigation'
import { Logo } from '@/assets/icons'
import { Separator } from '@/components/ui/separator'
import { getUserId } from '@/lib/helpers'
import OAuthButton from '../components/oauth-button'

export default async function Page() {
  const userId = await getUserId()
  if (userId) return redirect('/home')
  return (
    <section className="container-sm min-h-svh bg-background p-4">
      <Logo className="mx-auto mt-20 size-24 text-primary" />
      <h1 className="text-center font-bold text-3xl text-primary">خرجینو</h1>
      <h3 className="my-4 text-center font-medium">ورود به حساب کاربری</h3>
      <div className="grid gap-4">
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-xs">ورود با</span>
          <Separator className="flex-1" />
        </div>
        <OAuthButton />
      </div>
    </section>
  )
}
