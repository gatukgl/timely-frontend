import React, { useContext } from 'react'
import Stopwatch from 'react-stopwatch'

import { TaskContext } from './TaskContext'

export const StopWatch = () => {
  const { isWatchStarted } = useContext(TaskContext)

  return (
    <div className='col' style={{ fontSize: '1.9em' }}>
      {isWatchStarted ? (
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
}
