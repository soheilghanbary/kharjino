'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowUp, CheckIcon } from 'lucide-react'
import { Controller, useForm } from 'react-hook-form'
import { createNoteSchema, type UpdateNoteSchema } from '@/features/note'
import { TrashIcon } from '@/shared/assets/icons/bulk'
import { ColorPicker } from '@/shared/components/common/color-picker'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Spinner } from '@/shared/components/ui/spinner'
import { Textarea } from '@/shared/components/ui/textarea'
import { useCreateNote, useDeleteNote, useUpdateNote } from '../hooks'

type NoteFormProps =
  | {
      mode: 'add'
      onClose: () => void
    }
  | {
      mode: 'edit'
      note: UpdateNoteSchema
      onClose: () => void
    }

export const NoteForm = (props: NoteFormProps) => {
  const createMutation = useCreateNote()
  const updateMutation = useUpdateNote()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isDirty },
  } = useForm({
    resolver: zodResolver(createNoteSchema),
    defaultValues:
      props.mode === 'edit'
        ? {
            title: props.note.title,
            description: props.note.description,
            color: props.note.color,
          }
        : {
            title: '',
            description: '',
            color: 'default',
          },
  })
  const onSubmit = handleSubmit((data) => {
    if (props.mode === 'add') {
      createMutation.mutate(data, {
        onSuccess() {
          props.onClose()
        },
      })
    } else {
      updateMutation.mutate(
        {
          id: props.note.id,
          ...data,
        },
        {
          onSuccess() {
            props.onClose()
          },
        }
      )
    }
  })
  const isPending = createMutation.isPending || updateMutation.isPending
  const ButtonIcon = props.mode === 'edit' ? CheckIcon : ArrowUp
  return (
    <>
      <form
        onSubmit={onSubmit}
        className="mt-4 flex flex-col rounded-2xl border"
      >
        <Input
          type="text"
          placeholder="عنوان یادداشت"
          className="border-0 bg-transparent p-3 focus-visible:ring-0"
          {...register('title')}
        />
        {errors.title?.message && (
          <span className="text-destructive text-tiny">
            {errors.title.message}
          </span>
        )}
        <hr />
        <Textarea
          placeholder="توضیحات"
          className="resize-none border-0 bg-transparent text-foreground/65 text-xs/5 focus-visible:ring-0 dark:text-muted-foreground"
          {...register('description')}
        />
        <div className="flex items-center justify-between space-x-2 p-3">
          <Controller
            name="color"
            control={control}
            render={({ field }) => (
              <ColorPicker value={field.value} onChange={field.onChange} />
            )}
          />
          <Button
            size={'icon'}
            type="submit"
            variant={props.mode === 'add' ? 'default' : 'outline'}
            disabled={!isDirty || isPending}
            className="rounded-full"
          >
            {isPending ? <Spinner /> : <ButtonIcon />}
          </Button>
        </div>
      </form>
      {props.mode === 'edit' && <DeleteNoteButton id={props.note.id} />}
    </>
  )
}

const DeleteNoteButton = ({ id }: { id: string }) => {
  const { mutate, isPending } = useDeleteNote(id)
  const onDelete = () => mutate(id)
  return (
    <Button
      size={'xs'}
      onClick={onDelete}
      disabled={isPending}
      variant={'secondary'}
      className="mt-4 bg-destructive/10 text-destructive dark:bg-destructive/25"
    >
      {isPending ? <Spinner /> : <TrashIcon />}
      حذف یادداشت
    </Button>
  )
}
