'use client'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { format } from 'date-fns-jalali'
import type { Prisma } from 'generated/prisma'
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
import { client } from '@/rpc/orpc.client'
import { useRouter } from 'next/navigation'

type TransactionCardProps = Prisma.TransactionGetPayload<{
  include: { category: true }
}>

export const TransactionCard = ({
  id,
  amount,
  date,
  description,
  category,
}: TransactionCardProps) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const { mutate, isPending } = useMutation(
    client.transaction.delete.mutationOptions({
      onSuccess() {
        // qc.invalidateQueries({ queryKey: client.transaction.getAll.key() })
        router.refresh()
        toast.info('تراکنش حذف شد')
        setOpen(false)
      },
    })
  )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <div className="flex items-center gap-3 rounded-lg border-b p-3 shadow-xs duration-150 last:border-b-0 hover:bg-muted dark:hover:bg-card">
          <p className="size-fit rounded-full bg-primary/5 p-2 text-primary">
            🛍️
          </p>
          <div className="grow">
            <p className="font-medium text-xs/6">{category.name}</p>
            <p className="text-muted-foreground text-tiny">{description}</p>
          </div>
          <div className="text-left">
            <p className="font-medium text-sm/6">
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
          <Button variant={'outline'} asChild>
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
