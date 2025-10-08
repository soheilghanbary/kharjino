import { AppHeader } from '@/components/layouts/app-header'
import { NoteForm } from '../new/components/note-form'

export default function NotePage() {
  return (
    <>
      <AppHeader title="ویرایش یادداشت" />
      <NoteForm />
    </>
  )
}
