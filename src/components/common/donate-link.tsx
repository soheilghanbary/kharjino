import Link from 'next/link'
import { StarsPattern } from '@/assets/icons/stars'
import { Label } from '../ui/label'

export const DonateLink = () => (
  <div className="relative grid gap-3">
    <Label>🍵 لینک حمایت مالی</Label>
    <Link
      href="https://daramet.com/soly"
      target="_blank"
      className="relative flex w-full items-center justify-center overflow-hidden rounded-full bg-primary p-2 text-primary-foreground text-sm shadow-md transition-all hover:scale-105 active:scale-90 dark:bg-blue-600"
    >
      <StarsPattern className="pointer-events-none absolute inset-0 size-full opacity-10" />
      <span className="relative z-10 w-full rounded-[inherit] bg-white/15 p-3 text-center dark:text-white">
        daramet.com/soly
      </span>
    </Link>
    <p className="text-center text-muted-foreground text-tiny">
      حمایت شما به رشد و پیشرفت این پروژه متن باز کمک میکنه
    </p>
  </div>
)
