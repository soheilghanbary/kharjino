import { NoteForm } from '@/features/note'
import { AppHeader } from '@/shared/components/layouts/app-header'

export default function Page() {
  return (
    <>
      <AppHeader title="افزودن یادداشت" />
      <NoteForm mode="add" />
    </>
  )
}
