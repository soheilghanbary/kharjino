import { AppHeader } from '@/components/layouts/app-header'
import { NoteForm } from '../components/note-form'

export default function Page() {
  return (
    <>
      <AppHeader title="افزودن یادداشت" />
      <NoteForm mode="add" />
    </>
  )
}
