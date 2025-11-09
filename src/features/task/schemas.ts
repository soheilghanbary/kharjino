import z from 'zod'

export const createTaskSchema = z.object({
  text: z.string().min(3, 'فیلد تسک نباید خالی باشد'),
  done: z.boolean(),
  priority: z
    .number()
    .min(0, 'حداقل مقدار اولویت 0 است')
    .max(2, 'حداکثر مقدار اولویت 2 است'),
})

export const updateTaskSchema = createTaskSchema.extend({
  id: z.string(),
})

export type CreateTaskSchema = z.infer<typeof createTaskSchema>
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
