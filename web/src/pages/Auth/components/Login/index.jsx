import React from 'react'

import fullLogo from "../../../../assets/logo/full-logo.png"

const Login = () => {
  return (
    <div className='flex column align-center login-container'>
      <img src={fullLogo} width={100} height={120} alt="logo" />

      <div className='flex column login-imput'>
        <label htmlFor="username-input">Username</label>
        <input type="text" id='username-input' placeholder='JhonDoe'/>
      </div>
      <div className='flex column login-imput'>
        <label htmlFor="username-input">Username</label>
        <input type="text" id='username-input' placeholder='JhonDoe'/>
      </div>

      <p>Forgot password?</p>

      <button>Log in</button>

      <p>Don't have an account? <span>Sign up</span></p>

    </div>
  )
}

export default Login