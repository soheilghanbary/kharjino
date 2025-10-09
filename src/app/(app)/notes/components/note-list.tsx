'use client'
import { useQuery } from '@tanstack/react-query'
import { format } from 'date-fns-jalali'
import type { Note } from 'generated/prisma'
import Link from 'next/link'
import { Spinner } from '@/components/ui/spinner'
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

export const NoteList = () => {
  const { data, isPending } = useQuery(client.note.getAll.queryOptions())
  if (isPending || !data)
    return <Spinner className="mx-auto my-8 size-5 text-primary" />
  return (
    <div className="fade-up-transition grid gap-y-2">
      {data.map((n) => (
        <NoteCard key={n.id} {...n} />
      ))}
    </div>
  )
}
