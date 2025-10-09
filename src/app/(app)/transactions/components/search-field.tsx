import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

export const SearchField = () => {
  return (
    <div className="relative mb-2 flex items-center">
      <Input
        placeholder="جستجو تراکنش"
        className="h-10 border-0 bg-muted/65 ps-9 focus-visible:bg-muted focus-visible:ring-0 dark:bg-card"
      />
      <SearchIcon className="pointer-events-none absolute right-3 size-4 text-muted-foreground" />
    </div>
  )
}
