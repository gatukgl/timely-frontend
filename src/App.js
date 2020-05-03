import React from 'react';

function App() {
  return (
    <div className='App'>
      <nav class='navbar navbar-expand-lg fixed-top navbar-dark bg-dark'>
        <a class='navbar-brand mr-auto mr-lg-0' href='.'>
          Timely
        </a>
      </nav>

      <div class='container' role='main' style={{ marginTop: '100px' }}>
        <div class='row'>
          <div class='col-8'>
            <input
              type='text'
              placeholder='What are you working on?'
              className='form-control form-control-lg'
            />
          </div>

          <div className='dropdown'>
            <button
              class='btn btn-lg btn-secondary dropdown-toggle'
              type='button'
              id='dropdownMenuButton'
              data-toggle='dropdown'
              aria-haspopup='true'
              aria-expanded='false'
            >
              Category
            </button>
            <div class='dropdown-menu' aria-labelledby='dropdownMenuButton'>
              <a class='dropdown-item' href='#'>
                Action
              </a>
              <a class='dropdown-item' href='#'>
                Another action
              </a>
              <a class='dropdown-item' href='#'>
                Something else here
              </a>
            </div>
          </div>

          <div className='col'>
            <button type='button' class='btn btn-success btn-lg'>
              Start
            </button>
          </div>

          <div className='col' style={{ fontSize: '1.9em'}}>
            00:00:00
          </div>
        </div>
        <div className='row mt-5'>
          <table className='table table-hover'>
            <thead scope='col'>
              <tr>
                <th>Today</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Learn about React</td>
              </tr>
              <tr>
                <td>Learn about React</td>
              </tr>
              <tr>
                <td>Learn about React</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
