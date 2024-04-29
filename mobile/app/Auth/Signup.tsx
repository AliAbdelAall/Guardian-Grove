import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View, TextInput } from 'react-native'
import generalStyles from "../../Styles/generalStyles"
import LoginButton from '../../components/LoginButton'
import LoginInput from '../../components/LoginInput'
import Login from './Login';
const logo = require("../../assets/logo/logo.png")



const Signup = () => {
  const [text, setText] = useState('');
  const [credentials, setCredentials] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    roleId: 1
  })

  console.log(credentials)


  const handleInputChange = (value: String, field: string) => {
    setCredentials({...credentials, [field]: value})
    console.log(credentials)
  }
  
  const handleSignupValidation = () => {

  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image}></Image>
      <View style={styles.center}>
        <Text style={generalStyles.h1}>Join us to start searching</Text>
        <Text style={styles.textcenter}>
          You can search course, apply course and find
          scholarship for abroad studies
        </Text>
      </View>

      <View style={styles.gap}>
        <View style={[styles.row, styles.fullWidth]}>
          <LoginInput
            value={credentials.firstName}
            handlechange={(value:string) => {
              console.log(value)
              console.log(credentials)
              handleInputChange(value, 'firstName')
            }}
            placeholder={"First Name"}
          />
          <LoginInput
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

        <Text style={styles.textcenter}>Already have an account? <Text>Login</Text></Text>

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
    width: '100%'
  },
  loginButton:{
    height:55,
    paddingLeft: 15,
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 12,
    width: "auto"
  },

  gap:{
    gap:15

  },

  textcenter:{
    textAlign: 'center'
  }
  
})

export default Signup