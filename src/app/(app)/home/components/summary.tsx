'use client'
import { useQuery } from '@tanstack/react-query'
import { PlusCircleIcon, TrendingDown, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { client } from '@/rpc/orpc.client'

export const Summary = () => {
  const { data, isPending } = useQuery(
    client.transaction.summary.queryOptions()
  )

  return (
    <div className="z-10 mt-4 rounded-3xl bg-card p-5 shadow-lg">
      <div>
        <p className="mb-1 text-center text-muted-foreground text-xs">
          موجودی کل
        </p>
        {isPending ? (
          <Skeleton className="mx-auto h-8 w-40 rounded-full" />
        ) : (
          <p className="text-center font-bold text-2xl text-primary">
            {data?.balance.toLocaleString('fa-IR')} تومان
          </p>
        )}
      </div>
      <div className="my-4 grid grid-cols-2 items-center gap-12">
        <div className="space-y-1">
          <p className="flex items-center gap-1.5 text-destructive text-xs">
            <span className="flex items-center justify-center rounded-sm bg-destructive/20 p-1">
              <TrendingDown className="size-4" />
            </span>
            هزینه
          </p>
          {isPending ? (
            <Skeleton className="h-5 w-28 rounded-full" />
          ) : (
            <p className="font-medium text-muted-foreground text-sm">
              {data?.expense.toLocaleString('fa-IR')} تومان
            </p>
          )}
        </div>
        <div className="space-y-1">
          <p className="flex items-center gap-1.5 text-success text-xs">
            <span className="flex items-center justify-center rounded-sm bg-success/20 p-1">
              <TrendingUp className="size-4" />
            </span>
            درآمد
          </p>
          {isPending ? (
            <Skeleton className="h-5 w-28 rounded-full" />
          ) : (
            <p className="font-medium text-muted-foreground text-sm">
              {data?.income.toLocaleString('fa-IR')} تومان
            </p>
          )}
        </div>
      </div>
      <Button
        size={'sm'}
        variant={'secondary'}
        className="w-full text-base text-primary"
        asChild
      >
        <Link href={'/new'}>
          <PlusCircleIcon />
          افزودن خرج
        </Link>
      </Button>
    </div>
  )
}
