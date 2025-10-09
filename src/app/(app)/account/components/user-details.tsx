'use client'
import { useQuery } from '@tanstack/react-query'
import { notFound } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'
import { client } from '@/rpc/orpc.client'
import { UploadAvatar } from './upload-avatar'
import { UserForm } from './user-form'

export const UserDetails = () => {
  const { data: user, isPending } = useQuery(
    client.user.get.queryOptions({
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    })
  )
  if (isPending) return <Spinner className="mx-auto my-16 text-primary" />
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
