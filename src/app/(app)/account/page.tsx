import { Fragment } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { UserDetails } from './components/user-details'

export default function AccountPage() {
  return (
    <Fragment>
      <AppHeader title="ویرایش حساب کاربری" />
      <UserDetails />
    </Fragment>
  )
}
