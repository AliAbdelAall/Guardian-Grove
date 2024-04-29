import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const LoginInput = ({ value, handlechange, placeholder, password= false}) => {
  return (
    <View>
       <TextInput
          style={styles.loginButton}
          value={value}
          onChangeText={handlechange}
          secureTextEntry={password}
          placeholder={placeholder}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  loginButton:{
    height:55,
    paddingLeft: 15,
    borderColor: 'gray', 
    borderWidth: 1,
    borderRadius: 12,
    fontSize: 16
  }
})

const Styles = StyleSheet.create({

})



export default LoginInput