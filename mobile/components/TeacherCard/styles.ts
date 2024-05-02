import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  teachercardContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'flex-end',
    width: '100%',
    marginBottom: 15,
    shadowColor: '#3A3A3A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    borderRadius:7,
    backgroundColor: '#ECECEC'
    
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
    fontSize:20,
    fontWeight: '600'
  },
  teacherCardSchoold:{
    fontSize:14,
    fontWeight: '300',
    color: '#677294'
  },
  teacherCardSpeciality:{
    fontSize:14,
    fontWeight: '400',
    color: '#677294'
  },
  connectButton:{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 85,
    height:30,
    backgroundColor: '#75AB19',
    borderRadius:5,
    marginRight: 7,
    marginBottom: 7
  },
  connectButtonText:{
    fontSize: 16,
    fontWeight: 'bold',
    color:'white'
  }
})