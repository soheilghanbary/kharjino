import { api } from '@/rpc/orpc.client'

export const MessageSSR = async () => {
  const data = await api.sayHello()
  return (
    <div>
      <span className="font-medium text-sm">Server-Side Response</span>
      <pre className="mt-1 rounded-md bg-muted p-2 font-mono text-xs shadow-sm">
        {JSON.stringify(data)}
      </pre>
    </div>
  )
}
