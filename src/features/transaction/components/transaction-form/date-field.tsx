import { useState } from 'react'
import { Calendar } from '@/shared/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { TextField } from '@/shared/components/ui/text-field'

type Props = {
  initialValue: Date
  onChange: (value: Date) => void
}

export const DateField = ({ initialValue: date, onChange }: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <TextField
          readOnly
          label="تاریخ"
          inputClass="text-right"
          value={new Intl.DateTimeFormat('fa-IR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          }).format(date)}
        />
      </PopoverTrigger>
      <PopoverContent className="flex w-auto items-center justify-center border-0 p-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(e) => {
            if (!e) return
            setOpen(false)
            onChange(e)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}
