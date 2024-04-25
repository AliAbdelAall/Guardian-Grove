import React from 'react'

// assets
import fullLogo from "../../../../assets/logo/full-logo.png"

// components
import LoginInput from '../../../../components/LoginInput'
import LoginButton from '../../../../components/LoginButton'


const Login = () => {
  return (
    <div className='flex column align-center login-container'>
      <img src={fullLogo} width={100} height={120} alt="logo" />

      <div className='flex column input-wrapper'>
        <LoginInput
        id={"username-input"}
        label={"Username"}
        placeholder={"JhonDoe"}
        // handleChange={}
        />

        <LoginInput
        id={"password-input"}
        label={"Password"}
        placeholder={"********"}
        // handleChange={}
        />

        <p className='text-acient font-medium'>Forgot password?</p>
      </div>

      <div className='flex column center full-width login-wrapper'>
        <LoginButton
        text={"Log in"}
        // handleClick={}
        />

        <p className='text-acient'>Don't have an account? <span className='font-medium text-primary auth-switch'>Sign up</span></p>
      </div>

    </div>
  )
}

export default Login