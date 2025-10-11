'use client'
import { useQuery } from '@tanstack/react-query'
import { client } from '@/rpc/orpc.client'
import { TransactionCard } from './transaction-card'
import { TransactionLoading } from './transaction-loading'

export function RecentExpenseList() {
  const { data: transactions, isPending } = useQuery(
    client.transaction.recent.queryOptions()
  )
  if (isPending) return <TransactionLoading />
  return (
    <div className="fade-up-transition grid gap-2">
      {transactions?.map((t) => (
        <TransactionCard key={t.id} {...t} />
      ))}
    </div>
  )
}
