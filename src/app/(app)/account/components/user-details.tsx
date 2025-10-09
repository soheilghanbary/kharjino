import { notFound } from 'next/navigation'
import { api } from '@/rpc/orpc.client'
import { UploadAvatar } from './upload-avatar'
import { UserForm } from './user-form'

export const UserDetails = async () => {
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
