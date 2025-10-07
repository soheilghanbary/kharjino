import { PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { api } from '@/rpc/orpc.client'
import { TransactionCard } from './transaction-card'

const EmptyTransactionList = () => (
  <div className="flex h-48 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-card">
    <p className="font-medium text-sm">هزینه ای ثبت نشده!</p>
    <Button asChild className="h-10 px-10 text-primary" variant={'secondary'}>
      <Link href={'/new'}>
        <PlusCircleIcon />
        تراکنش جدید
      </Link>
    </Button>
  </div>
)

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
