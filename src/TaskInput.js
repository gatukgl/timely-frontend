import React, { useContext } from 'react'

import { TaskContext } from './TaskContext'

export const TaskInput = () => {
  const { task, setTask } = useContext(TaskContext)

  const onTaskChange = (event) => {
    setTask(event.target.value)
  }

  return (
    <div className='col-7'>
      <input
        type='text'
        placeholder='What are you working on?'
        className='form-control form-control-lg'
        value={task}
        name='task'
        onChange={onTaskChange}
      />
    </div>
  )
}
