import React from 'react'
import axios from 'axios'
import Stopwatch from 'react-stopwatch'
import { DateTime } from 'luxon'

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

  getTasks = () => {
    axios.get(`${BASE_URL}/tasks`).then((response) => {
      console.log('response', response.data)
      this.setState({ allTasks: response.data })
    })
  }

  createTask = (payload) => {
    console.log(payload)
    axios.post(`${BASE_URL}/tasks`, payload).then(() => {
      console.log('yay')
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
        startedAt: this.state.startAt,
        endedAt: this.state.endAt
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
              >
                <option selected disabled>
                  Category
                </option>
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

          {this.state.allTasks ? (
            <div class='text-center p-5 my-3 rounded shadow-sm text-dark'>
              <span>No task yet</span>
            </div>
          ) : (
            <div className='my-3 bg-white rounded shadow-sm'>
              <h6 className='border-bottom border-gray p-3 mb-4'>Today</h6>
              <div className='row m-2 py-2 border-bottom border-gray align-items-center d-flex justify-content-between'>
                <div className='col'>
                  <span>Learn about React</span>
                  <span className='ml-2 badge badge-info'>Study</span>
                </div>
                <div className='col'>9:00:00 - 10:00:23</div>
                <div className=''>
                  <button class='btn btn-danger'>Remove</button>
                </div>
              </div>
              <div className='row m-2 py-2 border-bottom border-gray align-items-center d-flex justify-content-between'>
                <div className='col'>
                  <span>Go to gym</span>
                  <span className='ml-2 badge badge-warning'>Workout</span>
                </div>
                <div className='col'>9:00:00 - 10:00:23</div>
                <div className=''>
                  <button class='btn btn-danger'>Remove</button>
                </div>
              </div>
              <div className='row m-2 py-2 align-items-center d-flex justify-content-between'>
                <div className='col'>
                  <span>Learn how to cook</span>
                  <span className='ml-2 badge badge-info'>Study</span>
                </div>
                <div className='col'>9:00:00 - 10:00:23</div>
                <div className=''>
                  <button class='btn btn-danger'>Remove</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default App
