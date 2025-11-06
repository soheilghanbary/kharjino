'use client'
import { useQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { Progress } from '@/components/ui/progress'
import { client } from '@/rpc/orpc.client'

export const TaskProgress = () => {
  const { data: tasks, isLoading } = useQuery(client.task.getAll.queryOptions())

  const progress = useMemo(() => {
    if (!tasks || tasks.length === 0) return 0
    const completed = tasks.filter((t) => t.done).length
    return Math.round((completed / tasks.length) * 100)
  }, [tasks])

  const getIndicatorClass = () => {
    if (progress === 100) return 'bg-success'
    if (progress >= 50) return 'bg-warning'
    return 'bg-danger'
  }

  if (isLoading)
    return (
      <div className="grid max-w-32 grow gap-1">
        <span className="text-muted-foreground text-xs">
          در حال بارگذاری...
        </span>
        <Progress value={0} />
      </div>
    )

  return (
    <div className="grid max-w-32 grow gap-1">
      <span className="text-muted-foreground text-xs">
        انجام شده: {progress}%
      </span>
      <Progress value={progress} indicatorclass={getIndicatorClass()} />
    </div>
  )
}
