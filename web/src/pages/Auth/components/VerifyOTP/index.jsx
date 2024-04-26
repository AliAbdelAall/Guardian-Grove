import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Assets
import fullLogo from "../../../../assets/logo/full-logo.png"

// components
import LoginInput from '../../../../components/LoginInput'
import SmallButton from '../../../../components/SmallButton'

// Utilities
import { toast } from "react-toastify"
import { useSendRequest } from '../../../../core/tools/remote/request'
import { requestMethods } from '../../../../core/enums/requestMethods'

const VerifyOTP = () => {

  const navigate = useNavigate()
  const sendRequest = useSendRequest()

  const [otp, setOtp] = useState("")

  const [error, setError] = useState({
    status: false,
    message: ""
  })

  const handleInputChange = (e) => {
    setOtp(e.target.value)
    setError({ status: false, message: ""})
  }
  

  return (
    <div className='flex column align-center login-container'>
      <img src={fullLogo} width={100} height={120} alt="logo" />

      <div className='flex column center input-wrapper'>
        <div className='flex column center info-wrapper'>
          <h3>Verification Code</h3>
          <p className='text-acient'>Enter you OPT code to reset your password</p>
        </div>

        {error.status &&<p className='text-sm text-error'>{error.message}</p>}

        <LoginInput
        id={"otp-input"}
        label={"otp"}
        placeholder={"1234"}
        handleChange={(e) => handleInputChange(e)}
        />

      </div>

      <div className='flex column center full-width login-wrapper'>
        <SmallButton
        text={"Next"}
        // handleClick={handleOtpVerification}
        />

      </div>

    </div>
  )
}

export default VerifyOTP