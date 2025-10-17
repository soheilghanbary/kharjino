import { os } from '@orpc/server'
import { and, desc, eq } from 'drizzle-orm'
import z from 'zod'
import { createNoteSchema, updateNoteSchema } from '@/app/(app)/notes/schemas'
import { db } from '@/db'
import { notes } from '@/db/schema'
import { getUserId } from '@/lib/helpers'

export const noteRouter = {
  getAll: os.handler(async () => {
    const userId = await getUserId()
    return await db.query.notes.findMany({
      where: eq(notes.userId, userId),
      orderBy: desc(notes.createdAt),
    })
  }),
  getById: os.input(z.string()).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db.query.notes.findFirst({
      where: and(eq(notes.id, input), eq(notes.userId, userId)),
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
    const userId = await getUserId()
    const [updatedNote] = await db
      .update(notes)
      .set({
        title: input.title,
        description: input.description,
        updatedAt: new Date(),
      })
      .where(and(eq(notes.id, input.id), eq(notes.userId, userId)))
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
