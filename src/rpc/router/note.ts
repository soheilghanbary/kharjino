import { os } from '@orpc/server'
import z from 'zod'
import { createNoteSchema, updateNoteSchema } from '@/app/(app)/notes/schemas'
import { db } from '@/lib/db'
import { getUserId } from '@/lib/helpers'

export const noteRouter = {
  getAll: os.handler(async () => {
    const userId = await getUserId()
    return await db.note.findMany({
      where: {
        userId,
      },
      orderBy: { createdAt: 'desc' },
    })
  }),
  getById: os.input(z.string()).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db.note.findUnique({
      where: {
        id: input,
        userId,
      },
    })
  }),
  create: os.input(createNoteSchema).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db.note.create({
      data: {
        title: input.title,
        description: input.description,
        userId,
      },
    })
  }),
  update: os.input(updateNoteSchema).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db.note.update({
      where: {
        id: input.id,
        userId,
      },
      data: {
        title: input.title,
        description: input.description,
      },
    })
  }),
  delete: os.input(z.string()).handler(async ({ input }) => {
    return await db.note.delete({
      where: { id: input },
    })
  }),
}
