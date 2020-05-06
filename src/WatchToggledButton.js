import React from 'react'

export const WatchToggledButton = ({ isStarted, onStart }) => (
  <div className='col'>
    {isStarted ? (
      <button type='button' className='btn btn-danger btn-lg' onClick={onStart(false)}>
        Stop
      </button>
    ) : (
      <button type='button' className='btn btn-success btn-lg' onClick={onStart(true)}>
        Start
      </button>
    )}
  </div>
)
