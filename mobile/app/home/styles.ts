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
  

})
export default styles