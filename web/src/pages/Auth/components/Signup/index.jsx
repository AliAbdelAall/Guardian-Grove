import React from 'react'

// assets
import fullLogo from "../../../../assets/logo/full-logo.png"

// components
import LoginInput from '../../../../components/LoginInput'
import LoginButton from '../../../../components/LoginButton'

const Signup = () => {
  return (
    <div className='flex column align-center login-container'>
      <img src={fullLogo} width={100} height={120} alt="logo" />

      <div className='flex column input-wrapper'>

        <div className='flex first-last-name-input'>
          
          <LoginInput
          id={"first-name-input"}
          label={"First name"}
          placeholder={"Jhon"}
          // handleChange={}
          />
          
          <LoginInput
          id={"last-name-input"}
          label={"Last name"}
          placeholder={"Doe"}
          // handleChange={}
          />
        </div>

        <LoginInput
        id={"username-input"}
        label={"Username"}
        placeholder={"JhonDoe"}
        // handleChange={}
        />

        <LoginInput
        id={"email-input"}
        label={"email"}
        placeholder={"jhondoe@gmail.com"}
        // handleChange={}
        />

        <LoginInput
        id={"password-input"}
        label={"Password"}
        placeholder={"********"}
        // handleChange={}
        />


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

export default Signup