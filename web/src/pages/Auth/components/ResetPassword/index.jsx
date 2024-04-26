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

        {/* {error.status &&<p className='text-sm text-error'>{error.message}</p>} */}

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
        // handleChange={(e) => handleInputChange(e, "confirmPassword")}
        />

      </div>

      <div className='flex column center full-width login-wrapper'>
        <LoginButton
        text={"Confirm"}
        // handleClick={handleLoginValidation}
        />

      </div>

    </div>
  )
}

export default ResetPassword