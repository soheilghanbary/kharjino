import { notFound } from 'next/navigation'
import { Fragment, Suspense } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { Spinner } from '@/components/ui/spinner'
import { api } from '@/rpc/orpc.client'
import { UploadAvatar } from './components/upload-avatar'
import { UserForm } from './components/user-form'

const UserDetails = async () => {
  const user = await api.user.get()
  if (!user) return notFound()
  return (
    <div className="grid gap-4">
      <div className="-mx-4 h-1.5 bg-muted"></div>
      <UploadAvatar initialImage={user.image!} />
      <div className="-mx-4 h-1.5 bg-muted"></div>
      <UserForm
        initialValues={{
          name: user.name,
          phone: user.phone!,
          birthday: user.birthday!,
        }}
      />
    </div>
  )
}

export default async function AccountPage() {
  return (
    <Fragment>
      <AppHeader title="ویرایش حساب کاربری" />
      <Suspense fallback={<Spinner className="mx-auto my-16" />}>
        <UserDetails />
      </Suspense>
    </Fragment>
  )
}
