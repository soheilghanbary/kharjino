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
      <hr className="-mx-4" />
      <UploadAvatar initialImage={user.image!} />
      <hr className="-mx-4" />
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
      <Suspense fallback={<Spinner className="mx-auto my-16 size-5" />}>
        <UserDetails />
      </Suspense>
    </Fragment>
  )
}
