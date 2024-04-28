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
    roleId: 0
  })


  const handleInputChange = () => {

  }
  const handleSignupValidation = () => {

  }

  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.image}></Image>
      <View style={styles.center}>
        <Text style={generalStyles.h1}>Join us to start searching</Text>
        <Text>
          You can search course, apply course and find
          scholarship for abroad studies
        </Text>
      </View>

     
        <TextInput
          style={{  height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={setText}
          value={text}
          placeholder="Enter text here"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={setText}
          value={text}
          placeholder="Enter text here"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={setText}
          value={text}
          placeholder="Enter text here"
        />
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={setText}
          value={text}
          placeholder="Enter text here"
        />
        <LoginButton
          text={"Signup"}
          handlePress={handleSignupValidation}
        />

        <Text></Text>

      </View>
    </View>
  )
}



export default Signup