import React from 'react'
import { Outlet } from "react-router-dom";

// Styles
import "./style.css"


const Auth = () => {
  return (
    <div className='flex center auth-container'>
      <Outlet/>
    </div>
  )
}

export default Auth