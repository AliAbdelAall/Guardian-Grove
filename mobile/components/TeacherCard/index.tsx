import React from 'react'
import { Image, Pressable, Text, View } from 'react-native'
import { styles } from './styles'

const TeacherCard = ({profilePic, name, school, speciality}) => {
  return (
    <View style ={styles.teachercardContainer}>
      <View style ={styles.teachercardWrapper}>
        <Image source={profilePic}  style ={styles.teachercardImage}></Image>
        <View style={styles.teachercardInfoWrapper}>
          <Text style={styles.teacherCardName}>{`${name}`}</Text>
          <Text style={styles.teacherCardSchoold}>{`${school}`}</Text>
          <Text style={styles.teacherCardSpeciality}>{`${speciality} teacher`}</Text>
        </View>
      </View>
      <Pressable style={styles.connectButton}>
        <Text style={styles.connectButtonText}>Connect</Text>
      </Pressable>
    </View>
  )
}



export default TeacherCard