import React from 'react'
import { Outlet } from 'react-router-dom'

// Styles
import "./style.css"

// components
import Sidebar from './components/Sidebar'

const Main = () => {
  return (
    <div className='flex '>
      <Sidebar/>
      <Outlet/>
    </div>

  )
}

export default Main