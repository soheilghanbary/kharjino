import { os } from '@orpc/server'
import z from 'zod'
import { db } from '@/lib/db'

export const categoryRouter = {
  getAll: os.input(z.enum(['expense', 'income'])).handler(async ({ input }) => {
    return await db.category.findMany({ where: { type: input } })
  }),
  // getAll: os.input(z.enum(['expense', 'income'])).handler(async ({ input }) => {
  //   const userId = await getUserId()
  //   return await db.category.findMany({ where: { userId, type: input } })
  // }),
}
