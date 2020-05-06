import React from 'react'

export const TaskInput = ({ state, onChange }) => (
  <div className='col-7'>
    <input
      type='text'
      placeholder='What are you working on?'
      className='form-control form-control-lg'
      value={state.task}
      name='task'
      onChange={onChange}
    />
  </div>
)
