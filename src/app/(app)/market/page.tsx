'use client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns-jalali'
import { CalendarIcon } from '@/assets/icons/bulk'
import { AppHeader } from '@/components/layouts/app-header'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'

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

const RowItem = ({ item }: { item: CurrencyItem }) => (
  <div className="grid grid-cols-3 items-center gap-2 px-4 py-2 font-medium text-foreground text-xs">
    <p>{item.name}</p>
    <p
      className={cn(
        'ltr text-center font-normal',
        item.change_value > 0 && 'text-success',
        item.change_value < 0 && 'text-danger'
      )}
    >
      {item.change_value}
    </p>
    <p className="whitespace-nowrap text-left">
      {item.price.toLocaleString('fa-IR')}
    </p>
  </div>
)

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
      const response = await fetch(
        // `https://BrsApi.ir/Api/Market/Gold_Currency.php?key=${process.env.NEXT_PUBLIC_BRSAPI_KEY}`
        'https://brsapi.ir/Api/Market/Sample/FreeApi_Gold_Currency.json'
      )
      return await response.json()
    },
    staleTime: 1000 * 30, // جلوگیری از refetch بی‌دلیل
  })

  const renderList = (items?: CurrencyItem[]) => (
    <section className="mt-1 grid gap-1">
      {isLoading
        ? Array.from({ length: 6 }).map((_, i) => <SkeletonRowItem key={i} />)
        : items?.map((i) => <RowItem key={i.symbol} item={i} />)}
    </section>
  )

  return (
    <>
      <AppHeader title="مارکت" />
      <section className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-medium text-xs">
            <span className="relative flex size-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-400 opacity-75" />
              <span className="relative inline-flex size-3 rounded-full bg-teal-500" />
            </span>
            قیمت لحظه ای بازار
          </h3>
          <span className="flex items-center gap-1.5 rounded-full bg-muted px-2 py-1.5 font-medium text-foreground/75 text-xs dark:bg-card">
            {format(new Date(), 'yyyy/MM/d')}
            <CalendarIcon className="size-4" />
          </span>
        </div>
        <Tabs defaultValue="gold">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              className="data-[state=active]:bg-muted data-[state=active]:text-foreground dark:data-[state=active]:text-foreground"
              value="gold"
            >
              🪙 طلا
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-muted data-[state=active]:text-foreground dark:data-[state=active]:text-foreground"
              value="currency"
            >
              💵 ارز
            </TabsTrigger>
            {/* <TabsTrigger value="crypto">🔐 کریپتو</TabsTrigger> */}
          </TabsList>
          <div className="sticky top-2 grid grid-cols-3 items-center gap-2 rounded-full border p-3 text-xs shadow-xs backdrop-blur-md">
            <p>نام</p>
            <p className="text-center">آخرین تغییرات</p>
            <p className="whitespace-nowrap text-left">قیمت (تومان)</p>
          </div>
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
