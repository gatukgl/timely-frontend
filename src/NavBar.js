import React from 'react'

export const NavBar = () => {
  const name = window.sessionStorage.getItem('name')
  return (
    <nav className='navbar fixed-top navbar-dark bg-dark'>
      <a className='navbar-brand' href='.'>
        Timely
      </a>
      <div className='text-white'>{name}</div>
    </nav>
  )
}
