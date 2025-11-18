import { createAuthClient } from 'better-auth/react'

// auth client
export const { signIn, signUp, useSession, signOut } = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_URL,
})
