import { Skeleton } from '@/components/ui/skeleton'

export function CategoryListLoading() {
  return (
    <div className="hidden-scrollbar -mx-4 flex items-center gap-2 overflow-x-scroll pb-2">
      {Array.from({ length: 10 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-10 min-w-24 rounded-md first:mr-4 last:ml-4"
        />
      ))}
    </div>
  )
}
