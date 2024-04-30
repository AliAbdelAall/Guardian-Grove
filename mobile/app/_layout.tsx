import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='(Auth)' options={{
        headerShown: false 
      }
      }></Stack.Screen>
      <Stack.Screen name='home'></Stack.Screen>
    </Stack>
  )
}

export default RootLayout