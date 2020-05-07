import React, { useContext } from 'react'
import { DateTime } from 'luxon'

import { TaskContext } from './TaskContext'
import { createTask } from './apis'
import { restructureTask } from './utils'

export const WatchToggledButton = () => {
  const {
    allTasks,
    isWatchStarted,
    setWatchStarted,
    task,
    selectedCategory,
    startedAt,
    setAllTasks,
    setStartedAt,
    setEndedAt
  } = useContext(TaskContext)

  const onStartWatch = (isStart) => () => {
    setWatchStarted(isStart)
    const currentDateTime = DateTime.local().toUTC()

    if (isStart) {
      setStartedAt(currentDateTime)
    } else {
      setEndedAt(currentDateTime)
      const taskItem = {
        name: task,
        category: selectedCategory,
        started_at: startedAt,
        ended_at: currentDateTime
      }
      createTaskAndSetState(taskItem)
    }
  }

  const createTaskAndSetState = (task) => {
    createTask(task).then((response) => {
      const newTask = restructureTask(response)
      const tasks = allTasks.concat(newTask)
      setAllTasks(tasks)
    })
  }

  return (
    <div className='col'>
      {isWatchStarted ? (
        <button type='button' className='btn btn-danger btn-lg' onClick={onStartWatch(false)}>
          Stop
        </button>
      ) : (
        <button type='button' className='btn btn-success btn-lg' onClick={onStartWatch(true)}>
          Start
        </button>
      )}
    </div>
  )
}
