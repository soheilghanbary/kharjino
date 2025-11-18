import clsx from 'clsx'
import { useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/shared/components/ui/popover'
import { type ColorKey, colorMap } from '@/shared/lib/utils'
import { Button } from '../ui/button'

type Props = {
  value: ColorKey
  onChange: (value: ColorKey) => void
}

export const ColorPicker = ({ value, onChange }: Props) => {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="xs" className="flex items-center gap-2">
          <span
            className={clsx(
              'inline-block size-4 rounded-full border',
              colorMap[value]
            )}
          />
          انتخاب رنگ
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit p-2">
        <div className="grid grid-cols-4 gap-2">
          {Object.entries(colorMap).map(([key, className]) => {
            const selected = key === value
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  onChange(key as ColorKey)
                  setOpen(false)
                }}
                className={clsx(
                  'size-6 rounded-full border transition-all',
                  className,
                  selected
                    ? 'ring-1 ring-muted ring-offset-1'
                    : 'hover:scale-105'
                )}
              />
            )
          })}
        </div>
      </PopoverContent>
    </Popover>
  )
}
