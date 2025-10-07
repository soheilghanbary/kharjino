import { notFound } from 'next/navigation'
import { Fragment, Suspense } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { Spinner } from '@/components/ui/spinner'
import { api } from '@/rpc/orpc.client'
import { TransactionForm } from '../../new/components/transaction-form'

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
      <Suspense fallback={<Spinner className="mx-auto my-16" />}>
        <TransactionDetail id={id} />
      </Suspense>
    </Fragment>
  )
}
