import { Fragment } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

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
        <p>توسعه دهنده: سهیل قنبری</p>
        <p>soheilghanbary.ir</p>
        <p>پست الکترونیک: soli.ghanbary@gmail.com</p>
        <p>نسخه: 1.0</p>
      </div>
      <div className="mt-4 flex justify-center">
        <Button className="rounded-full" asChild>
          <a href="tel:09199973120">تلفن تماس: 09199973120</a>
        </Button>
      </div>
    </Fragment>
  )
}
