import { Stack } from 'expo-router'
import React from 'react'

const AuthLayout = () => {
  return (
    <Stack >
      <Stack.Screen name='Login' options={{
        headerShown:false
      }}></Stack.Screen>
      <Stack.Screen name='Signup' options={{
        headerShown:false
      }}></Stack.Screen>
    </Stack>
  )
}

export default AuthLayout