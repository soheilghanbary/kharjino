'use client'
import { CheckIcon, FilterIcon } from 'lucide-react'
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

export const TransactionFilter = () => {
  const [sort, setSort] = useQueryState('sort', {
    defaultValue: 'newest',
  })

  const sortOptions = [
    { value: 'newest', label: 'جدیدترین' },
    { value: 'oldest', label: 'قدیمی‌ترین' },
    { value: 'highest', label: 'بیشترین مبلغ' },
    { value: 'lowest', label: 'کمترین مبلغ' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon">
          <FilterIcon className="size-5 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>مرتب‌سازی بر اساس</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => setSort(option.value)}
            className="flex items-center justify-between"
          >
            <span>{option.label}</span>
            {sort === option.value && (
              <CheckIcon className="size-4 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
