import { useQuery } from '@tanstack/react-query'
import type { TransactionType } from '@/db/schema'
import { client } from '@/rpc/orpc.client'
import { Label } from '@/shared/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { Spinner } from '@/shared/components/ui/spinner'

type Props = {
  type: TransactionType
  initialValue?: string
  onChange?: (value: string) => void
}

export function CategorySelect({ type, initialValue, onChange }: Props) {
  const { data, isPending } = useQuery(
    client.category.getAll.queryOptions({
      input: type,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    })
  )

  return (
    <div className="grid gap-2">
      <Label>دسته بندی</Label>
      <Select defaultValue={initialValue} onValueChange={onChange}>
        <SelectTrigger>
          <SelectValue placeholder="انتخاب دسته بندی" />
        </SelectTrigger>
        <SelectContent className="h-56">
          {isPending ? (
            <Spinner className="mx-auto my-4 text-center text-primary" />
          ) : (
            data?.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.icon} {c.name}
              </SelectItem>
            ))
          )}
        </SelectContent>
      </Select>
    </div>
  )
}
