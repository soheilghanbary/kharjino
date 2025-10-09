import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { AppHeader } from '@/components/layouts/app-header'
import { Spinner } from '@/components/ui/spinner'
import { api } from '@/rpc/orpc.client'
import { NoteForm } from '../components/note-form'

type PageProps = {
  params: Promise<{ id: string }>
}

const NoteDetail = async ({ id }: { id: string }) => {
  const note = await api.note.getById(id)
  if (!note) return notFound()
  return <NoteForm mode="edit" note={note} />
}

export default async function NotePage({ params }: PageProps) {
  const { id } = await params
  return (
    <>
      <AppHeader title="ویرایش یادداشت" />
      <Suspense fallback={<Spinner className="mx-auto my-16 text-primary" />}>
        <NoteDetail id={id} />
      </Suspense>
    </>
  )
}
