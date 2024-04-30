import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name='index' options={{
        headerShown: false 
        }
      }/>
      <Stack.Screen name='(Auth)' options={{
        headerShown: false 
        }
      }/>
      <Stack.Screen name='home' options={{
        headerShown: false 
        }
      }/>

    </Stack>
  )
}

export default RootLayout