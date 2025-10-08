'use client'
import { useQuery } from '@tanstack/react-query'
import type { TransactionType } from 'generated/prisma'
import { useState } from 'react'
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

export function TransactionChart() {
  const [transactionType, setTransactionType] =
    useState<TransactionType>('expense')
  const { data: chartData } = useQuery(
    client.transaction.byCategory.queryOptions({ input: transactionType })
  )

  const chartConfig = {
    total: { label: 'مبلغ', color: 'var(--chart-1)' },
  } satisfies ChartConfig

  return (
    <Fragment>
      <Tabs
        defaultValue={transactionType}
        onValueChange={(e) => setTransactionType(e as TransactionType)}
      >
        <TabsList className="grid w-full grid-cols-2">
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
                {chartData?.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={chartColors[index % chartColors.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </Fragment>
  )
}
