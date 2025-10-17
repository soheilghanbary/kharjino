import { os } from '@orpc/server'
import z from 'zod'
import { eq } from 'drizzle-orm'
import { db } from '@/db'
import { categories } from '@/db/schema'

export const categoryRouter = {
  getAll: os.input(z.enum(['expense', 'income'])).handler(async ({ input }) => {
    return await db.query.categories.findMany({
      where: eq(categories.type, input),
    })
  }),
}
