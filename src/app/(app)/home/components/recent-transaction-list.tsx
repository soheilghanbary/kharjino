'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { client } from '@/rpc/orpc.client'
import { EmptyTransactionList } from './empty-transaction'
import { TransactionCard } from './transaction-card'

export function RecentTransactionList() {
  const { data: transactions } = useSuspenseQuery(
    client.transaction.recent.queryOptions()
  )

  if (transactions.length === 0) return <EmptyTransactionList />

  return (
    <div className="grid gap-2">
      {transactions.map((t) => (
        <TransactionCard key={t.id} {...t} />
      ))}
    </div>
  )
}
