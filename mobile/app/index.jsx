import { Redirect } from 'expo-router'
import React from 'react'
import { View, Text, Pressable } from "react-native"

  
  const index = () => {
    return (
      <View>
        <Text>App React</Text>
        <Pressable onPress={() => {}} style = {""}></Pressable>
        <Redirect></Redirect>
      </View>
    )
  }
  
  export default index