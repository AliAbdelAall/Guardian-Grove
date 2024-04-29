import React, { useState }  from 'react'
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
const Login = () => {

  const [error, setError] = useState({
    status: false,
    message: ""
  })
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })

  const router = useRouter()
  const sendRequest = useSendRequest()


  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image}></Image>
      <View style={[styles.center, styles.Width80]}>
        <Text style={generalStyles.h1}>Welcome back</Text>
        <Text style={[styles.textcenter, styles.lineHeight14]}>
          You can search course, apply course and find
          scholarship for abroad studies
        </Text>
      </View>
      <View style={[styles.gap15, styles.fullWidth]}>
        <LoginInput
          value={credentials.username}
          handlechange={(value:string) => handleInputChange(value, 'username')}
          placeholder={"Username"}
        />
        <LoginInput
          value={credentials.password}
          handlechange={(value:string) => handleInputChange(value, 'password')}
          placeholder={"password"}
          password={true}
        />

        <LoginButton
          text={"Login"}
          handlePress={handleLoginValidation}
        />

        <Text style={[styles.textcenter, styles.fontSize16]}>{"Don't have an account?"}
          <Pressable onPress={()=>{router.push("/app/Signup")}}>
            <Text style={[styles.fontMedium, styles.primaryColor]} >Signup</Text>
          </Pressable>
        </Text>

      </View>
    </View>
  )
}


export default Login