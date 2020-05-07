import React, { useState, useEffect, createContext } from 'react'

import { getTasks } from './apis'
import { restructureTask } from './utils'

export const TaskContext = createContext()

export const TaskContextProvider = ({ children }) => {
  const [allTasks, setAllTasks] = useState([])
  const [task, setTask] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [isWatchStarted, setWatchStarted] = useState(false)
  const [startedAt, setStartedAt] = useState('')
  const [endedAt, setEndedAt] = useState('')

  useEffect(() => {
    getTasks().then((response) => {
      const restructuredTasks = response.map((task) => restructureTask(task))
      setAllTasks(restructuredTasks)
    })
  }, [])

  const taskContext = {
    allTasks,
    task,
    selectedCategory,
    isWatchStarted,
    startedAt,
    endedAt,
    setAllTasks,
    setTask,
    setSelectedCategory,
    setWatchStarted,
    setStartedAt,
    setEndedAt
  }
  return <TaskContext.Provider value={taskContext}>{children}</TaskContext.Provider>
}
