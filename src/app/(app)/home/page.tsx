import Link from 'next/link'
import { Fragment, Suspense } from 'react'
import { Spinner } from '@/components/ui/spinner'
import { RecentExpenseList } from './components/recent-expense-list'
import { Summary } from './components/summary'
import { UserInfo } from './components/user-info'

export default function Page() {
  return (
    <Fragment>
      <header className="-m-4 h-50 rounded-b-2xl bg-primary/85 p-4 dark:bg-blue-600/85">
        <UserInfo />
        <Summary />
      </header>
      <section className="mt-30">
        <div className="mb-3 flex items-center justify-between">
          <p className="font-medium text-sm">تراکنش های اخیر</p>
          <Link
            href={'/transactions'}
            className="text-muted-foreground text-tiny hover:text-primary sm:text-xs"
          >
            مشاهده همه
          </Link>
        </div>
        <Suspense fallback={<Spinner className="mx-auto my-8" />}>
          <RecentExpenseList />
        </Suspense>
      </section>
    </Fragment>
  )
}
