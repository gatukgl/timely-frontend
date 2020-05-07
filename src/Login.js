import React from 'react'
import { withRouter } from 'react-router'

class Login extends React.Component {
  state = {
    name: ''
  }

  onChange = (event) => {
    this.setState({ name: event.target.value })
  }

  onClickSubmit = (event) => {
    event.preventDefault()
    this.props.history.push('/main')
    window.sessionStorage.setItem('name', this.state.name)
  }

  render() {
    return (
      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='container'>
            <form className='form-signin '>
              <h1 className='mb-4'>Please enter your name</h1>
              <input
                type='text'
                id='name'
                className='form-control mb-3'
                placeholder='Gatuk'
                required
                autoFocus
                value={this.state.name}
                onChange={this.onChange}
              />

              <button
                className='btn btn-lg btn-primary btn-block'
                disabled={!this.state.name}
                onClick={this.onClickSubmit}
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
        <div className='col'></div>
      </div>
    )
  }
}

export default withRouter(Login)
