import React from 'react'

// Styles
import "./style.css"

const LoginInput = ({id, label, placeholder}) => {
  return (

    <div className='flex column login-input'>
      <label className='font-medium' htmlFor={id}>{label}</label>
      <input className='font-light' type="text" id={id} placeholder={placeholder}/>
    </div>
  )
}

export default LoginInput