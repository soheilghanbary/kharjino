import { Fragment, Suspense } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { TransactionLoading } from '../home/components/transaction-loading'
import { TransactionFilter } from './components/transaction-filter'
import { TransactionList } from './components/transaction-list'
import { TransactionTypeTab } from './components/transaction-type-tab'

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
