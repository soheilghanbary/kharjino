import { os } from '@orpc/server'
import z from 'zod'
import { eq } from 'drizzle-orm'
import { updateUserFormSchema } from '@/app/(app)/account/schemas'
import { db } from '@/db'
import { users } from '@/db/schema'
import { getUserId } from '@/lib/helpers'

export const userRouter = {
  get: os.handler(async () => {
    const userId = await getUserId()
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    })
    return user
  }),
  update: os.input(updateUserFormSchema).handler(async ({ input }) => {
    const userId = await getUserId()
    const [updatedUser] = await db
      .update(users)
      .set({
        ...input,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning()
    return updatedUser
  }),
  updateImage: os.input(z.string()).handler(async ({ input }) => {
    const userId = await getUserId()
    const [updatedUser] = await db
      .update(users)
      .set({
        image: input,
        updatedAt: new Date(), // Don't forget to update timestamp manually
      })
      .where(eq(users.id, userId))
      .returning()
    return updatedUser
  }),
}
