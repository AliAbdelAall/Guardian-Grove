import { Stack, Tabs } from 'expo-router'
import React from 'react'

const HomeLayout = () => {
  return (
    <Tabs >
      <Tabs.Screen name='Home' options={{
        title: "Home",
        headerShown:false
      }}></Tabs.Screen>
    </Tabs>
  )
}

export default HomeLayout