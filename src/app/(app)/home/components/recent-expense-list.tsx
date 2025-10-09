'use client'
import { useQuery } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'
import { client } from '@/rpc/orpc.client'
import { TransactionCard } from './transaction-card'

export function RecentExpenseList() {
  const { data: transactions, isPending } = useQuery(
    client.transaction.recent.queryOptions()
  )

  if (isPending) return <Spinner className="mx-auto my-8 size-5" />

  return (
    <div className="fade-up-transition grid gap-2">
      {transactions?.map((t) => (
        <TransactionCard key={t.id} {...t} />
      ))}
    </div>
  )
}
