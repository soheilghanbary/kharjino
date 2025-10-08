'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Spinner } from '@/components/ui/spinner'
import { Textarea } from '@/components/ui/textarea'
import { client } from '@/rpc/orpc.client'

const schema = z.object({
  title: z.string().min(3, 'عنوان باید حداقل سه کاراکتر باشد'),
  description: z.string(),
})

export const NoteForm = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      description: '',
    },
  })

  const { mutate, isPending } = useMutation(
    client.note.create.mutationOptions({
      onSuccess() {
        toast.info('یادداشت با موفقیت ایجاد شد')
        router.push('/notes')
      },
    })
  )

  const onCreate = handleSubmit((data) => mutate(data))

  return (
    <form
      onSubmit={onCreate}
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
      <hr />
      <Textarea
        placeholder="توضیحات"
        className="resize-none border-0 bg-transparent text-foreground/65 text-xs focus-visible:ring-0 dark:text-muted-foreground"
        {...register('description')}
      />
      <Button type="submit" size={'xs'} className="mt-2 mr-auto">
        {isPending && <Spinner />}
        ذخیره
      </Button>
    </form>
  )
}
