import z from 'zod'

export const createNoteSchema = z.object({
  title: z.string().min(3, 'عنوان باید حداقل سه کاراکتر باشد'),
  description: z.string().nullish(),
  color: z.enum([
    'default',
    'amber',
    'teal',
    'purple',
    'black',
    'blue',
    'rose',
    'orange',
  ]),
})

export const updateNoteSchema = createNoteSchema.extend({
  id: z.string(),
})

export type CreateNoteSchema = z.infer<typeof createNoteSchema>
export type UpdateNoteSchema = z.infer<typeof updateNoteSchema>
