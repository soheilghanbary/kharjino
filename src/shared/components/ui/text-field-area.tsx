import {
  type ForwardedRef,
  forwardRef,
  type TextareaHTMLAttributes,
  useId,
} from 'react'
import { Label } from '@/shared/components/ui/label'
import { Textarea } from '@/shared/components/ui/textarea'
import { cn } from '@/shared/lib/utils'

type TextFieldAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  description?: string
  error?: string
}

export const TextFieldArea = forwardRef(function MyInput(
  { label, className, error, description, ...rest }: TextFieldAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  const id = useId()
  return (
    <div className={cn('grid gap-2 [&>label]:text-sm', className)}>
      <Label htmlFor={id}>{label}</Label>
      <Textarea id={id} ref={ref} {...rest} />
      {description && (
        <span className="text-muted-foreground text-xs">{description}</span>
      )}
      {error && (
        <span className="font-medium text-destructive text-xs">{error}</span>
      )}
    </div>
  )
})
