import { headers } from 'next/headers'
import { auth } from '@/server/lib/auth'

export const getUserId = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session?.user.id as string
}

export const getSession = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  return session
}
