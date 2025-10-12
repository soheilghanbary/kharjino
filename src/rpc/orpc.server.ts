import 'server-only'
import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { DedupeRequestsPlugin } from '@orpc/client/plugins'
import { inferRPCMethodFromRouter, type RouterClient } from '@orpc/server'
import { headers } from 'next/headers'
import { handler } from '@/app/api/rpc/[[...rest]]/route'
import { router } from './router'

const link = new RPCLink({
  url: process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000',
  method: inferRPCMethodFromRouter(router),
  plugins: [
    new DedupeRequestsPlugin({
      groups: [
        {
          condition: () => true,
          context: {},
        },
      ],
    }),
  ],
  fetch: async (request) => {
    const { response } = await handler.handle(request, {
      context: {
        headers: await headers(), // Provide headers if needed
      },
    })

    return response ?? new Response('Not Found', { status: 404 })
  },
})

globalThis.$client = createORPCClient<RouterClient<typeof router>>(link)
