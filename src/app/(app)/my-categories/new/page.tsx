'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { client } from '@/server/lib/orpc.client'
import { AppHeader } from '@/shared/components/layouts/app-header'
import { Button } from '@/shared/components/ui/button'
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
} from '@/shared/components/ui/emoji-picker'
import { Label } from '@/shared/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { Spinner } from '@/shared/components/ui/spinner'
import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { TextField } from '@/shared/components/ui/text-field'
import { createCategorySchema } from '../schemas'

export default function NewCategoryPage() {
  const { push } = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const { register, handleSubmit, control, watch } = useForm({
    resolver: zodResolver(createCategorySchema),
    defaultValues: {
      type: 'expense',
      icon: '',
    },
  })
  const { mutateAsync, isPending } = useMutation(
    client.category.create.mutationOptions({
      onSuccess() {
        toast.success('دسته بندی با موفقیت ایجاد شد')
        push('/my-categories')
      },
    })
  )
  const icon = watch('icon')
  const onSubmit = handleSubmit(async (data) => await mutateAsync(data))

  return (
    <>
      <AppHeader title="دسته بندی جدید" />
      <form onSubmit={onSubmit}>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <p className="font-medium text-sm">نوع دسته بندی</p>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Tabs defaultValue={field.value} onValueChange={field.onChange}>
                  <TabsList>
                    <TabsTrigger value="expense">هزینه</TabsTrigger>
                    <TabsTrigger value="income">درآمد</TabsTrigger>
                  </TabsList>
                </Tabs>
              )}
            />
          </div>
          <TextField label="نام" {...register('name')} />
          <div className="grid gap-2">
            <Label>انتخاب آیکون</Label>
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <Button variant={'outline'} className="bg-card shadow-none">
                  {icon.length > 0 ? `${icon} انتخاب شده` : 'کلیک کنید'}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-fit p-1">
                <Controller
                  control={control}
                  name="icon"
                  render={({ field }) => (
                    <EmojiPicker
                      className="h-[342px]"
                      onEmojiSelect={({ emoji }) => {
                        field.onChange(emoji)
                        setIsOpen(false)
                      }}
                    >
                      <EmojiPickerSearch />
                      <EmojiPickerContent />
                      <EmojiPickerFooter />
                    </EmojiPicker>
                  )}
                />
              </PopoverContent>
            </Popover>
          </div>
          <Button type="submit" disabled={isPending}>
            {isPending && <Spinner />}
            ایجاد دسته بندی
          </Button>
        </div>
      </form>
    </>
  )
}
