import React from 'react'

// Styles
import "./style.css"

const LoginInput = ({id, label, placeholder, handleChange}) => {
  return (

    <div className='flex column login-input'>
      <label className='font-medium' htmlFor={id}>{label}</label>
      <input className='font-light' type="text" id={id} placeholder={placeholder} onChange={handleChange}/>
    </div>
  )
}

export default LoginInput