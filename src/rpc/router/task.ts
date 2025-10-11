import { os } from '@orpc/server'
import z from 'zod'
import { createTaskSchema, updateTaskSchema } from '@/app/(app)/notes/schemas'
import { db } from '@/lib/db'
import { getUserId } from '@/lib/helpers'

export const taskRouter = {
  getAll: os.handler(async () => {
    const userId = await getUserId()
    return await db.task.findMany({
      where: {
        userId,
      },
      orderBy: { createdAt: 'desc' },
    })
  }),
  getById: os.input(z.string()).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db.task.findUnique({
      where: {
        id: input,
        userId,
      },
    })
  }),
  create: os.input(createTaskSchema).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db.task.create({
      data: { ...input, userId },
    })
  }),
  update: os.input(updateTaskSchema).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db.task.update({
      where: {
        id: input.id,
        userId,
      },
      data: {
        text: input.text,
        done: input.done,
      },
    })
  }),
  doneTask: os
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .handler(async ({ input }) => {
      return await db.task.updateMany({
        where: {
          id: input.id,
        },
        data: {
          done: input.done,
        },
      })
    }),
  delete: os.input(z.string()).handler(async ({ input }) => {
    return await db.task.delete({
      where: { id: input },
    })
  }),
}
