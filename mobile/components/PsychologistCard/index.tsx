import React from 'react'
import { Image, Text, View } from 'react-native'
import {StarRatingDisplay} from 'react-native-star-rating-widget';

// Styles
import { styles } from './styles'

const PsychologistCard = ({profilePic, name, speciality, rating}) => {
  return (
    <View style ={styles.psychologistCardWrapper}>
    <Image source={profilePic}  style ={styles.psychologistCardImage}></Image>
    <View style={styles.psychologistCardInfoWrapper}>
      <Text style={styles.psychologistCardName}>{`Dr. ${name}`}</Text>
      <Text style={styles.psychologistCardSpeciality}>{`${speciality} specialist`}</Text>
      <StarRatingDisplay
        rating={rating}
        maxStars={5}
        starSize={20}
        enableHalfStar={true}
        emptyColor="#C4C4C4"
        starStyle={styles.starStyle}
        style={styles.starRatingDisplay}
      />
    </View>
  </View>
  )
}



export default PsychologistCard