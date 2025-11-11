import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'
import type { Note } from '@/db/schema'
import { client } from '@/rpc/orpc.client'

export const useGetNote = () => {
  const { id } = useParams() as { id: string }
  return useQuery(
    client.note.getById.queryOptions({
      input: id,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
    })
  )
}

export const useCreateNote = () => {
  const router = useRouter()
  const qc = useQueryClient()
  return useMutation(
    client.note.create.mutationOptions({
      onSuccess(res) {
        qc.cancelQueries({ queryKey: client.note.getAll.queryKey() })
        const previousNotes = qc.getQueryData(
          client.note.getAll.queryKey()
        ) as Note[]
        qc.setQueryData(client.note.getAll.queryKey(), [res, ...previousNotes])
        toast.info('یادداشت ایجاد شد')
        router.push('/notes')
      },
    })
  )
}

export const useUpdateNote = () => {
  const router = useRouter()
  const qc = useQueryClient()
  return useMutation(
    client.note.update.mutationOptions({
      onSuccess(res) {
        qc.cancelQueries({ queryKey: client.note.getAll.queryKey() })
        const previousNotes = qc.getQueryData(
          client.note.getAll.queryKey()
        ) as Note[]
        const newNote = previousNotes.map((n) => {
          if (n.id === res.id) return res
          return n
        })
        qc.setQueryData(client.note.getAll.queryKey(), newNote)
        toast.info('یادداشت ویرایش شد')
        router.push('/notes')
      },
    })
  )
}

export const useDeleteNote = (id: string) => {
  const router = useRouter()
  const qc = useQueryClient()
  return useMutation(
    client.note.delete.mutationOptions({
      onSuccess() {
        qc.cancelQueries({ queryKey: client.note.getAll.queryKey() })
        const previousNotes = qc.getQueryData(
          client.note.getAll.queryKey()
        ) as Note[]
        const newNotes = previousNotes.filter((n) => n.id !== id)
        qc.setQueryData(client.note.getAll.queryKey(), newNotes)
        toast.info('یادداشت حذف شد')
        router.push('/notes')
      },
    })
  )
}
