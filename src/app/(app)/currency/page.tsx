'use client'
import { useQuery } from '@tanstack/react-query'
import { AppHeader } from '@/components/layouts/app-header'

interface CurrencyItem {
  date: string
  time: string
  time_unix: number
  symbol: string
  name_en: string
  name: string
  price: number
  unit: string
}

interface CurrencyList {
  gold: CurrencyItem[]
  currency: CurrencyItem[]
  cryptocurrency: CurrencyItem[]
}

export default () => {
  const { data, isLoading } = useQuery<CurrencyList>({
    queryKey: ['currency'],
    queryFn: async () => {
      const response = await fetch(
        // `https://brsapi.ir/Api/Market/Gold_Currency.php?key=${process.env.NEXT_PUBLIC_BRSAPI_KEY}`
        'https://brsapi.ir/Api/Market/Sample/FreeApi_Gold_Currency.json'
      )
      const data = await response.json()
      return data
    },
  })

  if (isLoading) return <p>loading ...</p>

  return (
    <>
      <AppHeader title="ارز ها" />
      <div className="grid gap-2">
        {data?.gold.map((c) => (
          <div
            key={c.price}
            className="rounded-lg bg-muted p-3 text-sm dark:bg-card"
          >
            <p>{c.name}</p>
            <p>{c.price.toLocaleString('fa-IR')} تومان</p>
          </div>
        ))}
      </div>
    </>
  )
}
