import React from 'react'
import axios from 'axios'
import { DateTime } from 'luxon'
import * as R from 'ramda'

import { NavBar } from './NavBar'
import { TaskInput } from './TaskInput'
import { Categories } from './Categories'
import { WatchToggledButton } from './WatchToggledButton'
import { StopWatch } from './StopWatch'
import { Task } from './Task'

import { getTasks, createTask, removeTask } from './apis'
import { restructureTask } from './utils'

const BASE_URL = 'http://localhost:8000'
class App extends React.Component {
  state = {
    allTasks: [],
    task: '',
    category: '',
    isWatchStarted: false,
    startAt: '',
    endAt: ''
  }

  componentDidMount() {
    const response = getTasks().then((response) => {
      this.setState({ allTasks: response.map((task) => restructureTask(task)) })
    })
  }

  removeTask = (taskId) => () => {
    removeTask(taskId).then(() => {
      const isRemovedTasks = (task) => task.id === taskId
      const allTasks = R.reject(isRemovedTasks, this.state.allTasks)
      this.setState({ allTasks })
    })
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
      const task = {
        name: this.state.task,
        category: this.state.category,
        started_at: this.state.startAt,
        ended_at: currentDateTime
      }
      this.createTask(task)
    }
  }

  createTask = (task) => {
    createTask(task).then((response) => {
      const newTask = restructureTask(response)
      const allTasks = this.state.allTasks.concat(newTask)
      this.setState({
        allTasks
      })
    })
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
              <h6 className='border-bottom border-gray p-3 mb-4'>Today</h6>
              {this.state.allTasks.map((task) => (
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
