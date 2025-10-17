import { os } from '@orpc/server'
import { and, asc, desc, eq, inArray, sum } from 'drizzle-orm'
import z from 'zod'
import { createTransaction, editTransaction } from '@/app/(app)/new/schemas'
import { db } from '@/db'
import { categories, transactions } from '@/db/schema'
import { getUserId } from '@/lib/helpers'

export const transactionRouter = {
  recent: os.handler(async () => {
    const userId = await getUserId()
    const recentTransactions = await db.query.transactions.findMany({
      where: eq(transactions.userId, userId),
      orderBy: desc(transactions.date),
      with: {
        category: true,
      },
      limit: 5,
    })
    return recentTransactions
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
        })
        .nullish()
    )
    .handler(async ({ input }) => {
      const userId = await getUserId()
      const { type, sort } = input ?? { type: null, sort: 'newest' }
      const whereCondition = type
        ? and(eq(transactions.userId, userId), eq(transactions.type, type))
        : eq(transactions.userId, userId)
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
      return await db.query.transactions.findMany({
        where: whereCondition,
        with: {
          category: true,
        },
        orderBy: orderByClause,
      })
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
    const [incomeResult, expenseResult] = await Promise.all([
      db
        .select({ total: sum(transactions.amount) })
        .from(transactions)
        .where(
          and(eq(transactions.userId, userId), eq(transactions.type, 'income'))
        ),
      db
        .select({ total: sum(transactions.amount) })
        .from(transactions)
        .where(
          and(eq(transactions.userId, userId), eq(transactions.type, 'expense'))
        ),
    ])
    const income = Number(incomeResult[0]?.total) || 0
    const expense = Number(expenseResult[0]?.total) || 0
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
      const type = input ?? 'expense' // پیش‌فرض خرج‌ها
      const result = await db
        .select({
          categoryId: transactions.categoryId,
          total: sum(transactions.amount),
        })
        .from(transactions)
        .where(
          and(eq(transactions.userId, userId), eq(transactions.type, type))
        )
        .groupBy(transactions.categoryId)
      const categoryIds = result.map((r) => r.categoryId)
      const categoryList = await db
        .select({ id: categories.id, name: categories.name })
        .from(categories)
        .where(inArray(categories.id, categoryIds))
      const data = result.map((r) => ({
        category:
          categoryList.find((c) => c.id === r.categoryId)?.name ?? 'نامشخص',
        total: Number(r.total) || 0,
      }))
      return data
    }),
}
