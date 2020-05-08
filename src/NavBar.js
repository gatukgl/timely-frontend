import React from 'react'

export const NavBar = () => {
  const username = window.sessionStorage.getItem('username')
  return (
    <nav className='navbar fixed-top navbar-dark bg-dark'>
      <a className='navbar-brand' href='.'>
        Timely
      </a>
      <div className='text-white'>{username}</div>
    </nav>
  )
}
