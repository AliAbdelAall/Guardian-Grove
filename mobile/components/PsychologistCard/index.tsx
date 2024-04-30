import React from 'react'
import { Image, Text, View } from 'react-native'
import { styles } from './styles'

const PsychologistCard = ({profilePic, name, speciality, rating}) => {
  return (
    <View style ={styles.psychologistCardWrapper}>
    <Image source={profilePic}  style ={styles.psychologistCardImage}></Image>
    <View style={styles.psychologistCardInfoWrapper}>
      <Text style={styles.psychologistCardName}>{`Dr. ${name}`}</Text>
      <Text style={styles.psychologistCardSpeciality}>{`${speciality} specialist`}</Text>
      <Text style={styles.psychologistCardRating}>{`Rating: ${rating}`}</Text>
    </View>
  </View>
  )
}



export default PsychologistCard