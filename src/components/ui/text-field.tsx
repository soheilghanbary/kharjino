import {
  type ForwardedRef,
  forwardRef,
  type InputHTMLAttributes,
  useId,
} from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  description?: string
  inputClass?: string
  error?: string
}

export const TextField = forwardRef(function MyInput(
  { label, description, error, inputClass, className, ...rest }: TextFieldProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  const id = useId()
  return (
    <div className={cn('grid gap-2 [&>label]:text-sm', className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="text"
        autoComplete="off"
        className={inputClass}
        ref={ref}
        {...rest}
      />
      {description && (
        <span className="text-muted-foreground text-xs">{description}</span>
      )}
      {error && (
        <span className="font-medium text-destructive text-xs">{error}</span>
      )}
    </div>
  )
})
