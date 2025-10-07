'use client'
import { useState } from 'react'
import { Google } from '@/assets/icons'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { signIn } from '@/lib/auth'

export default function OAuthButton() {
  const [loading, setLoading] = useState(false)
  const onSignIn = async () => {
    setLoading(true)
    await signIn.social({ provider: 'google', callbackURL: '/home' })
  }
  const Icon = loading ? Spinner : Google
  return (
    <Button variant={'outline'} onClick={onSignIn} disabled={loading}>
      <Icon className="text-primary" />
      ادامه با حساب گوگل
    </Button>
  )
}
