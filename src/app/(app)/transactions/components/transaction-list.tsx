'use client'
import { useQuery } from '@tanstack/react-query'
import type { TransactionType } from 'generated/prisma'
import { useQueryState } from 'nuqs'
import { Spinner } from '@/components/ui/spinner'
import { client } from '@/rpc/orpc.client'
import { EmptyTransactionList } from '../../home/components/empty-transaction'
import { TransactionCard } from '../../home/components/transaction-card'

export const TransactionList = () => {
  const [t] = useQueryState('type')
  const { data: transactions, isPending } = useQuery(
    client.transaction.getAll.queryOptions({
      input: t as TransactionType | null,
    })
  )
  if (isPending) return <Spinner className="mx-auto my-8" />
  if (!transactions) return <EmptyTransactionList />
  return (
    <div className="fade-up-transition grid gap-2">
      {transactions.map((t) => (
        <TransactionCard key={t.id} {...t} />
      ))}
    </div>
  )
}
