import z from 'zod'

export const updateUserFormSchema = z.object({
  name: z.string().min(3),
  phone: z
    .string()
    .min(11, 'شماره تلفن باید حداقل 11 رقم داشته باشد')
    .max(11, 'شماره تلفن نباید بیشتر از 11 رقم باشد')
    .nullable(),
  birthday: z.date(),
})

export type UpdateUserFormSchema = z.infer<typeof updateUserFormSchema>
