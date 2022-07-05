import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableHighlight,
  Image,
} from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import paradas from "../paradas/paradas.json"
import tw from "twrnc"
import { useDispatch } from "react-redux"
import { setDestination, setOrigin } from "../slices/navSlice"
import { addRoute } from "../requestsFunctions"

const Autocomplete = (props) => {
  // title, onPress
  const dispatch = useDispatch()
  const [ponto, setPonto] = useState("")
  const [orig, setOrig] = useState([{}])
  const [rota, setRota] = useState("")
  const [data, setData] = useState([{}])
  const [originalData, setOriginalData] = useState([{}])

  useEffect(() => {
    setData(paradas)
    setOriginalData(paradas)
  }, [])

  function search(s) {
    let arr = [...originalData]
    setData(arr.filter((d) => d.nome.toLowerCase().includes(s.toLowerCase())))
    setPonto(s)
  }

  return (
    <View>
      <TextInput
        value={ponto}
        style={{
          borderWidth: 2,
          borderColor: "#949494",
          padding: 5,
          backgroundColor: "#e6e6e6",
          borderRadius: 5,
        }}
        placeholder={props.title}
        onChangeText={(s) => search(s)}
        autoCapitalize="none"
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={(item) => (
          <View>
            <TouchableHighlight onPress={() => props.onPress(item)}>
              <View style={styles.SectionStyle}>
                <Image
                  style={styles.ImageStyle}
                  source={require("../images/markerIco.png")}
                />
                <Text style={styles.rowText} numberOfLines={1}>
                  {item.item.nome}
                </Text>
              </View>
            </TouchableHighlight>
          </View>
        )}
      />
    </View>
  )
}

export default Autocomplete

const styles = StyleSheet.create({
  card: {
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 14,
    color: "#444",
    fontWeight: "normal",
    marginTop: 7,
  },
  body: {
    fontSize: 13,
    color: "#777",
    fontWeight: "normal",
    marginTop: 7,
  },
  input: {
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  itemm: {
    justifyContent: "center",
    height: "20%",
  },
  rowText: {
    color: "#000",
    fontSize: 20,
    marginStart: 20,
    borderColor: "#FAFAFA",
    flex: 1,
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignItems: "center",
  },
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
})
