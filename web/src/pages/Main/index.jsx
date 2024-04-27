import React from 'react'
import { Outlet } from 'react-router-dom'

// Styles
import "./style.css"

// Components
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