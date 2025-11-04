import { format } from 'date-fns-jalali'
import Image from 'next/image'
import { Fragment } from 'react'
import { Logo } from '@/assets/icons'
import { AppHeader } from '@/components/layouts/app-header'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/config/site'

const Signature = () => (
  <Image
    src="/signature.png"
    alt="Vercel"
    width={100}
    height={50}
    quality={100}
    sizes="100vw"
    className="mx-auto mt-6 dark:invert"
  />
)

export default function About() {
  return (
    <Fragment>
      <AppHeader title="درباره ما" />
      <Separator className="my-4" />
      <Logo className="mx-auto size-24 text-primary" />
      <div className="space-y-2 text-xs/6">
        <p className="text-center">
          خرجینو یه اپلیکیشن برای مدیریت مخارج های شما میباشد که با استفاده از
          جدید ترین تکنولوژی های وب ساخته شده و کاملا متن باز یا (Open Source)
          میباشد.
        </p>
        <div className="space-y-2 text-center font-medium">
          <p>
            ورژن: {siteConfig.v} <br />
            <a target="_blank" href="https://soheilghanbary.ir" rel="noopener">
              توسعه دهنده: سهیل قنبری
            </a>{' '}
            <br />
            آخرین بروزرسانی: {format(new Date(), 'd MMMM yyyy')}
          </p>
          <Signature />
        </div>
      </div>
    </Fragment>
  )
}
