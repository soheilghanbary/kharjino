'use client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns-jalali'
import type { Note } from 'generated/prisma'
import Link from 'next/link'
import { Skeleton } from '@/components/ui/skeleton'
import { client } from '@/rpc/orpc.client'

const NoteCard = (note: Note) => {
  return (
    <Link
      href={`/notes/${note.id}`}
      className="rounded-2xl bg-muted p-3 dark:bg-card"
    >
      <h2 className="font-medium text-sm/6">{note.title}</h2>
      <p className="line-clamp-3 text-foreground/65 text-xs/6">
        {note.description}
      </p>
      <p className="text-left text-foreground/65 text-xs/6">
        {format(note.createdAt, 'd MMMM yyyy')}
      </p>
    </Link>
  )
}

const NoteListLoading = () =>
  Array.from({ length: 4 }).map((_, i) => (
    <div
      key={i}
      className="grid min-h-20 gap-4 rounded-2xl bg-muted p-3 dark:bg-card"
    >
      <Skeleton className="h-5 w-1/3" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-3 w-full" />
        <Skeleton className="mr-auto h-3 w-1/5" />
      </div>
    </div>
  ))

export const NoteList = () => {
  const { data, isPending } = useQuery(client.note.getAll.queryOptions())
  if (isPending || !data)
    return (
      <div className="fade-up-transition grid gap-y-2">
        <NoteListLoading />
      </div>
    )
  return (
    <div className="fade-up-transition grid gap-y-2">
      {data.map((n) => (
        <NoteCard key={n.id} {...n} />
      ))}
    </div>
  )
}
