import React, { useEffect, useState } from 'react'
import { FlatList, Image, Pressable, ScrollView, Text, ToastAndroid, View, } from 'react-native'
import { router } from 'expo-router';
import StarRating, {StarRatingDisplay} from 'react-native-star-rating-widget';

// Styles
import utilities from '../../Styles/utilities'
import styles from './styles'

// Components
import PsychologistCard from '../../components/PsychologistCard'
import TeacherCard from '../../components/TeacherCard'

// Assets
const profilePic = require("../../assets/profile/profile.jpg")
const heroImage = require("../../assets/images/hero-image.png")

// Utilities
import { useSendRequest } from '../../core/tools/remote/request';
import { requestMethods } from '../../core/enum/requestMetods';

const Main = () => {

  const sendRequest = useSendRequest()

  const [rating, setRating] = useState(0)
  const [psychologistsList, setPsychologistsList] = useState([])
  const [teachersList, setTeachersList] = useState([])

  console.log(rating)

  const psychologists = [
    {
      id: 0,
      profilePic,
      name: "Jhon Doe",
      speciality: 'development',
      rating: 4
    },
    {
      id: 1,
      profilePic,
      name: "Jhonny Donny",
      speciality: 'family',
      rating: 3.5
    },
    {
      id: 2,
      profilePic,
      name: "Ahmad Fakih",
      speciality: 'development',
      rating: 4.5
    },
    {
      id: 3,
      profilePic,
      name: "Lilly barney",
      speciality: 'family',
      rating: 4.5
    },
  ]

  const teachers = [
    {
      id: 0,
      profilePic,
      name: "Jhon Doe",
      school: 'School Name',
      speciality:'Math',

    },
    {
      id: 1,
      profilePic,
      name: "Jhonny Donny",
      school: 'School Name',
      speciality:'English',
    },
    {
      id: 2,
      profilePic,
      name: "Ahmad Fakih",
      school: 'School Name',
      speciality:'Physics',
    },
    {
      id: 3,
      profilePic,
      name: "Lilly barney",
      school: 'School Name',
      speciality:'History',
    },
  ]

  
  useEffect(()=>{
    loadPsychologistAndTeachers()
  },[])

  const loadPsychologistAndTeachers = () => {
    sendRequest(requestMethods.GET, "/api/parent/get-psychologists-teachers").then((response) => {
      if (response){
        console.log(response)
        setPsychologistsList(response.data.psychologists)
        setTeachersList(response.data.teachers)
      }
    }).catch((error) => {
      console.log(error)
      ToastAndroid.show("Something went wrong", 5)
    })
  }


  return (


    <View style={utilities.container}>

      {/* <StarRating
        rating={rating}
        onChange={(e) => setRating(e)}
        maxStars={5}
        starSize={30}
        enableHalfStar={true}
      /> */}
      
      <View style={styles.userProfileWrapper}>
        <Image source={profilePic} style={styles.userProfilePic}></Image>
        <Text style={styles.userName}>Hi Nabih!</Text>
      </View>
      <ScrollView 
      showsVerticalScrollIndicator={false}>
        <View style={styles.heroContainer}>
          <Image source={heroImage} style={styles.heroImage}></Image>
          <View style={styles.heroTextWrapper}>
            <Text style={styles.heroTitle}>We make parenting easy</Text>
            <Text style={styles.heroText}> Lorem ipsum dolor sit amet, consectetur adipiscing elit</Text>
          </View>
        </View>

        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>Popular Specialists</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <FlatList
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={psychologists}
        ItemSeparatorComponent={() => {
          return <View style={styles.horizontalSeparator}></View>
        }} 
        renderItem={(element) => {
          return (
            <PsychologistCard
            key={element.item.id}
            profilePic={element.item.profilePic}
            name={element.item.name}
            speciality={element.item.speciality}
            rating={element.item.rating}
            />
         )
        }
          
        }/>

        <View style={styles.sectionTitleWrapper}>
          <Text style={styles.sectionTitle}>Popular Teachers</Text>
          <Pressable onPress={() => ToastAndroid.show("Something went wrong", 35)}>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <FlatList
        data={teachers}
        renderItem={(element) => {
          return ( 
            <TeacherCard
            key={element.item.id}
            profilePic={element.item.profilePic}
            name={element.item.name}
            school={element.item.school}
            speciality={element.item.speciality}
            />   
          )     
        }  
        }/>
      </ScrollView>
    </View>
  )
}


export default Main