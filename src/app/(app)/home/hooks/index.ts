import { useSuspenseQuery } from '@tanstack/react-query'
import { client } from '@/rpc/orpc.client'

export const useGetRecentTransactions = () => {
  return useSuspenseQuery(client.transaction.recent.queryOptions())
}

export const useGetSummary = () => {
  return useSuspenseQuery(client.transaction.summary.queryOptions())
}
