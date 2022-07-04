import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#4D4C7D'
  },
  text: {
    fontSize: 18,
    lineHeight: 21,
    fontWeight: 'normal',
    letterSpacing: 0.25,
    color: 'white'
  },
  textInput: {
    borderWidth: 2,
    borderColor: '#949494',
    padding: 5,
    backgroundColor: '#e6e6e6',
    borderRadius: 5
  },
  dialog:{
    backgroundColor: "#EFE9E5",
    borderColor: "#363062",
    borderRadius: 40,
    borderWidth:4
  },
  dialogTitle:{
    color:"#46458D",
    fontSize: 25,
    marginTop: 10
  },
  profileLine:{
    display: "flex", 
    flexDirection: "row", 
    alignItems: "center",
    marginTop: 5,
  },
  profileLineDataTitle:{
    color: "#46458D", fontSize: 15
  },
  profileLineData:{
    color: "rgba(70, 69, 141, 0.8)", 
    fontSize: 12, 
  },
  profileIconButton:{

  },
  profileSectionTitle:{
    color: "#46458D", fontSize: 20
  },
  userHeaderView:{
    display: "flex", flexDirection:"row"
  },
  userHeaderName:{
    color: "#46458D", fontSize: 40
  },
  profileSectionHeader:{
    display: "flex", 
    flexDirection: "row", 
    alignItems:"center",
    marginTop: 15
  }
})