import React, { useContext } from 'react'
import * as R from 'ramda'

import { Task } from './Task'
import { TaskContext } from './TaskContext'
import { removeTask } from './apis'

export const TasksTable = () => {
  const { allTasks, setAllTasks } = useContext(TaskContext)

  const removeTaskAndSetState = (taskId) => () => {
    removeTask(taskId).then(() => {
      const isRemovedTasks = (task) => task.id === taskId
      const tasks = R.reject(isRemovedTasks, allTasks)
      setAllTasks(tasks)
    })
  }

  return (
    <>
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
    </>
  )
}
