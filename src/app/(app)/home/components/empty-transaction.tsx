import { PlusCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const EmptyTransactionList = () => (
  <div className="fade-up-transition flex h-48 flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed bg-card">
    <p className="font-medium text-sm">تراکنشی ای ثبت نشده!</p>
    <Button asChild className="h-10 px-10 text-primary" variant={'secondary'}>
      <Link href={'/new'}>
        <PlusCircleIcon />
        تراکنش جدید
      </Link>
    </Button>
  </div>
)
