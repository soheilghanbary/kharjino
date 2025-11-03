import { os } from '@orpc/server'
import { and, asc, desc, eq, sql, sum } from 'drizzle-orm'
import z from 'zod'
import { createTransaction, editTransaction } from '@/app/(app)/new/schemas'
import { db } from '@/db'
import { categories, transactions } from '@/db/schema'
import { getUserId } from '@/lib/helpers'

export const transactionRouter = {
  recent: os.handler(async () => {
    const userId = await getUserId()
    return await db.query.transactions.findMany({
      where: eq(transactions.userId, userId),
      orderBy: desc(transactions.date),
      with: {
        category: true,
      },
      limit: 5,
    })
  }),
  create: os.input(createTransaction).handler(async ({ input }) => {
    const userId = await getUserId()
    const [newTransaction] = await db
      .insert(transactions)
      .values({
        ...input,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
    return newTransaction
  }),
  getAll: os
    .input(
      z
        .object({
          type: z.enum(['expense', 'income']).nullish(),
          sort: z.enum(['newest', 'highest', 'lowest']).default('newest'),
          page: z.number().default(0),
        })
        .nullish()
    )
    .handler(async ({ input }) => {
      const userId = await getUserId()
      const PAGE_SIZE = 10

      const { type, sort, page } = input ?? {
        type: null,
        sort: 'newest',
        page: 0,
      }

      // --- WHERE condition ---
      const whereCondition = type
        ? and(eq(transactions.userId, userId), eq(transactions.type, type))
        : eq(transactions.userId, userId)

      // --- ORDER BY clause ---
      // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
      let orderByClause
      switch (sort) {
        case 'highest':
          orderByClause = desc(transactions.amount)
          break
        case 'lowest':
          orderByClause = asc(transactions.amount)
          break
        default:
          orderByClause = desc(transactions.date) // newest
          break
      }

      // --- Query transactions (fetch one extra to detect next page) ---
      const results = await db.query.transactions.findMany({
        where: whereCondition,
        with: {
          category: true,
        },
        orderBy: orderByClause,
        offset: page * PAGE_SIZE,
        limit: PAGE_SIZE + 1, // Fetch one extra to check for next page
      })

      // --- Determine pagination metadata ---
      const hasNextPage = results.length > PAGE_SIZE
      const slicedResults = results.slice(0, PAGE_SIZE)

      return {
        data: slicedResults,
        nextPageParam: hasNextPage ? page + 1 : undefined,
      }
    }),
  get: os.input(z.string()).handler(async ({ input }) => {
    const transaction = await db.query.transactions.findFirst({
      where: eq(transactions.id, input),
      with: {
        category: true,
      },
    })
    return transaction
  }),
  summary: os.handler(async () => {
    const userId = await getUserId()
    const result = await db
      .select({
        type: transactions.type,
        total: sum(transactions.amount),
      })
      .from(transactions)
      .where(eq(transactions.userId, userId))
      .groupBy(transactions.type)
    const { income, expense } = result.reduce(
      (acc, row) => {
        if (row.type === 'income') acc.income = Number(row.total ?? 0)
        else acc.expense = Number(row.total ?? 0)
        return acc
      },
      { income: 0, expense: 0 }
    )
    const balance = income - expense
    return { balance, income, expense }
  }),
  update: os.input(editTransaction).handler(async ({ input }) => {
    const userId = await getUserId()
    const [updatedTransaction] = await db
      .update(transactions)
      .set({
        ...input,
        userId,
        updatedAt: new Date(),
      })
      .where(eq(transactions.id, input.id))
      .returning()
    return updatedTransaction
  }),
  delete: os.input(z.string()).handler(async ({ input }) => {
    const userId = await getUserId()
    const [deletedTransaction] = await db
      .delete(transactions)
      .where(and(eq(transactions.id, input), eq(transactions.userId, userId)))
      .returning()
    return deletedTransaction
  }),
  byCategory: os
    .input(z.enum(['expense', 'income']).nullish())
    .handler(async ({ input }) => {
      const userId = await getUserId()
      const type = input ?? 'expense'
      const result = await db
        .select({
          categoryName: sql<string>`COALESCE(${categories.name}, 'نامشخص')`,
          total: sum(transactions.amount),
        })
        .from(transactions)
        .leftJoin(categories, eq(transactions.categoryId, categories.id))
        .where(
          and(eq(transactions.userId, userId), eq(transactions.type, type))
        )
        .groupBy(categories.name)
      // Cast + ensure numeric totals
      return result.map((r) => ({
        category: r.categoryName,
        total: Number(r.total) || 0,
      }))
    }),
  getByCategory: os
    .input(
      z.object({
        categoryId: z.string(),
        page: z.number().default(0),
      })
    )
    .handler(async ({ input }) => {
      const userId = await getUserId()
      const { categoryId, page } = input
      const PAGE_SIZE = 10

      const results = await db.query.transactions.findMany({
        where: and(
          eq(transactions.userId, userId),
          eq(transactions.categoryId, categoryId)
        ),
        with: {
          category: true,
        },
        orderBy: desc(transactions.date),
        offset: page * PAGE_SIZE,
        limit: PAGE_SIZE + 1,
      })

      const hasNextPage = results.length > PAGE_SIZE
      const slicedResults = results.slice(0, PAGE_SIZE)

      return {
        data: slicedResults,
        nextPageParam: hasNextPage ? page + 1 : undefined,
      }
    }),
}
