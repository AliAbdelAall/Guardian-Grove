import React from 'react'

// Styles
import "./style.css"


const LoginButton = ({text, handleClick}) => {
  return (

    <button className='login-btn  white bg-primary' onClick={handleClick}>{text}</button>
  )
}

export default LoginButton