import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Assets
import fullLogo from "../../../../assets/logo/full-logo.png"

// components
import LoginInput from '../../../../components/LoginInput'
import LoginButton from '../../../../components/LoginButton'

// Utilities
import { toast } from "react-toastify"
import { useSendRequest } from '../../../../core/tools/remote/request'
import { requestMethods } from '../../../../core/enums/requestMethods'


const ResetPassword = () => {

  const navigate = useNavigate()
  const sendRequest = useSendRequest()

  const [credentials, setCredetials] = useState({
    password: "",
    confirmPassword: ""
  })

  const [error, setError] = useState({
    status: false,
    message: ""
  })

  const handleInputChange = (e, field) => {
    setCredetials({...credentials, [field]: e.target.value})
    setError({ status: false, message: ""})
  }

  const handleResetPassword = () => {
    const { password, confirmPassword} = credentials

    if(password.length < 8 ){
      setError({...error, status: true, message: 'Password must be at least 8 characters long'})
      return
    }
    if(password !== confirmPassword){
      setError({...error, status: true, message: "Password don't match"})
      return
    }

    sendRequest(requestMethods.POST, "api/user/reset-password",{
      password,
    }).then((response) => {
      if(response.status === 200){
        toast.success("Reset password success!")
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

      <div className='flex column center input-wrapper'>

        {error.status &&<p className='text-sm text-error'>{error.message}</p>}

        <LoginInput
        id={"password-input"}
        label={"New password"}
        placeholder={"********"}
        type={"password"}
        handleChange={(e) => handleInputChange(e, "password")}
        />

      <LoginInput
        id={"password-input"}
        label={"Confirm new password"}
        placeholder={"********"}
        type={"password"}
        handleChange={(e) => handleInputChange(e, "confirmPassword")}
        />

      </div>

      <div className='flex column center full-width login-wrapper'>
        <LoginButton
        text={"Confirm"}
        handleClick={handleResetPassword}
        />

      </div>

    </div>
  )
}

export default ResetPassword