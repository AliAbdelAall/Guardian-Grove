import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
    fontWeight: '600',
    color: '#222222'
  },
  psychologistCardSpeciality:{
    fontSize:16,
    fontWeight: '300',
    color: '#677294'
  },
  psychologistCardRating:{
    fontSize:16,
    fontWeight: '400'
  },
})