import React from 'react'
import * as R from 'ramda'

import { TaskContextProvider } from './TaskContext'
import { NavBar } from './NavBar'
import { TaskInput } from './TaskInput'
import { Categories } from './Categories'
import { WatchToggledButton } from './WatchToggledButton'
import { StopWatch } from './StopWatch'
import { TasksTable } from './TasksTable'

const App = () => {
  return (
    <div className='App'>
      <TaskContextProvider>
        <NavBar />
        <div className='container' role='main' style={{ marginTop: '100px' }}>
          <div className='row'>
            <TaskInput />
            <Categories />
            <WatchToggledButton />
            <StopWatch />
          </div>

          <TasksTable />
        </div>
      </TaskContextProvider>
    </div>
  )
}

export default App
