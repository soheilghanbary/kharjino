'use client'
import { useQuery } from '@tanstack/react-query'
import { notFound, useParams } from 'next/navigation'
import { client } from '@/rpc/orpc.client'
import { AppHeader } from '@/shared/components/layouts/app-header'
import Loading from '../../loading'
import { CategoryTransactionList } from './components/category-transaction-list'

export default function CategoryPage() {
  const { id } = useParams() as { id: string }
  const { data, isPending } = useQuery(
    client.category.getById.queryOptions({
      input: id,
    })
  )

  if (isPending) return <Loading />
  if (!data) notFound()

  return (
    <>
      <AppHeader title={data.name} />
      <section className="fade-up-transition grid gap-4">
        <CategoryTransactionList categoryId={data.id} />
      </section>
    </>
  )
}
