import { os } from '@orpc/server'
import z from 'zod'
import { updateUserFormSchema } from '@/app/(app)/account/schemas'
import { db } from '@/lib/db'
import { getUserId } from '@/lib/helpers'

export const userRouter = {
  get: os.handler(async () => {
    const userId = await getUserId()
    const user = await db.user.findUnique({ where: { id: userId } })
    return user
  }),
  update: os.input(updateUserFormSchema).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db.user.update({
      where: { id: userId },
      data: { ...input },
    })
  }),
  updateImage: os.input(z.string()).handler(async ({ input }) => {
    const userId = await getUserId()
    return await db.user.update({
      where: { id: userId },
      data: { image: input },
    })
  }),
}
