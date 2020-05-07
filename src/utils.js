import { DateTime } from 'luxon'

export const restructureTask = (task) => {
  const startDateTime = DateTime.fromISO(task.started_at)
  const startDate = startDateTime.toLocaleString(DateTime.DATE_HUGE)
  const startTime = startDateTime.toLocaleString(DateTime.TIME_WITH_SECONDS)

  const endDateTime = DateTime.fromISO(task.ended_at)
  const endTime = endDateTime.toLocaleString(DateTime.TIME_WITH_SECONDS)

  return {
    id: task.id,
    name: task.name,
    category: task.category,
    startDate: startDate,
    startTime: startTime,
    endTime: endTime
  }
}
