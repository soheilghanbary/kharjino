import { api } from '@/rpc/orpc.client'
import { EmptyTransactionList } from './empty-transaction'
import { TransactionCard } from './transaction-card'

export async function RecentExpenseList() {
  const transactions = await api.transaction.recent()
  if (!transactions.length) return <EmptyTransactionList />

  return (
    <div className="grid gap-2">
      {transactions.map((t) => (
        <TransactionCard key={t.id} {...t} />
      ))}
    </div>
  )
}
