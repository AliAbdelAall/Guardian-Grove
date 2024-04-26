import React from 'react'

// Assets
import fullLogo from "../../../../assets/logo/full-logo.png"

// components
import LoginInput from '../../../../components/LoginInput'
import LoginButton from '../../../../components/LoginButton'
import SmallButton from '../../../../components/SmallButton'

const ResetPassword = () => {
  return (
    <div className='flex column align-center login-container'>
      <img src={fullLogo} width={100} height={120} alt="logo" />

      <div className='flex column center input-wrapper'>
        <div className='flex column center info-wrapper'>
          <h3>Enter your email</h3>
          <p className='text-acient'>A secret code will be sent to your email</p>
        </div>

        {/* {error.status &&<p className='text-sm text-error'>{error.message}</p>} */}

        <LoginInput
        id={"email-input"}
        label={"email"}
        placeholder={"jhondoe@gmail.com"}
        // handleChange={(e) => handleInputChange(e, "email")}
        />

      </div>

      <div className='flex column center full-width login-wrapper'>
        <SmallButton
        text={"Next"}
        // handleClick={handleLoginValidation}
        />

      </div>

    </div>
  )
}

export default ResetPassword