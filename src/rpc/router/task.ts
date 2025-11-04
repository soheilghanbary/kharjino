import { os } from '@orpc/server'
import { and, desc, eq } from 'drizzle-orm'
import z from 'zod'
import { updateTaskSchema } from '@/app/(app)/notes/schemas'
import { db } from '@/db'
import { tasks } from '@/db/schema'
import { getUserId } from '@/lib/helpers'

export const taskRouter = {
  getAll: os.handler(async () => {
    const userId = await getUserId()
    return await db.query.tasks.findMany({
      where: eq(tasks.userId, userId),
      orderBy: desc(tasks.createdAt),
    })
  }),
  getById: os.input(z.string()).handler(async ({ input }) => {
    const userId = await getUserId()
    const task = await db.query.tasks.findFirst({
      where: and(eq(tasks.id, input), eq(tasks.userId, userId)),
    })
    return task
  }),
  create: os.input(updateTaskSchema).handler(async ({ input }) => {
    const userId = await getUserId()
    const [newTask] = await db
      .insert(tasks)
      .values({
        ...input,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
    return newTask
  }),
  update: os.input(updateTaskSchema).handler(async ({ input }) => {
    const userId = await getUserId()
    const [updatedTask] = await db
      .update(tasks)
      .set({
        ...input,
        updatedAt: new Date(),
      })
      .where(and(eq(tasks.id, input.id), eq(tasks.userId, userId)))
      .returning()
    return updatedTask
  }),
  doneTask: os
    .input(
      z.object({
        id: z.string(),
        done: z.boolean(),
      })
    )
    .handler(async ({ input }) => {
      const updatedTasks = await db
        .update(tasks)
        .set({
          done: input.done,
          updatedAt: new Date(),
        })
        .where(eq(tasks.id, input.id))
        .returning()
      return { count: updatedTasks.length }
    }),
  delete: os.input(z.string()).handler(async ({ input }) => {
    const [deletedTask] = await db
      .delete(tasks)
      .where(eq(tasks.id, input))
      .returning()
    return deletedTask
  }),
}
