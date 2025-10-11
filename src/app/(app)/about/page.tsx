import { format } from 'date-fns-jalali'
import Image from 'next/image'
import { Fragment } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/config/site'

const Signature = () => (
  <Image
    src="/signature.png"
    alt="Vercel"
    width={80}
    height={20}
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
      <div className="space-y-2 text-sm/7">
        <p>
          خرجینو یه اپلیکیشن برای مدیریت مخارج های شما میباشد که با استفاده از
          جدید ترین تکنولوژی های وب ساخته شده و کاملا متن باز یا (Open Source)
          میباشد.
        </p>
        <div className="space-y-2 text-center font-medium">
          <p>ورژن: {siteConfig.v}</p>
          <p>
            <a target="_blank" href="https://soheilghanbary.ir" rel="noopener">
              توسعه دهنده: سهیل قنبری
            </a>
          </p>
          <p>آخرین بروزرسانی: {format(new Date(), 'd MMMM yyyy')}</p>
          <Signature />
        </div>
      </div>
    </Fragment>
  )
}
