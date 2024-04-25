import React from 'react'

// Styles
import "./style.css"

const LoginInput = ({id, label, placeholder, handleChange, type = "text"}) => {
  return (

    <div className='flex column login-input'>
      <label className='font-medium' htmlFor={id}>{label}</label>
      <input className='font-light' type={type} id={id} placeholder={placeholder} onChange={handleChange}/>
    </div>
  )
}

export default LoginInput