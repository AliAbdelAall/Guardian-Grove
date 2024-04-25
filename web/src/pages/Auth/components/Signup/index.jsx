import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// assets
import fullLogo from "../../../../assets/logo/full-logo.png"

// components
import LoginInput from '../../../../components/LoginInput'
import LoginButton from '../../../../components/LoginButton'

// Tools
import { useSendRequest } from '../../../../core/tools/remote/request'
import { requestMethods } from '../../../../core/enums/requestMethods'
import { setLocalUser } from '../../../../core/tools/local/user'

const Signup = () => {

  const navigate  = useNavigate()
  const sendRequest = useSendRequest()

  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    roleId: 0
  })

  console.log(credentials)

  const handleInputChange = (e, field) => {
    setCredentials({...credentials, [field]: e.target.value})
  }

  const handleSignupValidation = () => {
    const { firstName, lastName, username, email, password } = credentials
    if (firstName.length < 3){
      console.log("First Name must be at least 3 characters")
      return
    }
    if (lastName.length < 3){
      console.log("Last Name must be 3->20 characters")
      return
    }
    if(!regex.test(email)){
      console.log("Invalid email")
      return
    }
    if (username.length < 3  || username.length > 20){
      console.log("Username must be 3->20 charachters")
      return
    }
    
    if (password.length < 8){
      console.log("Password must be at least 8 characters long")
      return
    }
    sendRequest(requestMethods.POST, "/api/auth/signup", {
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

  const handleRoleChange = (e) => {
    const { value } = e.target;
    setCredentials({ ...credentials, roleId: parseInt(value) });
  };

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

        <div className="flex role-selection">
          <label>
            <input
              className='custom-radio'
              type="radio"
              name="role"
              value="2"
              checked={credentials.roleId === 2}
              onChange={handleRoleChange}
            />
            Teacher
          </label>
          <label>
            <input
            className='custom-radio'
              type="radio"
              name="role"
              value="3"
              checked={credentials.roleId === 3}
              onChange={handleRoleChange}
            />
            Psychologist
          </label>
        </div>

      </div>

      

      <div className='flex column center full-width login-wrapper'>
        <LoginButton
        text={"Sign up"}
        handleClick={handleSignupValidation}
        />

        <p className='text-acient'>
          Have an account? <span 
            className='font-medium text-primary auth-switch' 
            onClick={() => navigate("/")}
          >Log in</span>
        </p>
      </div>

    </div>
  )
}

export default Signup