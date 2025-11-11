'use client'
import { notFound } from 'next/navigation'
import Loading from '@/app/(app)/loading'
import { NoteForm } from '@/features/note'
import { useGetNote } from '@/features/note/hooks'
import { AppHeader } from '@/shared/components/layouts/app-header'

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
