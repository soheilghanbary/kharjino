import { Fragment, Suspense } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { TransactionList } from './components/transaction-list'
import { TransactionTypeTab } from './components/transaction-type-tab'

export default async function TransactionsPage() {
  return (
    <Fragment>
      <AppHeader
        title="تراکنش ها"
        // leftChild={
        //   <Button variant={'secondary'} size={'icon'}>
        //     <FilterIcon className="size-5 text-primary" />
        //   </Button>
        // }
      />
      <Suspense>
        <TransactionTypeTab type="all" />
        <TransactionList />
      </Suspense>
    </Fragment>
  )
}
