import React from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'

const LoginButton = ({text ,handlePress}) => {
  return (
    <View>
        <Pressable style={styles.loginButton} onPress={handlePress}>
          <Text style={styles.buttonText}>{text}</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  loginButton:{
    height:55,
    paddingLeft: 14,
    borderRadius: 12,
    backgroundColor:"#75AB19",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth:'100%'
  },
  buttonText:{
    fontWeight: '500',
    fontSize: 18,
    color: '#ffff'
  }
})



export default LoginButton