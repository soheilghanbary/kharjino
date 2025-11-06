'use client'
import { Filter } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'

export function TaskFilter() {
  const [filter, setFilter] = useQueryState('filter')
  const isSelected = (value: string | null) =>
    filter === value || (value === null && filter === null)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm">
          <Filter />
          اولویت
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>اولویت‌ها</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={() => setFilter(null)}
          className={cn(isSelected(null) && 'bg-secondary')}
        >
          🔵 همه
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setFilter('0')}
          className={cn(isSelected('0') && 'bg-secondary')}
        >
          🟢 پایین
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setFilter('1')}
          className={cn(isSelected('1') && 'bg-secondary')}
        >
          🟠 متوسط
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setFilter('2')}
          className={cn(isSelected('2') && 'bg-secondary')}
        >
          🔴 بالا
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
