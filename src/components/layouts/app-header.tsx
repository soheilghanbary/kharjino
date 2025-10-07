import { BackButton } from '../common/back-button'

type Props = {
  title: string
  leftChild?: React.ReactNode
}

export function AppHeader({ title, leftChild }: Props) {
  return (
    <header className="relative mb-4 flex w-full items-center justify-between">
      <BackButton />
      <h1 className="-translate-x-1/2 absolute left-1/2 font-medium text-base">
        {title}
      </h1>
      {leftChild}
    </header>
  )
}
