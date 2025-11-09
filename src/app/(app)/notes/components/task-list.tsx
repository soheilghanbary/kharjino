'use client'
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query'
import { useQueryState } from 'nuqs'
import { CheckPaperIcon, EditIcon, TrashIcon } from '@/assets/icons/bulk'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import type { Task } from '@/db/schema'
import { cn } from '@/lib/utils'
import { client } from '@/rpc/orpc.client'
import { TaskForm } from './task-form'

const CheckboxTaskButton = ({ id, done }: { id: string; done: boolean }) => {
  const qc = useQueryClient()
  const { mutate } = useMutation(
    client.task.doneTask.mutationOptions({
      onMutate() {
        qc.cancelQueries({ queryKey: client.task.getAll.queryKey() })
        const previousTasks =
          qc.getQueryData<Awaited<ReturnType<typeof client.task.getAll.call>>>(
            client.task.getAll.queryKey()
          ) || []
        const newList = previousTasks.map((t) => {
          if (t.id === id) return { ...t, done: !done }
          return t
        })
        console.log(newList)
        qc.setQueryData(client.task.getAll.queryKey(), newList)
      },
    })
  )
  return (
    <Checkbox
      checked={done}
      onCheckedChange={(e: boolean) => mutate({ id, done: e })}
      className="dark:bg-muted"
    />
  )
}

const DeleteTaskButton = ({ id }: { id: string }) => {
  const qc = useQueryClient()
  const { mutate } = useMutation(
    client.task.delete.mutationOptions({
      onMutate() {
        qc.cancelQueries({ queryKey: client.task.getAll.queryKey() })
        const previousTasks =
          qc.getQueryData<Awaited<ReturnType<typeof client.task.getAll.call>>>(
            client.task.getAll.queryKey()
          ) || []
        const newList = previousTasks.filter((t) => t.id !== id)
        qc.setQueryData(client.task.getAll.queryKey(), newList)
      },
    })
  )
  const onDelete = () => mutate(id)
  return (
    <Button
      onClick={onDelete}
      size={'icon'}
      variant={'ghost'}
      className="size-7 hover:bg-destructive/10"
    >
      <TrashIcon className="size-4 text-destructive" />
    </Button>
  )
}

const handlePiority = (priority: number) => {
  switch (priority) {
    case 0:
      return 'پایین'
    case 1:
      return 'متوسط'
    case 2:
      return 'بالا'
  }
}

const TaskCard = ({ id, text, done, priority }: Task) => {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-muted px-3 py-2 dark:bg-card">
      <CheckboxTaskButton id={id} done={done} />
      <p
        className={'flex grow flex-col text-foreground text-tiny sm:text-xs/5'}
      >
        <span className={done ? 'text-muted-foreground line-through' : ''}>
          {text}
        </span>
        <span
          className={cn(
            'font-medium',
            priority === 0 && 'text-success',
            priority === 1 && 'text-orange-500',
            priority === 2 && 'text-destructive'
          )}
        >
          {handlePiority(priority)}
        </span>
      </p>
      <div className="flex items-center gap-1">
        <TaskForm
          mode="edit"
          task={{ id, text, done, priority }}
          trigger={
            <Button
              size={'icon'}
              variant={'ghost'}
              className="size-7 hover:bg-success/10"
            >
              <EditIcon className="size-4 text-success" />
            </Button>
          }
        />
        <DeleteTaskButton id={id} />
      </div>
    </div>
  )
}

export const TaskList = () => {
  const [filter] = useQueryState('filter')
  const priorityFilter = filter !== null ? Number(filter) : undefined
  const { data } = useSuspenseQuery(client.task.getAll.queryOptions())

  const filtered =
    priorityFilter !== undefined
      ? data.filter((t) => t.priority === priorityFilter)
      : data

  if (!filtered?.length)
    return (
      <div className="flex h-56 flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed bg-muted text-muted-foreground text-sm dark:bg-card">
        <CheckPaperIcon />
        کاری برای انجام نداری
        <span className="text-xs">رو دکمه + بزن و کاراتو ایجاد کنید</span>
      </div>
    )

  return (
    <div className="fade-up-transition grid gap-1" key={filter}>
      {filtered.map((t) => (
        <TaskCard key={t.id} {...t} />
      ))}
    </div>
  )
}
