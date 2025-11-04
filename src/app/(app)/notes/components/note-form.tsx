'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { TrashIcon } from '@/assets/icons/bulk'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import type { Note } from '@/db/schema'
import { client } from '@/rpc/orpc.client'
import { createNoteSchema, type UpdateNoteSchema } from '../schemas'

type NoteFormProps =
  | {
      mode: 'add'
    }
  | {
      mode: 'edit'
      note: UpdateNoteSchema
    }

export const NoteForm = (props: NoteFormProps) => {
  const router = useRouter()
  const qc = useQueryClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createNoteSchema),
    defaultValues:
      props.mode === 'edit'
        ? {
            title: props.note.title,
            description: props.note.description,
          }
        : {
            title: '',
            description: '',
          },
  })

  const createMutation = useMutation(
    client.note.create.mutationOptions({
      onSuccess(res) {
        qc.cancelQueries({ queryKey: client.note.getAll.queryKey() })
        const previousNotes = qc.getQueryData(
          client.note.getAll.queryKey()
        ) as Note[]
        qc.setQueryData(client.note.getAll.queryKey(), [res, ...previousNotes])
        toast.info('یادداشت ایجاد شد')
        router.push('/notes')
      },
    })
  )

  const updateMutation = useMutation(
    client.note.update.mutationOptions({
      onSuccess(res) {
        qc.cancelQueries({ queryKey: client.note.getAll.queryKey() })
        const previousNotes = qc.getQueryData(
          client.note.getAll.queryKey()
        ) as Note[]
        const newNote = previousNotes.map((n) => {
          if (n.id === res.id) return res
          return n
        })
        qc.setQueryData(client.note.getAll.queryKey(), newNote)
        toast.info('یادداشت ویرایش شد')
        router.push('/notes')
      },
    })
  )

  const onSubmit = handleSubmit((data) => {
    if (props.mode === 'add') {
      createMutation.mutate(data)
    } else {
      updateMutation.mutate({
        id: props.note.id,
        ...data,
      })
    }
  })

  const isPending = createMutation.isPending || updateMutation.isPending

  return (
    <>
      <form
        onSubmit={onSubmit}
        className="flex flex-col rounded-2xl bg-accent p-4 dark:bg-card"
      >
        <Input
          type="text"
          placeholder="عنوان یادداشت"
          className="h-8 border-0 bg-transparent focus-visible:ring-0"
          {...register('title')}
        />
        {errors.title?.message && (
          <span className="text-destructive text-tiny">
            {errors.title.message}
          </span>
        )}
        <Textarea
          placeholder="توضیحات"
          className="resize-none border-0 bg-transparent text-foreground/65 text-xs/5 focus-visible:ring-0 dark:text-muted-foreground"
          {...register('description')}
        />
        <Button
          type="submit"
          size={'xs'}
          className="mt-2 mr-auto"
          variant={props.mode === 'add' ? 'default' : 'outline'}
          disabled={isPending}
        >
          {isPending && <Spinner />}
          ذخیره
        </Button>
      </form>
      {props.mode === 'edit' && <DeleteNoteButton id={props.note.id} />}
    </>
  )
}

const DeleteNoteButton = ({ id }: { id: string }) => {
  const router = useRouter()
  const qc = useQueryClient()
  const { mutate, isPending } = useMutation(
    client.note.delete.mutationOptions({
      onSuccess() {
        qc.cancelQueries({ queryKey: client.note.getAll.queryKey() })
        const previousNotes = qc.getQueryData(
          client.note.getAll.queryKey()
        ) as Note[]
        const newNotes = previousNotes.filter((n) => n.id !== id)
        qc.setQueryData(client.note.getAll.queryKey(), newNotes)
        toast.info('یادداشت حذف شد')
        router.push('/notes')
      },
    })
  )
  const onDelete = () => mutate(id)
  return (
    <Button
      size={'sm'}
      onClick={onDelete}
      disabled={isPending}
      variant={'secondary'}
      className="mt-2 w-full bg-destructive/10 text-destructive dark:bg-destructive/25"
    >
      {isPending ? <Spinner /> : <TrashIcon />}
      حذف یادداشت
    </Button>
  )
}
