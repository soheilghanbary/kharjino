import Link from 'next/link'
import { Fragment } from 'react'
import { RecentExpenseList } from './components/recent-expense-list'
import { Summary } from './components/summary'
import { TransactionChart } from './components/transaction-chart'
import { UserInfo } from './components/user-info'

export default function Page() {
  return (
    <Fragment>
      <header className="-m-4 h-50 rounded-b-2xl bg-primary/85 p-4 dark:bg-blue-500/80">
        <UserInfo />
        <Summary />
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
        <RecentExpenseList />
      </section>
    </Fragment>
  )
}
