import { Skeleton } from '@/shared/components/ui/skeleton'
import { cn } from '@/shared/lib/utils'

type Props = {
  className?: string
  count?: number
}

export function TransactionLoading({ className, count }: Props) {
  return (
    <div className={cn('grid gap-2', className)}>
      {Array.from({ length: count || 5 }).map((_, i) => (
        <div
          key={i}
          className="flex min-h-[63px] items-center gap-2 rounded-lg bg-muted/40 p-3 dark:bg-card"
        >
          <Skeleton className="size-9 rounded-full" />
          <div className="grid grow grid-cols-2 gap-4 gap-y-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="mr-auto h-4 w-20" />
            <Skeleton className="h-4 w-18" />
            <Skeleton className="mr-auto h-4 w-16" />
          </div>
        </div>
      ))}
    </div>
  )
}
