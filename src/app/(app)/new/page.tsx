import { AppHeader } from '@/components/layouts/app-header'
import { TransactionForm } from './components/transaction-form'

export default function NewPage() {
  return (
    <div>
      <AppHeader title="افزودن" />
      <TransactionForm mode="add" />
    </div>
  )
}
