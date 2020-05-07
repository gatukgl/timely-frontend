import React from 'react'

export const Task = ({ task, removeTask }) => (
  <div key={task.id}>
    <div className='row m-2 py-2 border-bottom border-gray align-items-center d-flex justify-content-between'>
      <div className='col'>
        <span>{task.name}</span>
        <span className='ml-2 badge badge-info'>{task.category}</span>
      </div>
      <div className='col'>{`${task.startTime} - ${task.endTime}`}</div>
      <div className=''>
        <button className='btn btn-danger' onClick={removeTask}>
          Remove
        </button>
      </div>
    </div>
  </div>
)