import { Fragment, Suspense } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { Spinner } from '@/components/ui/spinner'
import { UserDetails } from './components/user-details'

export default function AccountPage() {
  return (
    <Fragment>
      <AppHeader title="ویرایش حساب کاربری" />
      <Suspense
        fallback={<Spinner className="mx-auto my-16 size-5 text-primary" />}
      >
        <UserDetails />
      </Suspense>
    </Fragment>
  )
}
