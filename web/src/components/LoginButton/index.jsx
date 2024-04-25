import React from 'react'

// Styles
import "./style.css"


const LoginInput = ({text, handleClick}) => {
  return (

    <button className='login-btn white bold text-sm bg-primary' onClick={handleClick}>{text}</button>
  )
}

export default LoginInput