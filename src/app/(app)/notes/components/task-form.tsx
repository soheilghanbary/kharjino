'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { PlusIcon } from 'lucide-react'
import { nanoid } from 'nanoid'
import { VisuallyHidden } from 'radix-ui'
import { type ReactNode, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { client } from '@/rpc/orpc.client'
import { createTaskSchema, type UpdateTaskSchema } from '../schemas'

type TaskFormProps =
  | {
      mode: 'add'
    }
  | {
      mode: 'edit'
      task: UpdateTaskSchema
    }

export function TaskForm(props: TaskFormProps & { trigger?: ReactNode }) {
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
          }
        : {
            text: '',
            done: false,
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
          id: nanoid(),
          userId: '',
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        qc.setQueryData(client.task.getAll.queryKey(), [
          newTask,
          ...previousTasks,
        ])
        reset()
        setOpen(false)
      },
      onSettled() {
        qc.prefetchQuery({ queryKey: client.task.getAll.queryKey() })
      },
    })
  )

  const { mutate: editMutate, isPending: editPending } = useMutation(
    client.task.update.mutationOptions({
      onSettled() {
        qc.prefetchQuery({ queryKey: client.task.getAll.queryKey() })
      },
    })
  )

  const onSubmit = handleSubmit((data) => {
    props.mode === 'edit'
      ? editMutate({ ...data, id: props.task.id })
      : addMutate(data)
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
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {props.mode === 'edit' ? 'ویرایش تسک' : 'تسک جدید'}
          </DrawerTitle>
          <VisuallyHidden.Root>
            <DrawerDescription>
              تسک‌هات رو اضافه کن و ذهنت رو آزاد کن.
            </DrawerDescription>
          </VisuallyHidden.Root>
        </DrawerHeader>
        <form onSubmit={onSubmit} className="grid gap-4">
          <div className="flex items-center rounded-md border bg-muted/40">
            <Input
              type="text"
              disabled={props.mode === 'edit' ? editPending : addPending}
              className="flex-1 border-0 border-none bg-transparent focus-visible:outline-none focus-visible:ring-0"
              placeholder="چه کاری داری؟"
              {...register('text')}
            />
            <Controller
              control={control}
              name="done"
              render={({ field }) => (
                <Checkbox
                  disabled={props.mode === 'edit' ? editPending : addPending}
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mx-3 size-5 bg-card"
                />
              )}
            />
          </div>
          {errors.text?.message && (
            <span className="-mt-2.5 text-destructive text-tiny">
              {errors.text.message}
            </span>
          )}
          <Button
            className="w-full"
            type="submit"
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
