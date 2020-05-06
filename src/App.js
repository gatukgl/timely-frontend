import React from 'react'
import axios from 'axios'
import Stopwatch from 'react-stopwatch'
import { DateTime } from 'luxon'
import * as R from 'ramda'

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
    this.getTasks()
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
      startDate: startDate,
      startTime: startTime,
      endTime: endTime
    }
  }

  getTasks = () => {
    axios.get(`${BASE_URL}/tasks`).then((response) => {
      this.setState({ allTasks: response.data.map((task) => this.restructureTask(task)) })
    })
  }

  createTask = (payload) => {
    axios.post(`${BASE_URL}/tasks`, payload).then((response) => {
      const newTask = this.restructureTask(response.data)
      const allTasks = this.state.allTasks.concat(newTask)
      this.setState({
        allTasks
      })
    })
  }

  removeTask = (taskId) => () => {
    const isRemovedTasks = (task) => task.id === taskId

    axios.delete(`${BASE_URL}/tasks/${taskId}`).then(() => {
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
    const currentDateTime = DateTime.local().toString()

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

  render() {
    return (
      <div className='App'>
        <nav className='navbar navbar-expand-lg fixed-top navbar-dark bg-dark'>
          <a className='navbar-brand mr-auto mr-lg-0' href='.'>
            Timely
          </a>
        </nav>

        <div className='container' role='main' style={{ marginTop: '100px' }}>
          <div className='row'>
            <div className='col-7'>
              <input
                type='text'
                placeholder='What are you working on?'
                className='form-control form-control-lg'
                value={this.state.task}
                name='task'
                onChange={this.onTextChange}
              />
            </div>

            <div className='form-group'>
              <select
                className='form-control form-control-lg custom-select'
                id='category'
                style={{ height: '45px' }}
                onChange={this.onDropdownChange}
                defaultValue='Category'
              >
                <option disabled>Category</option>
                <option selected={this.state.category === 'Study'}>Study</option>
                <option selected={this.state.category === 'Workout'}>Workout</option>
                <option selected={this.state.category === 'Housekeeping'}>Housekeeping</option>
              </select>
            </div>

            <div className='col'>
              {this.state.isWatchStarted ? (
                <button
                  type='button'
                  className='btn btn-danger btn-lg'
                  onClick={this.onStartWatch(false)}
                >
                  Stop
                </button>
              ) : (
                <button
                  type='button'
                  className='btn btn-success btn-lg'
                  onClick={this.onStartWatch(true)}
                >
                  Start
                </button>
              )}
            </div>

            <div className='col' style={{ fontSize: '1.9em' }}>
              {this.state.isWatchStarted ? (
                <Stopwatch
                  autoStart={true}
                  seconds={0}
                  minutes={0}
                  hours={0}
                  render={({ formatted }) => <p>{formatted}</p>}
                />
              ) : (
                '00:00:00'
              )}
            </div>
          </div>

          {this.state.allTasks.length < 1 ? (
            <div className='text-center p-5 my-3 rounded shadow-sm text-dark'>
              <span>No task yet</span>
            </div>
          ) : (
            <div className='my-3 bg-white rounded shadow-sm'>
              <h6 className='border-bottom border-gray p-3 mb-4'>Today</h6>
              {this.state.allTasks.map((task) => (
                <div key={task.id}>
                  <div className='row m-2 py-2 border-bottom border-gray align-items-center d-flex justify-content-between'>
                    <div className='col'>
                      <span>{task.name}</span>
                      <span className='ml-2 badge badge-info'>{task.category}</span>
                    </div>
                    <div className='col'>{`${task.startTime} - ${task.endTime}`}</div>
                    <div className=''>
                      <button className='btn btn-danger' onClick={this.removeTask(task.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
