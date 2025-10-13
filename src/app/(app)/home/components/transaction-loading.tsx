import { Skeleton } from '@/components/ui/skeleton'

export function TransactionLoading() {
  return (
    <div className="fade-up-transition grid gap-2">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex min-h-[63.55px] items-center gap-2 border-b p-3 last:border-0"
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
