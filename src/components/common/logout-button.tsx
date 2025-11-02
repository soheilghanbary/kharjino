'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { LogoutIcon } from '@/assets/icons/bulk'
import { signOut } from '@/lib/auth'
import { Button } from '../ui/button'
import { Spinner } from '../ui/spinner'

export function LogoutButton() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const onSignOut = async () => {
    setLoading(true)
    await signOut()
    router.push('/')
  }

  return (
    <Button
      onClick={onSignOut}
      variant={'secondary'}
      className="my-4 bg-destructive/10 text-destructive shadow-none"
    >
      {loading ? <Spinner /> : <LogoutIcon className="size-5" />}
      خروج از حساب کاربری
    </Button>
  )
}
