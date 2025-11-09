import { redirect } from 'next/navigation'
import { getUserId } from '@/shared/lib/helpers'
import StepSlider from './components/step-slider'

export default async function WizardPgae() {
  const userId = await getUserId()
  if (userId) return redirect('/home')
  return (
    <div className="container-sm min-h-svh bg-background p-4">
      <StepSlider />
    </div>
  )
}
