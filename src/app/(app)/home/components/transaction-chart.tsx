'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import type { TransactionType } from 'generated/prisma'
import { LoaderIcon } from 'lucide-react'
import { Suspense, useState } from 'react'
import { Fragment } from 'react/jsx-runtime'
import { Bar, BarChart, CartesianGrid, Cell, XAxis } from 'recharts'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { client } from '@/rpc/orpc.client'

const chartColors = [
  'var(--color-chart-1)',
  'var(--color-chart-2)',
  'var(--color-chart-3)',
  'var(--color-chart-4)',
  'var(--color-chart-5)',
]

const chartConfig = {
  total: { label: 'مبلغ', color: 'var(--chart-1)' },
} satisfies ChartConfig

const ChartView = ({ type = 'expense' }: { type?: TransactionType }) => {
  const { data: chartData } = useSuspenseQuery(
    client.transaction.byCategory.queryOptions({ input: type })
  )
  return (
    <ChartContainer config={chartConfig}>
      <BarChart data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        <Bar dataKey="total" radius={8}>
          {chartData?.map((_entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={chartColors[index % chartColors.length]}
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}

export function TransactionChart() {
  const [tType, setTType] = useState<TransactionType>('expense')
  return (
    <Fragment>
      <Tabs
        defaultValue={tType}
        onValueChange={(e) => setTType(e as TransactionType)}
      >
        <TabsList className="mt-4 grid w-full grid-cols-2">
          <TabsTrigger value="expense">هزینه ها</TabsTrigger>
          <TabsTrigger value="income">درآمد ها</TabsTrigger>
        </TabsList>
      </Tabs>
      <Card className="mt-2 mb-4 shadow-none">
        <CardHeader>
          <CardTitle>گزارش دسته‌بندی‌ها</CardTitle>
          <CardDescription>خلاصه خرج‌ها بر اساس دسته‌بندی</CardDescription>
        </CardHeader>
        <CardContent>
          <Suspense
            fallback={
              <div className="grid h-[170px] place-items-center">
                <LoaderIcon className="size-5 animate-spin" />
              </div>
            }
          >
            <ChartView type={tType} />
          </Suspense>
        </CardContent>
      </Card>
    </Fragment>
  )
}
