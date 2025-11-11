import Link from 'next/link'
import { buttonVariants } from '@/shared/components/ui/button'

export default function NotFoundPage() {
  return (
    <div className="my-32 space-y-4 text-center">
      <h1 className="text-center font-black text-2xl">
        متاسفانه صفحه ای یافت نشد
      </h1>
      <Link href="/" className={buttonVariants({ variant: 'secondary' })}>
        برگشت به خانه
      </Link>
    </div>
  )
}
