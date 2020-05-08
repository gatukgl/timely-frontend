import React from 'react'
import { DateTime } from 'luxon'
import * as R from 'ramda'

import { NavBar } from './NavBar'
import { TaskInput } from './TaskInput'
import { Categories } from './Categories'
import { WatchToggledButton } from './WatchToggledButton'
import { StopWatch } from './StopWatch'
import { Task } from './Task'

class App extends React.Component {
  state = {
    allTasks: [],
    task: '',
    category: '',
    username: '',
    isWatchStarted: false,
    startAt: '',
    endAt: ''
  }

  restructureTask = (task) => {
    const startDateTime = DateTime.fromISO(task.started_at)
    const startDate = startDateTime.toLocaleString(DateTime.DATE_HUGE)
    const startTime = startDateTime.toLocaleString(DateTime.TIME_WITH_SECONDS)

    const endDateTime = DateTime.fromISO(task.ended_at)
    const endTime = endDateTime.toLocaleString(DateTime.TIME_WITH_SECONDS)

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
    const newTask = this.restructureTask(task)
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
    const currentDateTime = DateTime.local().toUTC()

    if (isStart) {
      this.setState({ startAt: currentDateTime })
    } else {
      this.setState({ endAt: currentDateTime })
      const username = window.sessionStorage.getItem('username')
      const task = {
        name: this.state.task,
        category: this.state.category,
        username: username,
        started_at: this.state.startAt,
        ended_at: currentDateTime
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
                <Task task={task} removeTask={this.removeTask(task.id)} />
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
