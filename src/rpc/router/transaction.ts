import { os } from '@orpc/server'
import z from 'zod'
import { createTransaction, editTransaction } from '@/app/(app)/new/schemas'
import { db } from '@/lib/db'
import { getUserId } from '@/lib/helpers'

export const transactionRouter = {
  recent: os.handler(async () => {
    const userId = await getUserId()
    return await db.transaction.findMany({
      where: { userId },
      orderBy: { date: 'desc' },
      include: { category: true },
      take: 5,
    })
  }),
  create: os.input(createTransaction).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db.transaction.create({
      data: { ...input, userId },
    })
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
      const where = type ? { userId, type } : { userId }
      let orderBy: any
      switch (sort) {
        case 'highest':
          orderBy = { amount: 'desc' }
          break
        case 'lowest':
          orderBy = { amount: 'asc' }
          break
        default:
          orderBy = { date: 'desc' } // newest
          break
      }
      return await db.transaction.findMany({
        where,
        include: { category: true },
        orderBy,
      })
    }),
  get: os.input(z.string()).handler(async ({ input }) => {
    return await db.transaction.findUnique({
      where: { id: input },
      include: { category: true },
    })
  }),
  summary: os.handler(async () => {
    const userId = await getUserId()
    const [incomeAgg, expenseAgg] = await Promise.all([
      db.transaction.aggregate({
        where: { userId, type: 'income' },
        _sum: { amount: true },
      }),
      db.transaction.aggregate({
        where: { userId, type: 'expense' },
        _sum: { amount: true },
      }),
    ])
    const income = incomeAgg._sum.amount || 0
    const expense = expenseAgg._sum.amount || 0
    const balance = income - expense
    return { balance, income, expense }
  }),
  update: os.input(editTransaction).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db.transaction.update({
      where: { id: input.id },
      data: { ...input, userId },
    })
  }),
  delete: os.input(z.string()).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db.transaction.delete({
      where: { id: input, userId },
    })
  }),
}
