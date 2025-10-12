import 'server-only'
import { createRouterClient } from '@orpc/server'
import { headers } from 'next/headers'
import { router } from './router'

// const link = new RPCLink({
//   url: process.env.NEXT_PUBLIC_URL ?? 'http://localhost:3000',
//   method: inferRPCMethodFromRouter(router),
//   plugins: [
//     new DedupeRequestsPlugin({
//       groups: [
//         {
//           condition: () => true,
//           context: {},
//         },
//       ],
//     }),
//   ],
//   fetch: async (request) => {
//     const { response } = await handler.handle(request, {
//       context: {
//         headers: await headers(), // Provide headers if needed
//       },
//     })

//     return response ?? new Response('Not Found', { status: 404 })
//   },
// })

globalThis.$client = createRouterClient(router, {
  context: async () => ({
    headers: await headers(),
  }),
})
