'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TextField } from '@/components/ui/text-field'
import { client } from '@/rpc/orpc.client'
import {
  type CreateTransaction,
  createTransaction,
  type EditTransaction,
} from '../schemas'
import { AmountField } from './amount-field'
import { CategorySelect } from './category-select'
import { DateField } from './date-field'

type Props = {
  mode: 'add' | 'edit'
  transaction?: CreateTransaction & { id?: string }
}

export const TransactionForm = (props: Props) => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createTransaction),
    defaultValues: props.transaction || {
      type: 'expense',
      amount: 0,
      date: new Date(),
      categoryId: '',
      description: '',
    },
  })
  const { mutate: addMutate, isPending: addLoading } = useMutation(
    client.transaction.create.mutationOptions({
      onSuccess() {
        toast.success('تراکنش با موفقیت ایجاد شد')
        router.push('/home')
      },
    })
  )
  const { mutate: editMutate, isPending: editLoading } = useMutation(
    client.transaction.update.mutationOptions({
      onSuccess() {
        toast.success('تراکنش با موفقیت ویرایش شد')
        router.push('/home')
      },
    })
  )
  const onCreate = handleSubmit((data: CreateTransaction | EditTransaction) =>
    props.mode === 'add'
      ? addMutate(data)
      : editMutate({ id: String(props.transaction?.id), ...data })
  )

  return (
    <form onSubmit={onCreate} className="fade-up-transition grid gap-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">نوع تراکنش</p>
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
      <Controller
        control={control}
        name="amount"
        render={({ field }) => (
          <AmountField initialValue={field.value} onChange={field.onChange} />
        )}
      />
      <Controller
        control={control}
        name="date"
        render={({ field }) => (
          <DateField initialValue={field.value} onChange={field.onChange} />
        )}
      />
      <Controller
        control={control}
        name="categoryId"
        render={({ field }) => (
          <CategorySelect
            type={watch('type')}
            initialValue={field.value}
            onChange={field.onChange}
          />
        )}
      />
      <TextField
        label="توضیحات"
        error={errors.description?.message}
        {...register('description')}
      />
      {props.mode === 'edit' ? (
        <Button disabled={editLoading} type="submit" variant={'secondary'}>
          {editLoading && <Spinner />}
          ویرایش
        </Button>
      ) : (
        <Button disabled={addLoading} type="submit">
          {addLoading && <Spinner />}
          ذخیره
        </Button>
      )}
    </form>
  )
}
