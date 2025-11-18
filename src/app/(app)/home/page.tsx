import Link from 'next/link'
import { Fragment, Suspense } from 'react'
import { UserInfo, UserInfoSkeleton } from '@/features/auth'
import {
  RecentTransactionList,
  TransactionChart,
  TransactionLoading,
  TransactionSummary,
  TransactionSummarySkeleton,
} from '@/features/transaction'
import { UserIcon } from '@/shared/assets/icons/bulk'
import { buttonVariants } from '@/shared/components/ui/button'

export default function Page() {
  return (
    <Fragment>
      <header className="-m-4 h-50 rounded-b-2xl bg-primary p-4 dark:bg-blue-500/80">
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
        <Suspense fallback={<TransactionSummarySkeleton />}>
          <TransactionSummary />
        </Suspense>
      </header>
      <section className="mt-28">
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
          <RecentTransactionList />
        </Suspense>
        <TransactionChart />
      </section>
    </Fragment>
  )
}
