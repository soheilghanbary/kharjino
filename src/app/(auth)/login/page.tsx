import Link from 'next/link'
import { redirect } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { TextField } from '@/components/ui/text-field'
import { getUserId } from '@/lib/helpers'
import OAuthButton from '../components/oauth-button'

export default async function Page() {
  const userId = await getUserId()
  if (userId) return redirect('/home')
  return (
    <section className="container-sm min-h-svh bg-background p-4">
      <h1 className="mt-20 text-center font-bold text-3xl text-primary">
        خرجینو
      </h1>
      <h3 className="my-4 text-center font-medium">ورود به حساب کاربری</h3>
      <form className="grid gap-4">
        <TextField label="ایمیل" />
        <TextField label="رمز عبور" />
        <Link href={'/signup'} className="text-left text-primary text-xs">
          ثبت نام نکرده اید؟
        </Link>
        <Button>وارد شوید</Button>
        <div className="flex items-center gap-3">
          <Separator className="flex-1" />
          <span className="text-muted-foreground text-xs">ورود با</span>
          <Separator className="flex-1" />
        </div>
        <OAuthButton />
      </form>
    </section>
  )
}
