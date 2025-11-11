import { os } from '@orpc/server'
import { and, desc, eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/db'
import { notes } from '@/db/schema'
import { createNoteSchema, updateNoteSchema } from '@/features/note'
import { getUserId } from '@/shared/lib/helpers'

export const noteRouter = {
  getAll: os.handler(async () => {
    const userId = await getUserId()
    return await db.query.notes.findMany({
      where: eq(notes.userId, userId),
      orderBy: desc(notes.createdAt),
    })
  }),
  getById: os.input(z.string()).handler(async ({ input }) => {
    return await db.query.notes.findFirst({
      where: and(eq(notes.id, input)),
    })
  }),
  create: os.input(createNoteSchema).handler(async ({ input }) => {
    const userId = await getUserId()
    const [newNote] = await db
      .insert(notes)
      .values({
        title: input.title,
        description: input.description,
        userId,
        createdAt: new Date(),
        updatedAt: new Date(),
      })
      .returning()
    return newNote
  }),
  update: os.input(updateNoteSchema).handler(async ({ input }) => {
    const [updatedNote] = await db
      .update(notes)
      .set({
        title: input.title,
        description: input.description,
        updatedAt: new Date(),
      })
      .where(eq(notes.id, input.id))
      .returning()
    return updatedNote
  }),
  delete: os.input(z.string()).handler(async ({ input }) => {
    const [deletedNote] = await db
      .delete(notes)
      .where(eq(notes.id, input))
      .returning()
    return deletedNote
  }),
}
