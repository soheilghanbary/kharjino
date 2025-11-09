import { Fragment } from 'react'
import { UserDetails } from '@/features/account'
import { AppHeader } from '@/shared/components/layouts/app-header'

export default function AccountPage() {
  return (
    <Fragment>
      <AppHeader title="ویرایش حساب کاربری" />
      <UserDetails />
    </Fragment>
  )
}
