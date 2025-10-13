import Link from 'next/link'
import { Fragment, Suspense } from 'react'
import { UserIcon } from '@/assets/icons/bulk'
import { buttonVariants } from '@/components/ui/button'
import { RecentExpenseList } from './components/recent-expense-list'
import { Summary, SummarySkeleton } from './components/summary'
import { TransactionChart } from './components/transaction-chart'
import { TransactionLoading } from './components/transaction-loading'
import { UserInfo, UserInfoSkeleton } from './components/user-info'

export default function Page() {
  return (
    <Fragment>
      <header className="-m-4 h-50 rounded-b-2xl bg-primary/85 p-4 dark:bg-blue-500/80">
        <div className="flex items-center justify-between gap-2">
          <Suspense fallback={<UserInfoSkeleton />}>
            <UserInfo />
          </Suspense>
          <Link
            href={'/profile'}
            className={buttonVariants({ variant: 'secondary', size: 'icon' })}
          >
            <UserIcon className="size-5 text-primary" />
          </Link>
        </div>
        <Suspense fallback={<SummarySkeleton />}>
          <Summary />
        </Suspense>
      </header>
      <section className="mt-28">
        <TransactionChart />
        <div className="mb-3 flex items-center justify-between">
          <p className="font-medium text-sm">تراکنش های اخیر</p>
          <Link
            href={'/transactions'}
            className="p-1 text-muted-foreground text-tiny hover:text-primary sm:text-xs"
          >
            مشاهده همه
          </Link>
        </div>
        <Suspense fallback={<TransactionLoading />}>
          <RecentExpenseList />
        </Suspense>
      </section>
    </Fragment>
  )
}
