import React from 'react'
import { Outlet } from 'react-router-dom'

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