import React from 'react'
import * as R from 'ramda'

import { NavBar } from './NavBar'
import { TaskInput } from './TaskInput'
import { Categories } from './Categories'
import { WatchToggledButton } from './WatchToggledButton'
import { StopWatch } from './StopWatch'
import { Task } from './Task'
import { nowUTC, convertUTCtoLocal } from './datetimeUtils'

class App extends React.Component {
  state = {
    allTasks: [],
    task: '',
    category: '',
    username: '',
    isWatchStarted: false,
    startedAt: '',
    endedAt: ''
  }

  restructureTaskIntoState = (task) => {
    const startDateTime = convertUTCtoLocal(task.started_at)
    const startDate = startDateTime.date
    const startTime = startDateTime.time

    const endDateTime = convertUTCtoLocal(task.ended_at)
    const endTime = endDateTime.time

    return {
      id: task.id,
      name: task.name,
      category: task.category,
      username: task.username,
      startDate: startDate,
      startTime: startTime,
      endTime: endTime
    }
  }

  createTask = (task) => {
    const newTask = this.restructureTaskIntoState(task)
    const allTasks = this.state.allTasks.concat(newTask)
    this.setState({
      allTasks
    })
  }

  removeTask = (taskId) => () => {
    const isRemovedTasks = (task) => task.id === taskId

    const allTasks = R.reject(isRemovedTasks, this.state.allTasks)
    this.setState({ allTasks })
  }

  onTextChange = (event) => {
    const {
      target: { value, name }
    } = event
    this.setState({ [name]: value })
  }

  onDropdownChange = (event) => {
    this.setState({ category: event.target.value })
  }

  onStartWatch = (isStart) => () => {
    this.setState({ isWatchStarted: isStart })
    const currentDateTime = nowUTC()

    if (isStart) {
      this.setState({ startedAt: currentDateTime })
    } else {
      this.setState({ endedAt: currentDateTime })
      const username = window.sessionStorage.getItem('username')
      const task = {
        name: this.state.task,
        category: this.state.category,
        started_at: this.state.startedAt,
        ended_at: currentDateTime,
        username: username
      }
      this.createTask(task)
    }
  }

  render() {
    return (
      <div className='App'>
        <NavBar />
        <div className='container' role='main' style={{ marginTop: '100px' }}>
          <div className='row'>
            <TaskInput state={this.state} onChange={this.onTextChange} />
            <Categories selectedCategory={this.state.category} onChange={this.onDropdownChange} />
            <WatchToggledButton isStarted={this.state.isWatchStarted} onStart={this.onStartWatch} />
            <StopWatch isEnabled={this.state.isWatchStarted} />
          </div>

          {this.state.allTasks.length < 1 ? (
            <div className='text-center p-5 my-3 rounded shadow-sm text-dark'>
              <span>No task yet</span>
            </div>
          ) : (
            <div className='my-3 bg-white rounded shadow-sm'>
              {this.state.allTasks.reverse().map((task) => (
                <Task task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
