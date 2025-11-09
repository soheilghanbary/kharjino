import { os } from '@orpc/server'
import { eq } from 'drizzle-orm'
import z from 'zod'
import { db } from '@/db'
import { user } from '@/db/schema'
import { updateUserFormSchema } from '@/features/account'
import { getUserId } from '@/shared/lib/helpers'

export const userRouter = {
  get: os.handler(async () => {
    const userId = await getUserId()
    return await db.query.user.findFirst({
      where: eq(user.id, userId),
    })
  }),
  update: os.input(updateUserFormSchema).handler(async ({ input }) => {
    const userId = await getUserId()
    const [updatedUser] = await db
      .update(user)
      .set({
        ...input,
        updatedAt: new Date(),
      })
      .where(eq(user.id, userId))
      .returning()
    return updatedUser
  }),
  updateImage: os.input(z.string()).handler(async ({ input }) => {
    const userId = await getUserId()
    const [updatedUser] = await db
      .update(user)
      .set({
        image: input,
        updatedAt: new Date(), // Don't forget to update timestamp manually
      })
      .where(eq(user.id, userId))
      .returning()
    return updatedUser
  }),
}
