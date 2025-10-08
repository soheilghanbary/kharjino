'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { client } from '@/rpc/orpc.client'
import { TransactionCard } from './transaction-card'

export function RecentExpenseList() {
  const { data: transactions } = useSuspenseQuery(
    client.transaction.recent.queryOptions()
  )
  return (
    <div className="fade-up-transition grid gap-2">
      {transactions?.map((t) => (
        <TransactionCard key={t.id} {...t} />
      ))}
    </div>
  )
}
