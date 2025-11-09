'use client'
import { Eye, EyeOff, Filter } from 'lucide-react'
import { useQueryState } from 'nuqs'
import { Button } from '@/shared/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shared/components/ui/dropdown-menu'
import { cn } from '@/shared/lib/utils'

export const ToggleTaskDone = () => {
  const [hideDone, setHideDone] = useQueryState('hideDone', {
    defaultValue: 'false',
  })
  const isHidden = hideDone === 'true'
  const toggle = () => setHideDone(isHidden ? 'false' : 'true')
  return (
    <Button variant="secondary" size="sm" onClick={toggle}>
      {isHidden ? <EyeOff /> : <Eye />}
      {isHidden ? 'نمایش همه' : 'مخفی کردن'}
    </Button>
  )
}

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
