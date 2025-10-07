'use client'
import { useQuery } from '@tanstack/react-query'
import { client } from '@/rpc/orpc.client'
import { Spinner } from './ui/spinner'

export const MessageCSR = () => {
  const { data, isLoading } = useQuery(client.sayHello.queryOptions())
  if (isLoading) return <Spinner className="mx-auto my-4" />
  return (
    <div>
      <span className="font-medium text-sm">Client-Side Response</span>
      <pre className="mt-1 rounded-md bg-muted p-2 font-mono text-xs shadow-sm">
        {JSON.stringify(data)}
      </pre>
    </div>
  )
}
