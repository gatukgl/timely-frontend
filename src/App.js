import React from 'react';

function App() {
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
              <a className='dropdown-item' href='#'>
                Action
              </a>
              <a className='dropdown-item' href='#'>
                Another action
              </a>
              <a className='dropdown-item' href='#'>
                Something else here
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
        <div className='row mt-5'>
          <table className='table table-hover'>
            <thead scope='col'>
              <tr>
                <th>Today</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Learn about React</td>
                <td>9:00 - 10:00</td>
                <td>
                  <button className='btn btn-danger'>Remove</button>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Learn about JSX</span>
                  <span class='badge badge-info ml-2'>study</span>
                </td>
                <td>10:05 - 12:00</td>
                <td>
                  <button className='btn btn-danger'>Remove</button>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Learn about virtual DOM</span>
                  <span class='badge badge-info ml-2'>study</span>
                </td>
                <td>13:35 - 14:00</td>
                <td>
                  <button className='btn btn-danger'>Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className='row'>
          <table className='table table-hover'>
            <thead scope='col'>
              <tr>
                <th>Yesterday</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <span>Learn about JavaScript</span>
                  <span class='badge badge-info ml-2'>study</span>
                </td>
                <td>10:35 - 12:00</td>
                <td>
                  <button className='btn btn-danger'>Remove</button>
                </td>
              </tr>
              <tr>
                <td>
                  <span>Dance with friends</span>
                  <span class='badge badge-warning ml-2'>Workout</span>
                </td>
                <td>13:35 - 14:00</td>
                <td>
                  <button className='btn btn-danger'>Remove</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
