'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { VisuallyHidden } from 'radix-ui'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { TextField } from '@/components/ui/text-field'
import { client } from '@/rpc/orpc.client'
import { type UpdateUserFormSchema, updateUserFormSchema } from '../schemas'

export function UserForm(props: { initialValues: UpdateUserFormSchema }) {
  const qc = useQueryClient()
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
      <div className="grid gap-2">
        <Label>تاریخ تولد</Label>
        <Controller
          name="birthday"
          control={control}
          render={({ field }) => (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant={'outline'}
                  className="justify-start bg-card shadow-none active:scale-100"
                >
                  {new Intl.DateTimeFormat('fa-IR', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                  }).format(field.value)}
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <VisuallyHidden.Root>
                  <DrawerHeader>
                    <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                    <DrawerDescription>
                      This action cannot be undone.
                    </DrawerDescription>
                  </DrawerHeader>
                </VisuallyHidden.Root>
                <div className="flex items-center justify-center border-0">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    captionLayout="dropdown"
                    className="bg-card"
                    classNames={{ root: 'w-full' }}
                    onSelect={(e) => {
                      if (!e) return
                      setOpen(false)
                      setValue('birthday', e)
                    }}
                  />
                </div>
              </DrawerContent>
            </Drawer>
          )}
        />
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending && <Spinner />}
        ذخیره
      </Button>
    </form>
  )
}
