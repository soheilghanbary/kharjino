'use client'
import { TrendingDown, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import { PlusIcon } from '@/assets/icons/bulk'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { useGetSummary } from '../hooks'

const NewTransactionButton = () => (
  <Button size={'sm'} className="w-full text-base" asChild>
    <Link href={'/new'}>
      <PlusIcon className="size-5" />
      تراکنش جدید
    </Link>
  </Button>
)

export const SummarySkeleton = () => (
  <div className="z-10 mt-4 rounded-3xl bg-card p-5 shadow-lg">
    <div>
      <p className="mb-1 text-center text-muted-foreground text-xs">
        موجودی کل
      </p>
      <Skeleton className="mx-auto h-8 w-40 rounded-full" />
    </div>
    <div className="my-4 grid grid-cols-2 items-center gap-12">
      <div className="space-y-1">
        <p className="flex items-center gap-1.5 text-destructive text-xs">
          <span className="flex items-center justify-center rounded-sm bg-destructive/20 p-1">
            <TrendingDown className="size-4" />
          </span>
          هزینه
        </p>
        <Skeleton className="h-5 w-28 rounded-full" />
      </div>
      <div className="space-y-1">
        <p className="flex items-center gap-1.5 text-success text-xs">
          <span className="flex items-center justify-center rounded-sm bg-success/20 p-1">
            <TrendingUp className="size-4" />
          </span>
          درآمد
        </p>
        <Skeleton className="h-5 w-28 rounded-full" />
      </div>
    </div>
    <NewTransactionButton />
  </div>
)

export const Summary = () => {
  const { data } = useGetSummary()
  const { balance, expense, income } = data
  return (
    <div className="z-10 mt-4 rounded-3xl bg-card p-5 shadow-lg">
      <div>
        <p className="mb-1 text-center text-muted-foreground text-xs">
          موجودی کل
        </p>
        <p className="text-center font-bold text-2xl text-primary">
          {balance.toLocaleString('fa-IR')} تومان
        </p>
      </div>
      <div className="my-4 grid grid-cols-2 items-center gap-12">
        <div className="space-y-1">
          <p className="flex items-center gap-1.5 text-destructive text-xs">
            <span className="flex items-center justify-center rounded-sm bg-destructive/20 p-1">
              <TrendingDown className="size-4" />
            </span>
            هزینه
          </p>
          <p className="font-medium text-muted-foreground text-sm">
            {expense.toLocaleString('fa-IR')} تومان
          </p>
        </div>
        <div className="space-y-1">
          <p className="flex items-center gap-1.5 text-success text-xs">
            <span className="flex items-center justify-center rounded-sm bg-success/20 p-1">
              <TrendingUp className="size-4" />
            </span>
            درآمد
          </p>
          <p className="font-medium text-muted-foreground text-sm">
            {income.toLocaleString('fa-IR')} تومان
          </p>
        </div>
      </div>
      <NewTransactionButton />
    </div>
  )
}
