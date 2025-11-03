import { os } from '@orpc/server'
import { and, desc, eq } from 'drizzle-orm'
import z from 'zod'
import {
  createCategorySchema,
  updateCategorySchema,
} from '@/app/(app)/my-categories/schemas'
import { db } from '@/db'
import { categories } from '@/db/schema'
import { getUserId } from '@/lib/helpers'

export const categoryRouter = {
  create: os.input(createCategorySchema).handler(async ({ input }) => {
    const userId = await getUserId()
    const row = await db
      .insert(categories)
      .values({
        ...input,
        userId,
      })
      .returning()
    return row
  }),
  getAll: os.input(z.enum(['expense', 'income'])).handler(async ({ input }) => {
    return await db.query.categories.findMany({
      where: eq(categories.type, input),
    })
  }),
  getById: os.input(z.string()).handler(async ({ input }) => {
    return await db.query.categories.findFirst({
      where: eq(categories.id, input),
    })
  }),
  update: os.input(updateCategorySchema).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db
      .update(categories)
      .set({
        ...input,
        userId,
      })
      .where(eq(categories.id, input.id))
      .returning()
  }),
  delte: os.input(z.string()).handler(async ({ input }) => {
    return await db.delete(categories).where(eq(categories.id, input))
  }),
  all: os.handler(async () => {
    const userId = await getUserId()
    const [incomeCategories, expenseCategories] = await Promise.all([
      db.query.categories.findMany({
        where: and(
          eq(categories.userId, userId),
          eq(categories.type, 'income')
        ),
        orderBy: desc(categories.createdAt),
      }),
      db.query.categories.findMany({
        where: and(
          eq(categories.userId, userId),
          eq(categories.type, 'expense')
        ),
        orderBy: desc(categories.createdAt),
      }),
    ])
    return {
      income: incomeCategories,
      expense: expenseCategories,
    }
  }),
}
