import { Lottie } from '@/shared/components/ui/lottie'
import type { wizardData } from '@/shared/config/site'

type StepCardProps = (typeof wizardData)[number] & {
  isActive: boolean
}

export const StepCard = ({
  title,
  description,
  lottie,
  isActive,
}: StepCardProps) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-80">
        {isActive && (
          <Lottie height={320} animationData={lottie} loop={false} />
        )}
      </div>
      <h2 className="mt-4 font-bold text-lg">{title}</h2>
      <p className="mt-1 text-center text-muted-foreground text-xs">
        {description}
      </p>
    </div>
  )
}
