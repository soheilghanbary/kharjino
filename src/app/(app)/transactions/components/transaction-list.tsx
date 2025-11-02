'use client'

import { useSuspenseInfiniteQuery } from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { useEffect, useRef } from 'react'
import type { TransactionType } from '@/db/schema'
import { api } from '@/rpc/orpc.client'
import { EmptyTransactionList } from '../../home/components/empty-transaction'
import { TransactionCard } from '../../home/components/transaction-card'
import { TransactionLoading } from '../../home/components/transaction-loading'

export const TransactionList = () => {
  const [t] = useQueryState('type')
  const [sort] = useQueryState('sort', {
    defaultValue: 'newest',
  })

  const {
    data: transactions,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useSuspenseInfiniteQuery({
    queryKey: ['transactions', t, sort],
    queryFn: async ({ pageParam = 0 }) =>
      await api.transaction.getAll({
        type: t as TransactionType,
        sort: sort as 'newest' | 'highest' | 'lowest',
        page: pageParam,
      }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPageParam,
  })

  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0]
        if (target.isIntersecting) fetchNextPage()
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 0,
      }
    )

    const el = loaderRef.current
    if (el) observer.observe(el)

    return () => {
      if (el) observer.unobserve(el)
      observer.disconnect()
    }
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])

  if (!transactions?.pages?.length || transactions.pages[0].data.length === 0)
    return <EmptyTransactionList />

  return (
    <div className="fade-up-transition grid gap-2">
      {transactions.pages.map((page) =>
        page.data.map((tr) => <TransactionCard key={tr.id} {...tr} />)
      )}
      {hasNextPage && (
        <div ref={loaderRef}>
          {isFetchingNextPage && <TransactionLoading count={5} />}
        </div>
      )}
    </div>
  )
}
