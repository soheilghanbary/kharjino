import { createORPCClient } from '@orpc/client'
import { RPCLink } from '@orpc/client/fetch'
import { DedupeRequestsPlugin } from '@orpc/client/plugins'
import type { RouterClient } from '@orpc/server'
import { createTanstackQueryUtils } from '@orpc/tanstack-query'
import type { router } from './router'

declare global {
  var $client: RouterClient<typeof router> | undefined
}

// orpc link
const link = new RPCLink({
  url: () => `${process.env.NEXT_PUBLIC_URL}/api/rpc`,
  plugins: [
    new DedupeRequestsPlugin({
      filter: ({ request }) => request.method === 'GET', // Filters requests to dedupe
      groups: [
        {
          condition: () => true,
          context: {}, // Context used for the rest of the request lifecycle
        },
      ],
    }),
  ],
})

// orpc client
export const api: RouterClient<typeof router> =
  globalThis.$client ?? createORPCClient(link)

// orpc tanstack query utils
export const client = createTanstackQueryUtils(api)
