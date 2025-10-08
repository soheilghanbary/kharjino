import { os } from '@orpc/server'
import z from 'zod'
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
  create: os
    .input(
      z.object({
        title: z.string().min(3, 'عنوان باید حداقل سه کاراکتر باشد'),
        description: z.string(),
      })
    )
    .handler(async ({ input }) => {
      const userId = await getUserId()
      return await db.note.create({
        data: {
          title: input.title,
          description: input.description,
          userId,
        },
      })
    }),
}
