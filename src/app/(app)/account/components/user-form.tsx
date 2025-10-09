'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Spinner } from '@/components/ui/spinner'
import { TextField } from '@/components/ui/text-field'
import { client } from '@/rpc/orpc.client'
import { type UpdateUserFormSchema, updateUserFormSchema } from '../schemas'

export function UserForm(props: { initialValues: UpdateUserFormSchema }) {
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(updateUserFormSchema),
    defaultValues: {
      ...props.initialValues,
      birthday: props.initialValues.birthday ?? new Date(),
    },
  })

  const qc = useQueryClient()

  const { mutate, isPending } = useMutation(
    client.user.update.mutationOptions({
      onSuccess(user) {
        qc.setQueryData(client.user.get.queryKey(), user)
        toast.success('اطلاعات به روز شد')
      },
    })
  )

  const onSave = handleSubmit((data) => mutate(data))

  return (
    <form onSubmit={onSave} className="grid gap-4">
      <TextField
        label="نام و نام خانوادگی"
        error={errors.name?.message}
        {...register('name')}
      />
      <TextField
        label="شماره تلفن"
        error={errors.phone?.message}
        {...register('phone')}
      />
      <Controller
        name="birthday"
        control={control}
        render={({ field }) => (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <TextField
                label="تاریخ تولد"
                readOnly
                inputClass="text-right"
                value={new Intl.DateTimeFormat('fa-IR', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                }).format(field.value)}
              />
            </PopoverTrigger>
            <PopoverContent className="flex w-auto items-center justify-center border-0 p-2">
              <Calendar
                mode="single"
                selected={field.value}
                captionLayout="dropdown"
                onSelect={(e) => {
                  if (!e) return
                  setOpen(false)
                  setValue('birthday', e)
                }}
              />
            </PopoverContent>
          </Popover>
        )}
      />
      <Button type="submit" disabled={isPending}>
        {isPending && <Spinner />}
        ذخیره
      </Button>
    </form>
  )
}
