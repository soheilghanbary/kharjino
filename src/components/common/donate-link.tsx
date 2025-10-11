import Link from 'next/link'
import { Label } from '../ui/label'

export const DonateLink = () => (
  <div className="grid gap-2">
    <Label>لینک حمایت مالی</Label>
    <Link
      href={'https://daramet.com/soly'}
      target={'_blank'}
      className="flex w-full items-center justify-center rounded-full bg-primary p-2 text-primary-foreground text-sm shadow-md dark:bg-blue-600"
    >
      <span className="w-full rounded-[inherit] bg-white/15 p-3 text-center dark:text-white">
        daramet.com/soly
      </span>
    </Link>
  </div>
)
