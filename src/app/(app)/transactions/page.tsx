import { FilterIcon, SearchIcon } from 'lucide-react'
import { Fragment, Suspense } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { TransactionList } from './components/transaction-list'

export default function TransactionsPage() {
  return (
    <Fragment>
      <AppHeader
        title="تراکنش ها"
        leftChild={
          <Button variant={'secondary'} size={'icon'}>
            <FilterIcon className="size-5 text-primary" />
          </Button>
        }
      />
      <div className="relative mb-2 flex items-center">
        <Input
          placeholder="جستجو تراکنش"
          className="h-10 border-0 bg-muted/65 ps-9 focus-visible:bg-muted focus-visible:ring-0 dark:bg-card"
        />
        <SearchIcon className="pointer-events-none absolute right-3 size-4 text-muted-foreground" />
      </div>
      <Suspense fallback={<Spinner className="mx-auto my-8" />}>
        <TransactionList />
      </Suspense>
    </Fragment>
  )
}
