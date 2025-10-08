'use client'
import { LogOutIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
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
      className="text-destructive"
    >
      {loading ? <Spinner /> : <LogOutIcon />}
      خروج از حساب کاربری
    </Button>
  )
}
