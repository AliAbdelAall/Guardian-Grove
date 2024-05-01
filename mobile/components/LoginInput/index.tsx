import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const LoginInput = ({ value, handlechange, placeholder, password= false , half = false}) => {
  return (
    <TextInput
      style={[styles.loginButton, half ? styles.halfWidth : null]}
      value={value}
      onChangeText={handlechange}
      secureTextEntry={password}
      placeholder={placeholder}
    />

  )
}

const styles = StyleSheet.create({
  loginButton:{
    height:50,
    paddingLeft: 15,
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 18,
  },
  fullWidth:{
    width: '100%'
  },
  halfWidth:{
    width: '48.4%',
  },
 
})

const Styles = StyleSheet.create({

})

export default LoginInput