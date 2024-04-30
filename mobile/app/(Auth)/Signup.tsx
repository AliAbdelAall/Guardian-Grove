import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import {useRouter} from "expo-router"

//  Styles
import generalStyles from "../../Styles/generalStyles"

// Tools
import { useSendRequest } from '../../core/tools/remote/request'
import { requestMethods } from '../../core/enum/requestMetods'
import { setLocalUser } from '../../core/tools/local/user'

// Assets
const logo = require("../../assets/logo/logo.png")

// Components
import LoginButton from '../../components/LoginButton'
import LoginInput from '../../components/LoginInput'


const Signup = () => {

  const [error, setError] = useState({
    status: false,
    message: ""
  })
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    roleId: 1
  })

  const router = useRouter()
  const sendRequest = useSendRequest()

  console.log(credentials)


  const handleInputChange = (value: String, field: string) => {
    setCredentials({...credentials, [field]: value})
    console.log(credentials)
  }
  
  const handleSignupValidation = () => {
    const { firstName, lastName, username, email, password, roleId } = credentials
    const regex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
    
    if (firstName.length < 3){
      setError({...error, status: true, message: "First Name must be at least 3 characters"})
      return
    }
    if (lastName.length < 3){
      setError({...error, status: true, message: "Last Name must be at least 3 characters"})
      return
    }
    if(!regex.test(email)){
      setError({...error, status: true, message: "Invalid email"})
      return
    }
    if (username.length < 3  || username.length > 20){
      setError({...error, status: true, message: "Username must be 3->20 charachters"})
      return
    }
    
    if (password.length < 8){
      setError({...error, status: true, message: "Password must be at least 8 characters long"})
      return
    }

    if(roleId !== 2 && roleId!== 3){
      setError({...error, status: true, message: "please select teacher/psychologist"})
      return
    }

    setError({status: false, message: ""})

    console.log("before request")

    sendRequest(requestMethods.POST, "/api/auth/signup", {
      ...credentials,
    }).then((response) => {
      if(response.status === 201){
        setLocalUser(response.data.token)
        console.log(response.data)
        // router.push("/Login")
      }
    }).catch((error) => {
      if(error.response.status === 400){
        setError({...error, status: true, message: error.response.data.error})
      }
    })
  } 

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image}></Image>
      <View style={[styles.center, styles.Width80]}>
        <Text style={generalStyles.h1}>Join us to start searching</Text>
        <Text style={[styles.textcenter, styles.lineHeight14]}>
          You can search course, apply course and find
          scholarship for abroad studies
        </Text>
      </View>

      <View style={[styles.gap15, styles.fullWidth]}>
        <View style={[styles.row, styles.fullWidth, styles.gap15]}>
          <LoginInput
            half={true}
            value={credentials.firstName}
            handlechange={(value:string) => {handleInputChange(value, 'firstName')}}
            placeholder={"First Name"}
          />
          <LoginInput
            half={true}
            value={credentials.lastName}
            handlechange={(value:String) => handleInputChange(value, 'lastName')}
            placeholder={"Last Name"}
          />
        </View>
        <LoginInput
          value={credentials.username}
          handlechange={(value:string) => handleInputChange(value, 'username')}
          placeholder={"Username"}
        />
        <LoginInput
          value={credentials.email}
          handlechange={(value:string) => handleInputChange(value, 'email')}
          placeholder={"Email"}
        />
        <LoginInput
          value={credentials.password}
          handlechange={(value:string) => handleInputChange(value, 'password')}
          placeholder={"password"}
          password={true}
        />
        <LoginButton
          text={"Signup"}
          handlePress={handleSignupValidation}
        />

        <Text style={[styles.textcenter, styles.fontSize16]}>{'Already have an account? '}
          <Pressable onPress={()=>{router.push("/Login")}}>
            <Text style={[styles.fontMedium, styles.primaryColor]}>Login</Text>
          </Pressable>
        </Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    paddingLeft: 20,
    paddingRight: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: 'center',
    
  },
  image:{
    width: 100,
    height:100
  },
  center:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row:{
    flexDirection: 'row'
  },
  fullWidth:{
    minWidth: '100%'
  },
  Width80:{
    width: '80%',
  },
  lineHeight14:{
    lineHeight:24,
    marginBottom:10
  },

  autoStretch:{
    flex:1
  },
  loginButton:{
    height:55,
    paddingLeft: 15,
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 12,
    width: "auto"
  },
  gap15:{
    gap:15
  },
  textcenter:{
    textAlign: 'center'
  },
  backgroundRed:{
    backgroundColor: "red"
  },
  fontMedium:{
    fontWeight: '500'
  },
  primaryColor:{
    color: '#75AB19'
  },
  fontSize16:{
    fontSize: 16
  }
  
})

export default Signup