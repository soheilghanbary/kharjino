'use client'
import { useSuspenseQuery } from '@tanstack/react-query'
import { format } from 'date-fns-jalali'
import type { Note } from '@/server/db/schema'
import { client } from '@/server/lib/orpc.client'
import { NotesIcon } from '@/shared/assets/icons/bulk'
import { Skeleton } from '@/shared/components/ui/skeleton'
import { type ColorKey, cn, colorMap } from '@/shared/lib/utils'
import { NoteDrawer } from './note-drawer'

const NoteCard = ({ id, color, title, description, createdAt }: Note) => {
  const noteColor = color as ColorKey
  const bg = colorMap[noteColor] ?? colorMap.default
  const note = { id, title, color: noteColor, description, createdAt }
  return (
    <NoteDrawer
      options={{
        mode: 'edit',
        note,
      }}
    >
      <div className={cn('rounded-2xl border border-transparent p-3', bg)}>
        <h2 className="font-medium text-sm/6">{title}</h2>
        <p className="line-clamp-3 text-xs/5">{description}</p>
        <p className="text-left text-xs/6">
          {format(createdAt, 'd MMMM yyyy')}
        </p>
      </div>
    </NoteDrawer>
  )
}

export const NoteListLoading = () => (
  <div className="fade-up-transition grid gap-y-2">
    {Array.from({ length: 4 }).map((_, i) => (
      <div
        key={i}
        className="grid min-h-20 gap-4 rounded-2xl bg-muted/30 p-3 dark:bg-card"
      >
        <Skeleton className="h-5 w-1/3" />
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-full" />
          <Skeleton className="mr-auto h-3 w-1/5" />
        </div>
      </div>
    ))}
  </div>
)

export const NoteList = () => {
  const { data } = useSuspenseQuery(
    client.note.getAll.queryOptions({
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    })
  )

  if (!data.length)
    return (
      <div className="flex h-56 flex-col items-center justify-center gap-2 rounded-md border-2 border-dashed bg-muted text-muted-foreground text-sm dark:bg-card">
        <NotesIcon />
        یادداشت نزاشتی
        <span className="text-xs">رو دکمه + بزن و یادداشت ایجاد کنید</span>
      </div>
    )

  return (
    <div className="fade-up-transition mb-14 grid gap-y-2">
      {data.map((n: Note) => (
        <NoteCard key={n.id} {...n} />
      ))}
    </div>
  )
}
