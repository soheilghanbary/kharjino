import { notFound } from 'next/navigation'
import { Fragment, Suspense } from 'react'
import { TransactionForm } from '@/features/transaction'
import { api } from '@/server/lib/orpc.client'
import { AppHeader } from '@/shared/components/layouts/app-header'
import { Spinner } from '@/shared/components/ui/spinner'

type PageProps = {
  params: Promise<{ id: string }>
}

const TransactionDetail = async ({ id }: { id: string }) => {
  const transaction = await api.transaction.get(id)
  if (!transaction) return notFound()
  return <TransactionForm mode="edit" transaction={transaction} />
}

export default async function TransactionPage({ params }: PageProps) {
  const { id } = await params
  return (
    <Fragment>
      <AppHeader title="ویرایش تراکنش" />
      <Suspense fallback={<Spinner className="mx-auto my-16 text-primary" />}>
        <TransactionDetail id={id} />
      </Suspense>
    </Fragment>
  )
}
