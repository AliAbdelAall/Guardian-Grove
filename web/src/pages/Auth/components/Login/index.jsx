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

  const [error, setError] = useState({
    status: false,
    message: ""
  })

  console.log(credentials)

  const handleInputChange = (e, field) => {
    setCredetials({...credentials, [field]: e.target.value})
    setError({ status: false, message: ""})
  }

  const handleLoginValidation = () => {
    const { username, password } = credentials

    if(username.length < 3 || username.length > 20){
      setError({...error, status: true, message: 'Username must be 3->20 charachters'})
      return
    }
    if(password.length < 8){
      setError({...error, status: true, message: 'Password must be at least 8 characters long'})
      return
    }
    sendRequest(requestMethods.POST, "/api/auth/login", {
      ...credentials,
    }).then((response) => {
      if(response.status === 200){
        setLocalUser(response.data.token)
        console.log(response.data)
        navigate("/")
      }
    }).catch((error) => {
      if(error.response.status === 400){
        setError({...error, status: true, message: error.response.data.error})
      }
    })
  }

  return (
    <div className='flex column align-center login-container'>
      <img src={fullLogo} width={100} height={120} alt="logo" />

      <div className='flex column input-wrapper'>

        {error.status &&<p className='text-sm text-error'>{error.message}</p>}

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

        <p className='text-acient font-medium' onClick={() => navigate("/reset-password")}>Forgot password?</p>
      </div>

      <div className='flex column center full-width login-wrapper'>
        <LoginButton
        text={"Log in"}
        handleClick={handleLoginValidation}
        />

        <p className='text-acient'>
          Don't have an account? <span 
            className='font-medium text-primary auth-switch' 
            onClick={() => {
              navigate("/signup")
              setError({status: false, message: ""})
            }}
          >Sign up</span>
        </p>
      </div>

    </div>
  )
}

export default Login