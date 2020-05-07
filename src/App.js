import React, { useState, useEffect } from 'react'
import { DateTime } from 'luxon'
import * as R from 'ramda'

import { NavBar } from './NavBar'
import { TaskInput } from './TaskInput'
import { Categories } from './Categories'
import { WatchToggledButton } from './WatchToggledButton'
import { StopWatch } from './StopWatch'
import { TasksTable } from './TasksTable'

import { getTasks, createTask, removeTask } from './apis'
import { restructureTask } from './utils'

const App = () => {
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

  const removeTaskAndSetState = (taskId) => () => {
    removeTask(taskId).then(() => {
      const isRemovedTasks = (task) => task.id === taskId
      const tasks = R.reject(isRemovedTasks, allTasks)
      setAllTasks(tasks)
    })
  }

  const onTaskChange = (event) => {
    setTask(event.target.value)
  }

  const onCategoryChange = (event) => {
    setSelectedCategory(event.target.value)
  }

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
    <div className='App'>
      <NavBar />
      <div className='container' role='main' style={{ marginTop: '100px' }}>
        <div className='row'>
          <TaskInput state={task} onChange={onTaskChange} />
          <Categories selectedCategory={selectedCategory} onChange={onCategoryChange} />
          <WatchToggledButton isStarted={isWatchStarted} onStart={onStartWatch} />
          <StopWatch isEnabled={isWatchStarted} />
        </div>

        <TasksTable allTasks={allTasks} removeTaskAndSetState={removeTaskAndSetState} />
      </div>
    </div>
  )
}

export default App
