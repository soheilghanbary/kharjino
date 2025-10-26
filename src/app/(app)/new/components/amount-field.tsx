import { useState } from 'react'
import { TextField } from '@/components/ui/text-field'

type Props = {
  initialValue: number
  onChange: (value: number) => void
}

export const AmountField = ({ initialValue, onChange }: Props) => {
  const [inputValue, setInputValue] = useState(initialValue.toLocaleString())
  const convertToEnglishDigits = (str: string): string => {
    return str
      .replace(/[۰-۹]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1728)) // فارسی
      .replace(/[٠-٩]/g, (d) => String.fromCharCode(d.charCodeAt(0) - 1632)) // عربی
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const englishInput = convertToEnglishDigits(e.target.value)
    const rawVal = englishInput.replace(/[^0-9]/g, '')
    const numberVal = rawVal === '' ? 0 : Number(rawVal)
    onChange(numberVal)
    setInputValue(numberVal.toLocaleString('fa-IR'))
  }

  return (
    <TextField
      type="text"
      label="مبلغ (تومان)"
      inputMode="numeric"
      inputClass="text-right"
      value={inputValue}
      onChange={handleChange}
    />
  )
}
