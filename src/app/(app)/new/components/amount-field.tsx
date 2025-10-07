import { useState } from 'react'
import { TextField } from '@/components/ui/text-field'

type Props = {
  initialValue: number
  onChange: (value: number) => void
}

export const AmountField = ({ initialValue, onChange }: Props) => {
  const [inputValue, setInputValue] = useState(initialValue.toLocaleString())
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '')
    const numberVal = rawVal === '' ? 0 : Number(rawVal)
    onChange(numberVal)
    setInputValue(numberVal.toLocaleString())
  }

  return (
    <TextField
      type="text"
      label="مبلغ (تومان)"
      // pattern="[0-9]*"
      inputMode="numeric"
      inputClass="text-right"
      value={inputValue}
      onChange={handleChange}
    />
  )
}
