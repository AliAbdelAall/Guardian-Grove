import React from 'react'

const LoginInput = ({id, label, placeholder}) => {
  return (

     <div className='flex column login-input'>
        <label htmlFor={id}>{label}</label>
        <input type="text" id={id} placeholder={placeholder}/>
      </div>
  )
}

export default LoginInput