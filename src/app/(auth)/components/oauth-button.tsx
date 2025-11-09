'use client'
import { useState } from 'react'
import { Google } from '@/shared/assets/icons'
import { Button } from '@/shared/components/ui/button'
import { Spinner } from '@/shared/components/ui/spinner'
import { signIn } from '@/shared/lib/auth'

export default function OAuthButton() {
  const [loading, setLoading] = useState(false)
  const onSignIn = async () => {
    setLoading(true)
    await signIn.social({ provider: 'google', callbackURL: '/home' })
  }
  const Icon = loading ? Spinner : Google
  return (
    <Button variant={'secondary'} onClick={onSignIn} disabled={loading}>
      <Icon className="text-primary" />
      ادامه با حساب گوگل
    </Button>
  )
}
