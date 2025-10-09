import Image from 'next/image'
import { Fragment } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { Separator } from '@/components/ui/separator'
import { siteConfig } from '@/config/site'

const Signature = () => (
  <Image
    src="/signature.png"
    alt="Vercel"
    width={72}
    height={16}
    quality={100}
    sizes="100vw"
    className="mx-auto dark:invert"
  />
)

export default function About() {
  return (
    <Fragment>
      <AppHeader title="درباره ما" />
      <Separator className="my-4" />
      <div className="space-y-2 text-center text-sm/7">
        <p>
          خرجینو یه اپلیکیشن برای مدیریت مخارج های شما میباشد که با استفاده از
          جدید ترین تکنولوژی های وب ساخته شده و کاملا متن باز یا (Open Source)
          میباشد.
        </p>
        <p className="font-medium">توسعه دهنده: سهیل قنبری</p>
        <p className="font-medium">پشتیبانی: 09199973120</p>
        <Signature />
        <p className="font-medium">ورژن بتا: {siteConfig.v}5</p>
      </div>
    </Fragment>
  )
}
