import { Fragment } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { TransactionForm } from './components/transaction-form'

export default function NewPage() {
  return (
    <Fragment>
      <AppHeader title="تراکنش جدید" />
      <TransactionForm mode="add" />
    </Fragment>
  )
}
