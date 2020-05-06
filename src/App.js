import React from 'react'
import axios from 'axios'

class App extends React.Component {
  state = {
    allTasks: [],
  }

  componentDidMount() {
    axios.get('localhost:8000/tasks').then(function (response) {
      console.log(response.json())
      this.setState({ allTasks: response.json() })
    })
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
            <div className='col-8'>
              <input
                type='text'
                placeholder='What are you working on?'
                className='form-control form-control-lg'
              />
            </div>

            <div className='dropdown'>
              <button
                className='btn btn-lg btn-secondary dropdown-toggle'
                type='button'
                id='categoryDropdown'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='true'
              >
                Category
              </button>
              <div className='dropdown-menu' aria-labelledby='categoryDropdown'>
                <a className='dropdown-item' href='.'>
                  Study
                </a>
                <a className='dropdown-item' href='.'>
                  Workout
                </a>
                <a className='dropdown-item' href='.'>
                  Housekeeping
                </a>
              </div>
            </div>

            <div className='col'>
              <button type='button' className='btn btn-success btn-lg'>
                Start
              </button>
            </div>

            <div className='col' style={{ fontSize: '1.9em' }}>
              00:00:00
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
