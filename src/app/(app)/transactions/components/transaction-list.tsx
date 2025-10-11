'use client'
import { useQuery } from '@tanstack/react-query'
import type { TransactionType } from 'generated/prisma'
import { useQueryState } from 'nuqs'
import { client } from '@/rpc/orpc.client'
import { EmptyTransactionList } from '../../home/components/empty-transaction'
import { TransactionCard } from '../../home/components/transaction-card'
import { TransactionLoading } from '../../home/components/transaction-loading'

export const TransactionList = () => {
  const [t] = useQueryState('type')
  const [sort] = useQueryState('sort', {
    defaultValue: 'newest',
  })
  const { data: transactions, isPending } = useQuery(
    client.transaction.getAll.queryOptions({
      input: {
        sort: sort as 'newest' | 'highest' | 'lowest',
        type: t as TransactionType | null,
      },
    })
  )
  if (isPending) return <TransactionLoading />
  if (transactions?.length === 0) return <EmptyTransactionList />
  return (
    <div className="fade-up-transition grid gap-2">
      {transactions?.map((t) => (
        <TransactionCard key={t.id} {...t} />
      ))}
    </div>
  )
}
