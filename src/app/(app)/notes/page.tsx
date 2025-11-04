import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { Suspense } from 'react'
import { CheckListIcon, NotesIcon } from '@/assets/icons/bulk'
import { AppHeader } from '@/components/layouts/app-header'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { NoteList, NoteListLoading } from './components/note-list'
import { TaskForm } from './components/task-form'
import { TaskList } from './components/task-list'

export default function Page() {
  return (
    <>
      <AppHeader title="دست نویس های من" />
      <Tabs defaultValue="notes">
        <TabsList className="grid w-full grid-cols-2 border-0 bg-transparent">
          <TabsTrigger
            className="flex-col p-0 text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-primary dark:text-muted-foreground dark:data-[state=active]:text-primary"
            value="notes"
          >
            <NotesIcon className="size-5" />
            یادداشت ها
          </TabsTrigger>
          <TabsTrigger
            className="flex-col p-0 text-muted-foreground data-[state=active]:bg-transparent data-[state=active]:text-primary dark:text-muted-foreground dark:data-[state=active]:text-primary"
            value="tasks"
          >
            <CheckListIcon className="size-5" />
            تسک ها
          </TabsTrigger>
        </TabsList>
        <TabsContent value="tasks">
          <TaskForm mode="add" />
          <Suspense fallback={<NoteListLoading />}>
            <TaskList />
          </Suspense>
        </TabsContent>
        <TabsContent value="notes">
          <div className="container-sm fixed inset-x-0 bottom-16 z-10 mx-auto flex w-fit justify-end bg-transparent p-4">
            <Button
              asChild
              size={'sm'}
              className="rounded-full px-4 shadow-none"
            >
              <Link href={'/notes/new'}>
                <PlusIcon className="size-5" />
                یادداشت جدید
              </Link>
            </Button>
          </div>
          <Suspense fallback={<NoteListLoading />}>
            <NoteList />
          </Suspense>
        </TabsContent>
      </Tabs>
    </>
  )
}
