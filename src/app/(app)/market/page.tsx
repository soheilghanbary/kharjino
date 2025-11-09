'use client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns-jalali'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { CalendarIcon } from '@/shared/assets/icons/bulk'
import { AppHeader } from '@/shared/components/layouts/app-header'
import { Skeleton } from '@/shared/components/ui/skeleton'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/shared/components/ui/tabs'
import { cn } from '@/shared/lib/utils'

interface CurrencyItem {
  date: string
  time: string
  time_unix: number
  symbol: string
  name_en: string
  name: string
  price: number
  unit: string
  change_value: number
  change_percent: number
}

interface CurrencyList {
  gold: CurrencyItem[]
  currency: CurrencyItem[]
  cryptocurrency: CurrencyItem[]
}

const ChangeIndicator = ({ value }: { value: number }) => {
  if (value > 0) return <TrendingUp className="size-3" />
  if (value < 0) return <TrendingDown className="size-3" />
  return null
}

const RowItem = ({ item }: { item: CurrencyItem }) => {
  const formattedChange =
    (item.change_value > 0 ? '+' : '') +
    item.change_value.toLocaleString('fa-IR')
  return (
    <div className="grid grid-cols-3 items-center gap-2 px-4 py-2 font-medium text-foreground text-xs">
      <p>{item.name}</p>
      <p
        className={cn(
          'ltr inline-flex items-center justify-center gap-1 text-center font-normal',
          item.change_value > 0 && 'text-success',
          item.change_value < 0 && 'text-danger'
        )}
      >
        <ChangeIndicator value={item.change_value} />
        {formattedChange}
      </p>
      <p className="whitespace-nowrap text-left">
        {item.price.toLocaleString('fa-IR')}
      </p>
    </div>
  )
}

const SkeletonRowItem = () => (
  <div className="grid grid-cols-3 items-center gap-2 px-4 py-2">
    <Skeleton className="h-4 w-20 rounded" />
    <Skeleton className="mx-auto h-4 w-14 rounded" />
    <Skeleton className="ml-auto h-4 w-full rounded" />
  </div>
)

export default function CurrencyPage() {
  const { data, isLoading } = useQuery<CurrencyList>({
    queryKey: ['currency'],
    queryFn: async () => {
      const res = await fetch(
        `https://BrsApi.ir/Api/Market/Gold_Currency.php?key=${process.env.NEXT_PUBLIC_BRSAPI_KEY}`
      )
      return res.json()
    },
    staleTime: 30_000, // prevent unnecessary refetching
  })

  const renderList = (items?: CurrencyItem[]) => (
    <section className="mt-1 grid gap-1">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => <SkeletonRowItem key={i} />)
        : items?.map((item) => <RowItem key={item.symbol} item={item} />)}
    </section>
  )

  const HeaderBar = () => (
    <div className="flex items-center justify-between">
      <h3 className="flex items-center gap-2 font-medium text-xs">
        <span className="relative flex size-3">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
          <span className="relative inline-flex size-3 rounded-full bg-teal-500" />
        </span>
        قیمت لحظه‌ای بازار
      </h3>
      <span className="flex items-center gap-1.5 rounded-full bg-muted px-2 py-1.5 font-medium text-foreground/75 text-xs dark:bg-card">
        {format(new Date(), 'yyyy/MM/d')}
        <CalendarIcon className="size-4" />
      </span>
    </div>
  )

  const TableHeader = () => (
    <div className="sticky top-2 grid grid-cols-3 items-center gap-2 rounded-full border bg-card/65 p-3 text-xs shadow-xs backdrop-blur-md">
      <p>نام</p>
      <p className="text-center">آخرین تغییرات</p>
      <p className="whitespace-nowrap text-left">قیمت (تومان)</p>
    </div>
  )

  return (
    <>
      <AppHeader title="مارکت" />
      <section className="space-y-2">
        <HeaderBar />
        <Tabs defaultValue="gold">
          <TabsList className="grid w-full grid-cols-2">
            {[
              { label: '🪙 طلا', value: 'gold' },
              { label: '💵 ارز', value: 'currency' },
              // { label: '🔐 کریپتو', value: 'crypto' },
            ].map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="data-[state=active]:bg-muted data-[state=active]:text-foreground dark:data-[state=active]:text-foreground"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TableHeader />
          <TabsContent value="gold">{renderList(data?.gold)}</TabsContent>
          <TabsContent value="currency">
            {renderList(data?.currency)}
          </TabsContent>
          <TabsContent value="crypto">
            {renderList(data?.cryptocurrency)}
          </TabsContent>
        </Tabs>
      </section>
    </>
  )
}
