'use client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { client } from '@/rpc/orpc.client'
import { Button } from '@/shared/components/ui/button'
import { cn } from '@/shared/lib/utils'
import { CategoryListLoading } from './category-list-loading'

const Line = () => (
  <hr className="-mx-4 border-3 border-muted dark:border-card" />
)

const EmptyCategoryList = () => (
  <Button variant="secondary" disabled>
    دسته بندی ایجاد نشده
  </Button>
)

type SectionProps = {
  title: string
  items: Array<{ id: string; name: string; icon: string }>
  loading: boolean
}

function CategorySection({ title, items, loading }: SectionProps) {
  return (
    <section className="grid gap-2">
      <h3 className="font-medium text-sm">{title}</h3>
      {loading ? (
        <CategoryListLoading />
      ) : (
        <div
          className={cn(
            'hidden-scrollbar flex items-center gap-2 pb-2',
            items?.length ? 'overflow-x-scroll' : 'overflow-hidden'
          )}
        >
          {items?.length ? (
            items.map((c) => (
              <Button
                asChild
                key={c.id}
                variant="secondary"
                size="sm"
                className="gap-1"
              >
                <Link href={`/my-categories/${c.id}`}>
                  <span>{c.icon}</span>
                  <span>{c.name}</span>
                </Link>
              </Button>
            ))
          ) : (
            <EmptyCategoryList />
          )}
        </div>
      )}
    </section>
  )
}

export function CategoryList() {
  const { data, isPending } = useQuery(client.category.all.queryOptions())
  return (
    <div className="grid gap-4">
      <CategorySection
        title="دسته هزینه"
        items={data?.expense ?? []}
        loading={isPending}
      />
      <Line />
      <CategorySection
        title="دسته درآمد"
        items={data?.income ?? []}
        loading={isPending}
      />
    </div>
  )
}
