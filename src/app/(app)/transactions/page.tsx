import { Fragment, Suspense } from 'react'
import {
  TransactionFilter,
  TransactionList,
  TransactionLoading,
  TransactionTypeTab,
} from '@/features/transaction'
import { AppHeader } from '@/shared/components/layouts/app-header'

export default async function TransactionsPage() {
  return (
    <Fragment>
      <AppHeader
        title="تراکنش ها"
        leftChild={
          <Suspense>
            <TransactionFilter />
          </Suspense>
        }
      />
      <Suspense>
        <TransactionTypeTab type="all" />
      </Suspense>
      <Suspense fallback={<TransactionLoading count={10} />}>
        <TransactionList />
      </Suspense>
    </Fragment>
  )
}
