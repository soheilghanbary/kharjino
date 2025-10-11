import z from 'zod'

export const createNoteSchema = z.object({
  title: z.string().min(3, 'عنوان باید حداقل سه کاراکتر باشد'),
  description: z.string().nullish(),
})

export const updateNoteSchema = createNoteSchema.extend({
  id: z.string(),
})

export const createTaskSchema = z.object({
  text: z.string().min(3, 'فیلد تسک نباید خالی باشد'),
  done: z.boolean(),
})

export const updateTaskSchema = createTaskSchema.extend({
  id: z.string(),
})

export type CreateNoteSchema = z.infer<typeof createNoteSchema>
export type UpdateNoteSchema = z.infer<typeof updateNoteSchema>
export type CreateTaskSchema = z.infer<typeof createTaskSchema>
export type UpdateTaskSchema = z.infer<typeof updateTaskSchema>
