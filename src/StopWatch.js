import React from 'react'
import Stopwatch from 'react-stopwatch'

export const StopWatch = ({ isEnabled }) => (
  <div className='col' style={{ fontSize: '1.9em' }}>
    {isEnabled ? (
      <Stopwatch
        autoStart
        seconds={0}
        minutes={0}
        hours={0}
        render={({ formatted }) => <p>{formatted}</p>}
      />
    ) : (
      '00:00:00'
    )}
  </div>
)
