import { StyleSheet } from "react-native";

export const childrenStyles = StyleSheet.create({
  childrenContainer:{
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
    paddingBottom:15
  },
  childrenTextWrapper:{
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  childrenText:{
    width: '80%',
    marginTop:12,
    marginBottom:20,
    lineHeight: 25,
    textAlign: 'center',
    color: '#677294',
    fontSize: 16,
  },
  childWrapper:{
    marginBottom: 25
  },
  childImageWrapper:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  childImage:{
    width: 55,
    height: 55,
    borderRadius: 70
  },
  childName:{
    fontSize:22,
    color: '#677294',
    marginLeft: 12
  },
  inputWrapper:{
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  }
})