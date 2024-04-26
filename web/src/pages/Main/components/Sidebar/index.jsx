import React from 'react'
import { Link } from 'react-router-dom'

import logo from "../../../../assets/logo/logo.png"

const Sidebar = () => {
  const firstName = "Jhon"
  const lastName = "Doe"


  return (
    <div className='flex column align-center sidebar-container'>
      <img src={logo} height={101} alt="logo" />
      <p className='text-acient font-light'>Welcome <span className='font-regular'>{`Dr. ${firstName + " " + lastName}`}</span></p>
      <div className=' flex column full-width sidebar-nav'>

        <Link
        className='sidebar-btn white text-lg active full-width'
        >Client</Link>

        <Link
        className='sidebar-btn text-acient text-lg full-width'
        >Schedules</Link>
        
        <Link
        className='sidebar-btn text-acient text-lg full-width'
        >Chat</Link>

      </div>
    </div>
  )
}

export default Sidebar