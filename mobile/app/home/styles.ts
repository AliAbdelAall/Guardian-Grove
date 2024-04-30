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
    overflow: 'visible',
    
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
    marginTop:10,
    backgroundColor: '#ECECEC',
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  psychologistCardName:{
    fontSize:22,
    fontWeight: '600'
  },
  psychologistCardSpeciality:{
    fontSize:16,
    fontWeight: '300'
  },
  psychologistCardRating:{
    fontSize:14,
    fontWeight: '400'
  },

  separator:{
    width:20
  }

})
export default styles