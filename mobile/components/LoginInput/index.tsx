import React from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

const LoginInput = ({text ,handlechange, placeholder}) => {
  return (
    <View>
       <TextInput
          style={styles.loginButton} 
          onChangeText={handlechange}
          value={text}
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
  }
})

const Styles = StyleSheet.create({

})



export default LoginInput