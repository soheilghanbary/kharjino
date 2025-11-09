'use client'
import { useQuery } from '@tanstack/react-query'
import { notFound, useParams } from 'next/navigation'
import Loading from '@/app/(app)/loading'
import { NoteForm } from '@/features/note'
import { client } from '@/rpc/orpc.client'
import { AppHeader } from '@/shared/components/layouts/app-header'

const useGetNote = () => {
  const { id } = useParams() as { id: string }
  return useQuery(client.note.getById.queryOptions({ input: id }))
}

const NoteDetail = () => {
  const { data: note, error, isLoading } = useGetNote()
  if (isLoading) return <Loading />
  if (error || !note) {
    notFound()
  }
  return <NoteForm mode="edit" note={note} />
}

export default () => {
  return (
    <>
      <AppHeader title="ویرایش یادداشت" />
      <NoteDetail />
    </>
  )
}
