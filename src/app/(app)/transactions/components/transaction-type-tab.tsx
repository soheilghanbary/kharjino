'use client'
import { TrendingDown, TrendingUp } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'

export const TransactionTypeTab = ({ type = 'all' }) => {
  const [t, setT] = useQueryState('type', { defaultValue: type })
  return (
    <Tabs defaultValue={t} onValueChange={setT}>
      <TabsList className="mb-2 grid w-full grid-cols-3">
        <TabsTrigger value="all">همه</TabsTrigger>
        <TabsTrigger value="expense">
          <TrendingDown />
          هزینه ها
        </TabsTrigger>
        <TabsTrigger value="income">
          <TrendingUp />
          درآمد ها
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}
