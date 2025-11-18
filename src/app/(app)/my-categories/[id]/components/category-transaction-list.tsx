'use client'
import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useEffect, useRef } from 'react'
import { EmptyTransactionList } from '@/features/transaction'
import { TransactionCard } from '@/features/transaction/components/transaction-card'
import { TransactionLoading } from '@/features/transaction/components/transaction-loading'
import { api } from '@/server/lib/orpc.client'

export function CategoryTransactionList({
  categoryId,
}: {
  categoryId: string
}) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useSuspenseInfiniteQuery({
      queryKey: ['category-transactions', categoryId],
      queryFn: async ({ pageParam = 0 }) =>
        await api.transaction.getByCategory({
          categoryId,
          page: pageParam,
        }),
      initialPageParam: 0,
      getNextPageParam: (lastPage) => lastPage.nextPageParam,
    })

  const loaderRef = useRef<HTMLDivElement | null>(null)

  // Infinite scroll
  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) fetchNextPage()
      },
      { rootMargin: '200px' }
    )

    const el = loaderRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
      observer.disconnect()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  const pages = data?.pages ?? []
  const firstPage = pages[0]?.data ?? []

  if (firstPage.length === 0) return <EmptyTransactionList />

  return (
    <div className="fade-up-transition grid gap-2">
      {pages.map((page) =>
        page.data.map((tr) => <TransactionCard key={tr.id} {...tr} />)
      )}
      {hasNextPage && (
        <div ref={loaderRef}>
          {isFetchingNextPage && <TransactionLoading count={4} />}
        </div>
      )}
    </div>
  )
}
