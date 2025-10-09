import Link from 'next/link'
import { AppHeader } from '@/components/layouts/app-header'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { NoteList } from './components/note-list'

export default function Page() {
  return (
    <>
      <AppHeader title="یادداشت های من" />
      <Button asChild className="w-full">
        <Link href={'/notes/new'}>یادداشت جدید</Link>
      </Button>
      <Separator className="my-4" />
      <NoteList />
    </>
  )
}
