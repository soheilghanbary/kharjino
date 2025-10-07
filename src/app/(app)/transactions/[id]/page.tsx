import { notFound } from 'next/navigation'
import { AppHeader } from '@/components/layouts/app-header'
import { api } from '@/rpc/orpc.client'
import { TransactionForm } from '../../new/components/transaction-form'

type PageProps = {
  params: Promise<{ id: string }>
}

export default async function TransactionPage({ params }: PageProps) {
  const { id } = await params
  const transaction = await api.transaction.get(id)
  if (!transaction) return notFound()
  return (
    <>
      <AppHeader title="ویرایش تراکنش" />
      <TransactionForm mode="edit" transaction={transaction} />
    </>
  )
}
