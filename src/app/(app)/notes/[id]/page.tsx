'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { notFound, useParams } from 'next/navigation'
import { Suspense } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { Spinner } from '@/components/ui/spinner'
import { client } from '@/rpc/orpc.client'
import { NoteForm } from '../components/note-form'

const useGetNote = () => {
  const { id } = useParams() as { id: string }
  return useSuspenseQuery(client.note.getById.queryOptions({ input: id }))
}

const NoteDetail = () => {
  const { data: note } = useGetNote()
  if (!note) notFound()
  return <NoteForm mode="edit" note={note} />
}

export default () => {
  return (
    <>
      <AppHeader title="ویرایش یادداشت" />
      <Suspense fallback={<Spinner className="mx-auto my-16 text-primary" />}>
        <NoteDetail />
      </Suspense>
    </>
  )
}
