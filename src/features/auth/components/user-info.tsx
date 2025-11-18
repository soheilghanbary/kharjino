'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { format } from 'date-fns-jalali'
import Image from 'next/image'
import { client } from '@/server/lib/orpc.client'
import { Skeleton } from '@/shared/components/ui/skeleton'

const useToday = () => format(new Date(), 'EEEE / d MMMM yyyy')

const UserDate = () => {
  const today = useToday()
  return <p className="text-tiny text-white/85 sm:text-xs">{today}</p>
}

export const UserInfoSkeleton = () => (
  <div className="flex items-center gap-2">
    <Skeleton className="size-9 rounded-full bg-muted/30" />
    <div className="grow">
      <UserDate />
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
      <figure className="relative size-9 overflow-hidden rounded-full bg-muted/30">
        <Image
          fill
          alt={user?.name ?? 'User Avatar'}
          src={user?.image ?? '/avatar.png'}
          className="object-cover"
        />
      </figure>
      <div className="grow">
        <UserDate />
        <h2 className="font-medium text-white text-xs sm:text-sm">
          {user?.name ?? '—'}
        </h2>
      </div>
    </div>
  )
}
