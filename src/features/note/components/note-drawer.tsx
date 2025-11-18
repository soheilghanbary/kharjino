'use client'
import { VisuallyHidden } from 'radix-ui'
import { useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/shared/components/ui/drawer'
import type { UpdateNoteSchema } from '../schemas'
import { NoteForm } from './note-form'

type DrawerOptions = { mode: 'add' } | { mode: 'edit'; note: UpdateNoteSchema }

type Props = {
  children: React.ReactNode
  options: DrawerOptions
}

export const NoteDrawer = ({ children, options }: Props) => {
  const [open, setOpen] = useState(false)
  const title = options.mode === 'add' ? 'یادداشت جدید' : 'ویرایش یادداشت'
  const handleClose = () => setOpen(false)

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <VisuallyHidden.Root>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription />
          </DrawerHeader>
        </VisuallyHidden.Root>
        {options.mode === 'add' && (
          <NoteForm mode="add" onClose={handleClose} />
        )}
        {options.mode === 'edit' && (
          <NoteForm mode="edit" note={options.note} onClose={handleClose} />
        )}
      </DrawerContent>
    </Drawer>
  )
}
