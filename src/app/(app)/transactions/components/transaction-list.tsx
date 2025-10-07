import { api } from '@/rpc/orpc.client'
import { TransactionCard } from '../../home/components/transaction-card'

export const TransactionList = async () => {
  const transactions = await api.transaction.getAll()
  return (
    <div className="fade-up-transition grid gap-2">
      {transactions.map((t) => (
        <TransactionCard key={t.id} {...t} />
      ))}
    </div>
  )
}
