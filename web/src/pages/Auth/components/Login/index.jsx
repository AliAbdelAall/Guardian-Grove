import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// assets
import fullLogo from "../../../../assets/logo/full-logo.png"

// components
import LoginInput from '../../../../components/LoginInput'
import LoginButton from '../../../../components/LoginButton'

// Utilities
import { toast } from "react-toastify"
import { useSendRequest } from '../../../../core/tools/remote/request'
import { requestMethods } from '../../../../core/enums/requestMethods'


const Login = () => {

  const navigate = useNavigate()
  const sendRequest = useSendRequest()

  const [credentials, setCredetials] = useState({
    username: "",
    password: ""
  })

  console.log(credentials)

  const handleInputChange = (e, field) => {
    setCredetials({...credentials, [field]: e.target.value})
  }

  const handleLoginValidation = () => {
    const { username, password } = credentials

    if(username.length < 3 || username.length > 20){
      toast.error('Username must be 3->20 charachters')
      console.log('Username must be 3->20 charachters')
      return
    }
    if(password.length < 6){
      toast.error('Password must be at least 6 characters long')
      console.log('Password must be at least 6 characters long')
      return
    }
    sendRequest(requestMethods.POST, "/api/auth/login", {
      ...credentials,
    }).then((response) => {
      if(response.status === 201){
        setLocalUser(response.data.token)
        console.log(response.data)
        navigate("/")
      }
    }).catch((error) => {
      console.error(error)
    })
  }

  return (
    <div className='flex column align-center login-container'>
      <img src={fullLogo} width={100} height={120} alt="logo" />

      <div className='flex column input-wrapper'>
        <LoginInput
        id={"username-input"}
        label={"Username"}
        placeholder={"JhonDoe"}
        handleChange={(e) => handleInputChange(e, "username")}
        />

        <LoginInput
        id={"password-input"}
        label={"Password"}
        placeholder={"********"}
        type={"password"}
        handleChange={(e) => handleInputChange(e, "password")}
        />

        <p className='text-acient font-medium'>Forgot password?</p>
      </div>

      <div className='flex column center full-width login-wrapper'>
        <LoginButton
        text={"Log in"}
        handleClick={handleLoginValidation}
        />

        <p className='text-acient'>
          Don't have an account? <span 
            className='font-medium text-primary auth-switch' 
            onClick={() => navigate("/signup")}
          >Sign up</span>
        </p>
      </div>

    </div>
  )
}

export default Login