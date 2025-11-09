import { z } from 'zod'

const createCategorySchema = z.object({
  name: z.string().min(1),
  icon: z.string().min(1),
  type: z.enum(['expense', 'income']),
})

const updateCategorySchema = createCategorySchema.extend({
  id: z.string(),
})

type CreateCategorySchema = z.infer<typeof createCategorySchema>
type UpdateCategorySchema = z.infer<typeof updateCategorySchema>

export {
  createCategorySchema,
  updateCategorySchema,
  type CreateCategorySchema,
  type UpdateCategorySchema,
}
