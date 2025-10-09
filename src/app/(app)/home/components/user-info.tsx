'use client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns-jalali'
import { UserCircle2Icon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { client } from '@/rpc/orpc.client'

export function UserInfo() {
  const { data: user, isPending } = useQuery(client.user.get.queryOptions())
  return (
    <div className="flex items-center gap-2">
      {!isPending ? (
        <figure className="relative size-9 rounded-full">
          <Image
            fill
            alt={String(user?.name)}
            src={String(user?.image) ?? '/avatar.png'}
            className="rounded-[inherit] object-cover"
          />
        </figure>
      ) : (
        <Skeleton className="size-9 rounded-full bg-muted/30" />
      )}
      <div className="grow">
        <p className="text-tiny text-white/85 sm:text-xs">
          {format(new Date(), 'd MMMM yyyy')}
        </p>
        {isPending ? (
          <Skeleton className="h-4 w-20 rounded-full bg-muted/30 sm:h-5" />
        ) : (
          <h2 className="font-medium text-white text-xs sm:text-sm">
            {String(user?.name)}
          </h2>
        )}
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
