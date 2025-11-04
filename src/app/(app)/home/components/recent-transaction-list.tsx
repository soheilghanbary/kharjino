'use client'
import { useGetRecentTransactions } from '../hooks'
import { EmptyTransactionList } from './empty-transaction'
import { TransactionCard } from './transaction-card'

export function RecentTransactionList() {
  const { data: transactions } = useGetRecentTransactions()
  if (transactions.length === 0) return <EmptyTransactionList />
  return (
    <div className="grid gap-2">
      {transactions.map((t) => (
        <TransactionCard key={t.id} {...t} />
      ))}
    </div>
  )
}
