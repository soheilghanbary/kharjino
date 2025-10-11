'use client'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { Task } from 'generated/prisma'
import { EditIcon } from 'lucide-react'
import { toast } from 'sonner'
import { TrashIcon } from '@/assets/icons/bulk'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { client } from '@/rpc/orpc.client'
import { TaskForm } from './task-form'

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
      className="size-7 hover:bg-destructive/10"
      variant={'ghost'}
    >
      <TrashIcon className="size-4 text-destructive" />
    </Button>
  )
}

const TaskCard = ({ id, text, done }: Task) => {
  return (
    <div className="flex items-center gap-2 rounded-2xl bg-muted p-3">
      <Checkbox checked={done} />
      <p
        className={cn(
          'grow text-muted-foreground text-xs/6',
          done && 'line-through'
        )}
      >
        {text}
      </p>
      <div className="space-x-1">
        <TaskForm
          mode="edit"
          task={{ id, text, done }}
          trigger={
            <Button className="size-7 hover:bg-success/10" variant={'ghost'}>
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
  const { data, isPending } = useQuery(client.task.getAll.queryOptions())
  if (isPending)
    return <Spinner className="mx-auto my-12 size-5 text-primary" />

  if (!data?.length) return <div>No tasks</div>

  return (
    <div className="grid gap-1">
      {data.map((t) => (
        <TaskCard key={t.id} {...t} />
      ))}
    </div>
  )
}
