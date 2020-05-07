import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { DateTime } from 'luxon'
import * as R from 'ramda'

import { NavBar } from './NavBar'
import { TaskInput } from './TaskInput'
import { Categories } from './Categories'
import { WatchToggledButton } from './WatchToggledButton'
import { StopWatch } from './StopWatch'
import { Task } from './Task'

import { getTasks, createTask, removeTask } from './apis'
import { restructureTask } from './utils'

const BASE_URL = 'http://localhost:8000'
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
    setTask(event.target.value)
  }

  const onDropdownChange = (event) => {
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
          <Categories selectedCategory={selectedCategory} onChange={onDropdownChange} />
          <WatchToggledButton isStarted={isWatchStarted} onStart={onStartWatch} />
          <StopWatch isEnabled={isWatchStarted} />
        </div>

        {allTasks.length < 1 ? (
          <div className='text-center p-5 my-3 rounded shadow-sm text-dark'>
            <span>No task yet</span>
          </div>
        ) : (
          <div className='my-3 bg-white rounded shadow-sm'>
            <h6 className='border-bottom border-gray p-3 mb-4'>Today</h6>
            {allTasks.map((task) => (
              <Task key={task.id} task={task} removeTask={removeTaskAndSetState(task.id)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
