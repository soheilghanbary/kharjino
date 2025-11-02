'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns-jalali'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Spinner } from '@/components/ui/spinner'
import type { Category, Transaction } from '@/db/schema'
import { client } from '@/rpc/orpc.client'

type TransactionCardProps = Transaction & {
  category: Category
}

export const TransactionCard = ({
  id,
  amount,
  date,
  description,
  category,
}: TransactionCardProps) => {
  const qc = useQueryClient()
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useMutation(
    client.transaction.delete.mutationOptions({
      onSuccess() {
        qc.invalidateQueries(client.transaction.summary.queryOptions())
        qc.invalidateQueries(client.transaction.recent.queryOptions())
        qc.invalidateQueries(client.transaction.byCategory.queryOptions())
        toast.info('تراکنش حذف شد')
        setOpen(false)
      },
    })
  )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex items-center gap-3 rounded-lg p-3 transition-all duration-150">
          <p className="size-fit rounded-full bg-primary/5 p-1 text-primary text-xl">
            {category.icon.length ? category.icon : '💷'}
          </p>
          <div className="grow">
            <p className="font-medium text-xs/6">{category.name}</p>
            <p className="text-muted-foreground text-tiny">
              {description?.length ? description : 'بدون توضیحات'}
            </p>
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm/6">
              {amount.toLocaleString('fa-IR')} تومان
            </p>
            <p className="text-muted-foreground text-tiny">
              {format(date, 'yyy/MM/d')}
            </p>
          </div>
        </div>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>عملیات</DrawerTitle>
          <DrawerDescription>میخوای ویرایش یا حذف کنی؟</DrawerDescription>
        </DrawerHeader>
        <div className="grid grid-cols-2 gap-4">
          <Button variant={'secondary'} asChild>
            <Link href={`/transactions/${id}`}>ویرایش</Link>
          </Button>
          <Button onClick={() => mutate(id)} variant={'destructive'}>
            {isPending && <Spinner />}
            حذف تراکنش
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
