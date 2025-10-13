'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { TransactionType } from 'generated/prisma'
import { useQueryState } from 'nuqs'
import { client } from '@/rpc/orpc.client'
import { EmptyTransactionList } from '../../home/components/empty-transaction'
import { TransactionCard } from '../../home/components/transaction-card'

export const TransactionList = () => {
  const [t] = useQueryState('type')
  const [sort] = useQueryState('sort', {
    defaultValue: 'newest',
  })
  const { data: transactions } = useSuspenseQuery(
    client.transaction.getAll.queryOptions({
      input: {
        sort: sort as 'newest' | 'highest' | 'lowest',
        type: t as TransactionType | null,
      },
    })
  )
  // transaction list is empty
  if (transactions.length === 0) return <EmptyTransactionList />

  return (
    <div className="fade-up-transition grid gap-2">
      {transactions.map((t) => (
        <TransactionCard key={t.id} {...t} />
      ))}
    </div>
  )
}
