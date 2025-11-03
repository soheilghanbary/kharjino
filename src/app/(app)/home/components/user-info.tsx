'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { format } from 'date-fns-jalali'
import Image from 'next/image'
import { Skeleton } from '@/components/ui/skeleton'
import { client } from '@/rpc/orpc.client'

const today = format(new Date(), 'EEEE / d MMMM yyyy')

export const UserInfoSkeleton = () => (
  <div className="flex items-center gap-2">
    <Skeleton className="size-9 rounded-full bg-muted/30" />
    <div className="grow">
      <p className="text-tiny text-white/85 sm:text-xs">{today}</p>
      <Skeleton className="h-4 w-20 rounded-full bg-muted/30 sm:h-5" />
    </div>
  </div>
)

export function UserInfo() {
  const { data: user } = useSuspenseQuery(
    client.user.get.queryOptions({
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    })
  )
  return (
    <div className="flex items-center gap-2">
      <figure className="relative size-9 rounded-full bg-muted/30">
        <Image
          fill
          alt={String(user?.name)}
          src={String(user?.image) ?? '/avatar.png'}
          className="rounded-[inherit] object-cover"
        />
      </figure>
      <div className="grow">
        <p className="text-tiny text-white/85 sm:text-xs">{today}</p>
        <h2 className="font-medium text-white text-xs sm:text-sm">
          {String(user?.name)}
        </h2>
      </div>
    </div>
  )
}
