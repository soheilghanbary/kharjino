'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { nanoid } from 'nanoid'
import { type ReactNode, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { createTaskSchema, type UpdateTaskSchema } from '@/features/task'
import { client } from '@/rpc/orpc.client'
import { Button } from '@/shared/components/ui/button'
import { Checkbox } from '@/shared/components/ui/checkbox'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import { Label } from '@/shared/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { Spinner } from '@/shared/components/ui/spinner'
import { TextField } from '@/shared/components/ui/text-field'
import { useSession } from '@/shared/lib/auth'

type TaskFormProps =
  | {
      mode: 'add'
    }
  | {
      mode: 'edit'
      task: UpdateTaskSchema
    }

export function TaskForm(props: TaskFormProps & { trigger?: ReactNode }) {
  const { data } = useSession()
  const qc = useQueryClient()
  const [open, setOpen] = useState(false)
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(createTaskSchema),
    defaultValues:
      props.mode === 'edit'
        ? {
            text: props.task.text,
            done: props.task.done,
            priority: props.task.priority,
          }
        : {
            text: '',
            done: false,
            priority: 1,
          },
  })

  const { mutate: addMutate, isPending: addPending } = useMutation(
    client.task.create.mutationOptions({
      async onMutate(values) {
        await qc.cancelQueries({ queryKey: client.task.getAll.queryKey() })
        const previousTasks =
          qc.getQueryData<Awaited<ReturnType<typeof client.task.getAll.call>>>(
            client.task.getAll.queryKey()
          ) || []
        const newTask = {
          ...values,
          userId: String(data?.session.id),
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        qc.setQueryData(client.task.getAll.queryKey(), [
          newTask,
          ...previousTasks,
        ])
        setOpen(false)
        reset()
      },
    })
  )

  const { mutate: editMutate, isPending: editPending } = useMutation(
    client.task.update.mutationOptions({
      async onMutate(values) {
        await qc.cancelQueries({ queryKey: client.task.getAll.queryKey() })
        const previousTasks =
          qc.getQueryData<Awaited<ReturnType<typeof client.task.getAll.call>>>(
            client.task.getAll.queryKey()
          ) || []
        const newList = previousTasks.map((t) => {
          if (t.id === values.id) return { ...t, ...values }
          return t
        })
        qc.setQueryData(client.task.getAll.queryKey(), [...newList])
        setOpen(false)
        reset({ ...values })
      },
    })
  )

  const onSubmit = handleSubmit((data) => {
    props.mode === 'edit'
      ? editMutate({ ...data, id: props.task.id })
      : addMutate({ ...data, id: nanoid() })
  })

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        {props.trigger ?? (
          <div className="container-sm fixed inset-x-0 bottom-16 mx-auto flex w-full justify-end p-4">
            <Button className="size-10 rounded-full" variant={'secondary'}>
              <PlusIcon className="size-5 text-primary" />
            </Button>
          </div>
        )}
      </DrawerTrigger>
      <DrawerContent className="dark:bg-background">
        <DrawerHeader>
          <DrawerTitle>
            {props.mode === 'edit' ? 'ویرایش تسک' : 'تسک جدید'}
          </DrawerTitle>
          <DrawerDescription>
            {props.mode === 'add'
              ? 'تسک‌هات رو اضافه کن و ذهنت رو آزاد کن.'
              : 'ویرایش تسک رو انجام دهید.'}
          </DrawerDescription>
        </DrawerHeader>
        <form onSubmit={onSubmit} className="grid gap-4">
          <TextField
            type="text"
            label="عنوان کار"
            autoComplete="off"
            disabled={props.mode === 'edit' ? editPending : addPending}
            inputClass="bg-muted dark:bg-card"
            error={errors.text?.message}
            {...register('text')}
          />
          <div className="grid gap-2">
            <Label>اولویت</Label>
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  defaultValue={String(field.value)}
                  onValueChange={(e) => field.onChange(Number(e))}
                >
                  <SelectTrigger className="bg-muted dark:bg-card">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={'0'}>🟢 پایین</SelectItem>
                    <SelectItem value={'1'}>🟠 متوسط</SelectItem>
                    <SelectItem value={'2'}>🔴 بالا</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>
          <div className="flex items-center gap-3">
            <Controller
              name="done"
              control={control}
              render={({ field }) => (
                <Checkbox
                  disabled={props.mode === 'edit' ? editPending : addPending}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="size-5 dark:bg-muted"
                />
              )}
            />
            <Label className="text-xs/5">کار انجام شده؟</Label>
          </div>
          <Button
            type="submit"
            className="w-full"
            variant={props.mode === 'edit' ? 'secondary' : 'default'}
            disabled={props.mode === 'edit' ? editPending : addPending}
          >
            {props.mode === 'edit'
              ? editPending && <Spinner />
              : addPending && <Spinner />}
            {props.mode === 'edit' ? 'ویرایش' : 'ایجاد'}
          </Button>
        </form>
      </DrawerContent>
    </Drawer>
  )
}
