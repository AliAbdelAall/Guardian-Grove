import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// assets
import fullLogo from "../../../../assets/logo/full-logo.png"

// components
import LoginInput from '../../../../components/LoginInput'
import LoginButton from '../../../../components/LoginButton'

// Tools
import { useSendRequest } from '../../../../core/tools/remote/request'

const Signup = () => {

  const navigate  = useNavigate()
  const sendRequest = useSendRequest()

  const [credentials, setCredetials] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: ""
  })

  console.log(credentials)

  const handleInputChange = (e, field) => {
    setCredetials({...credentials, [field]: e.target.value})
  }

  return (
    <div className='flex column align-center login-container'>
      <img src={fullLogo} width={100} height={120} alt="logo" />

      <div className='flex column input-wrapper'>

        <div className='flex first-last-name-input'>
          
          <LoginInput
          id={"first-name-input"}
          label={"First name"}
          placeholder={"Jhon"}
          handleChange={(e) => handleInputChange(e, "firstName")}
          />
          
          <LoginInput
          id={"last-name-input"}
          label={"Last name"}
          placeholder={"Doe"}
          handleChange={(e) => handleInputChange(e, "lastName")}
          />
        </div>

        <LoginInput
        id={"username-input"}
        label={"Username"}
        placeholder={"JhonDoe"}
        handleChange={(e) => handleInputChange(e, "username")}
        />

        <LoginInput
        id={"email-input"}
        label={"email"}
        placeholder={"jhondoe@gmail.com"}
        handleChange={(e) => handleInputChange(e, "email")}
        />

        <LoginInput
        id={"password-input"}
        label={"Password"}
        placeholder={"********"}
        type={"password"}
        handleChange={(e) => handleInputChange(e, "password")}
        />


      </div>

      <div className='flex column center full-width login-wrapper'>
        <LoginButton
        text={"Log in"}
        // handleClick={}
        />

        <p className='text-acient'>
          Have an account? 
          <span 
            className='font-medium text-primary auth-switch' 
            onClick={() => navigate("/")}
          >Log in</span>
        </p>
      </div>

    </div>
  )
}

export default Signup