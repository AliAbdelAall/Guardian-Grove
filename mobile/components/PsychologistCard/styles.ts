import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  psychologistCardWrapper:{
    height:250,
    width:175,
    shadowColor: '#3A3A3A',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginBottom: 3,
    borderRadius:12  
  },
  psychologistCardImage:{
    height:165,
    width:175,
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
    fontSize:20,
    fontWeight: '600',
    color: '#222222'
  },
  psychologistCardSpeciality:{
    fontSize:14,
    fontWeight: '300',
    color: '#677294'
  },
  psychologistCardRating:{
    fontSize:16,
    fontWeight: '400'
  },
  starRatingDisplay: {
    marginVertical: 2,
  },
  starStyle:{
    marginHorizontal: 0
  }
})