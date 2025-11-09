import { Fragment } from 'react'
import { TransactionForm } from '@/features/transaction'
import { AppHeader } from '@/shared/components/layouts/app-header'

export default function NewPage() {
  return (
    <Fragment>
      <AppHeader title="تراکنش جدید" />
      <TransactionForm mode="add" />
    </Fragment>
  )
}
