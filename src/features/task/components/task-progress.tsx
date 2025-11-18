'use client'
import { useQuery } from '@tanstack/react-query'
import { client } from '@/server/lib/orpc.client'
import { Progress } from '@/shared/components/ui/progress'

type Task = {
  id: string
  done: boolean
}

const useTaskProgress = () => {
  const { data: tasks, isLoading } = useQuery<Task[]>(
    client.task.getAll.queryOptions()
  )

  const progress =
    tasks && tasks.length > 0
      ? Math.round((tasks.filter((t) => t.done).length / tasks.length) * 100)
      : 0

  return { progress, isLoading }
}

const getIndicatorClass = (progress: number) => {
  if (progress === 100) return 'bg-success'
  if (progress >= 50) return 'bg-warning'
  return 'bg-danger'
}

const LoadingSkeleton = () => (
  <div className="grid max-w-32 grow gap-1">
    <span className="text-muted-foreground text-xs">در حال بارگذاری...</span>
    <Progress value={0} />
  </div>
)

export const TaskProgress = () => {
  const { progress, isLoading } = useTaskProgress()
  if (isLoading) return <LoadingSkeleton />
  return (
    <div className="grid max-w-32 grow gap-1">
      <span className="text-muted-foreground text-xs">
        انجام شده: {progress}%
      </span>
      <Progress value={progress} indicatorclass={getIndicatorClass(progress)} />
    </div>
  )
}
