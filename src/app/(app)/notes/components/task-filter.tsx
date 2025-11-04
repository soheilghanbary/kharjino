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

export function TaskFilter() {
  const [_, setFilter] = useQueryState('filter')
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="sm" className="mb-4">
          <Filter />
          فیلتر
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>اولویت‌ها</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => setFilter(null)}>
          🔵 همه
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFilter('0')}>
          🟢 پایین
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFilter('1')}>
          🟠 متوسط
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setFilter('2')}>
          🔴 بالا
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
