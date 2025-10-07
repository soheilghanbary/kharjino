import { format } from 'date-fns-jalali'
import type { User } from 'generated/prisma'
import { UserCircle2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export function UserInfo(user: User) {
  return (
    <div className="flex items-center gap-2">
      <figure className="relative size-9 rounded-full">
        <Image
          fill
          alt={user.name}
          src={user.image ?? '/avatar.png'}
          className="rounded-[inherit]"
        />
      </figure>
      <div className="grow">
        <p className="text-tiny text-white/85 sm:text-xs">
          {format(new Date(), 'd MMMM yyyy')}
        </p>
        <h2 className="font-medium text-white text-xs sm:text-sm">
          سلام {user.name}
        </h2>
      </div>
      <Link
        href={'/profile'}
        className={buttonVariants({ variant: 'secondary', size: 'icon' })}
      >
        <UserCircle2Icon className="size-5 text-primary" />
      </Link>
    </div>
  )
}
