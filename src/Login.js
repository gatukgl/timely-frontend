import React from 'react'
import { withRouter } from 'react-router'

class Login extends React.Component {
  state = {
    name: ''
  }

  onChange = (event) => {
    this.setState({ username: event.target.value })
  }

  onClickSubmit = (event) => {
    event.preventDefault()
    this.props.history.push('/main')
    window.sessionStorage.setItem('username', this.state.username)
  }

  render() {
    return (
      <div className='row'>
        <div className='col'></div>
        <div className='col'>
          <div className='container'>
            <form className='form-signin '>
              <h1 className='mb-4'>Please enter your username</h1>
              <input
                type='text'
                id='username'
                className='form-control mb-3'
                placeholder='gatukgl'
                required
                autoFocus
                value={this.state.username}
                onChange={this.onChange}
              />

              <button
                className='btn btn-lg btn-primary btn-block'
                disabled={!this.state.username}
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
