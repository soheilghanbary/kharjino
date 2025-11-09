import z from 'zod'

export const createTransaction = z.object({
  type: z.enum(['expense', 'income']),
  amount: z.number().min(1, 'مبلغ نباید صفر باشد'),
  date: z.date(),
  categoryId: z.string().min(1, 'موضوع رو انتخاب کن'),
  description: z.string().nullable(),
})

export const editTransaction = createTransaction.extend({
  id: z.string(),
})

export type CreateTransaction = z.infer<typeof createTransaction>
export type EditTransaction = z.infer<typeof editTransaction>
