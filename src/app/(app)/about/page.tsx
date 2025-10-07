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
          ما اینجاییم تا صدور فاکتور رو برای کسب‌وکارهای کوچک، فریلنسرها و
          فروشگاه‌های آنلاین ساده، سریع و قابل‌اعتماد کنیم. این وب‌اپلیکیشن مینیمال
          با طراحی واکنش‌گرا و امکانات کاربردی مثل آرشیو فاکتورها، گزارش فروش، و
          قالب‌های اختصاصی، تجربه‌ای روان و حرفه‌ای برای مدیریت مالی فراهم می‌کنه.
          هدف ما ساخت ابزاریه که بدون پیچیدگی، همیشه کنار شما باشه.
        </p>
        <p>بنیان گذار: سهیل قنبری</p>
        <p>نسخه: 0.8.9</p>
      </div>
      <div className="mt-4 flex justify-center">
        <Button className="rounded-full" asChild>
          <a href="tel:09199973120">پشتیبانی: 09199973120</a>
        </Button>
      </div>
    </Fragment>
  )
}
