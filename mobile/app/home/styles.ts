import { StyleSheet } from "react-native";



const styles = StyleSheet.create({
  userProfileWrapper:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 7,
  
  },
  userProfilePic:{
    width: 40,
    height:40,
    borderRadius: 18
  },
  userName:{
    fontSize: 20,

  },
  heroImage:{
    width: '100%',
    borderRadius: 20,
    position: 'relative',
  },
  heroContainer:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroTextWrapper:{
    width: '80%',
    position: 'absolute',
    
  },
  heroTitle:{
    fontSize:24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  heroText:{
    fontSize: 16,
    color: 'white',
    textAlign: 'center'
  },
  sectionTitleWrapper:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 60,
  },
  sectionTitle:{
    fontSize:18,
    fontWeight: '600'
  },
  seeAll:{
    fontSize: 16
  },
  psychologistCardWrapper:{
    height:250,
    width:165,
  },
  psychologistCardImage:{
    height:165,
    width:165,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  psychologistCardInfoWrapper:{
    height: 85,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ECECEC',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  psychologistCardName:{
    marginTop: -10,
    fontSize:24,
    fontWeight: '600'
  },
  psychologistCardSpeciality:{
    fontSize:16,
    fontWeight: '300'
  },
  psychologistCardRating:{
    fontSize:16,
    fontWeight: '400'
  },

  horizontalSeparator:{
    width:20
  },
  teachercardContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'flex-end',
    width: '100%',
    marginBottom: 15
  },
  teachercardWrapper:{
    display: 'flex',
    flexDirection: 'row',
  },
  teachercardImage:{
    width: 75,
    height:75,
    borderRadius:5
  },
  teachercardInfoWrapper:{
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 10
  },
  teacherCardName:{
    marginTop: -10,
    fontSize:24,
    fontWeight: '600'
  },
  teacherCardSchoold:{
    fontSize:16,
    fontWeight: '300'
  },
  teacherCardSpeciality:{
    fontSize:16,
    fontWeight: '400'
  },
  connectButton:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 85,
    height:30,
    backgroundColor: '#75AB19',
    borderRadius:5,
  },
  connectButtonText:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'white'
  }





})
export default styles