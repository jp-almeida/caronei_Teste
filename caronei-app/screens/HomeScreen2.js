import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableHighlight,
} from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import paradas from "../paradas/paradas.json"
import tw from "twrnc"
import { useDispatch } from "react-redux"
import { setDestination, setOrigin } from "../slices/navSlice"

const HomeScreen2 = () => {
  const dispatch = useDispatch()
  const [partida, setPartida] = useState("")
  const [destino, setDestino] = useState("")
  const [data, setData] = useState([{}])
  const [data2, setData2] = useState([{}])
  const [originalData, setOriginalData] = useState([{}])
  const [originalData2, setOriginalData2] = useState([{}])

  useEffect(() => {
    setData(paradas)
    setOriginalData(paradas)
    setData2(paradas)
    setOriginalData2(paradas)
  }, [])

  // function renderOptions(item) {
  //   return (
  //     <View style={styles.card}>
  //       <TouchableHighlight
  //         onPress={() => {
  //           setPartida(item.item.nome)
  //           setData([])
  //         }}
  //       >
  //         <Text style={styles.rowText} numberOfLines={1}>
  //           {item.item.nome}
  //         </Text>
  //       </TouchableHighlight>
  //     </View>
  //   )
  // }

  function searchP(s) {
    let arr = [...originalData]
    setData(arr.filter((d) => d.nome.toLowerCase().includes(s.toLowerCase())))
    setPartida(s)
  }

  function searchD(s) {
    let arr = [...originalData2]
    setData2(arr.filter((d) => d.nome.toLowerCase().includes(s.toLowerCase())))
    setDestino(s)
  }

  return (
    <SafeAreaView>
      <View style={tw`h-1/2`}>
        <TextInput
          value={partida}
          style={styles.input}
          placeholder={"Local de Partida..."}
          onChangeText={(s) => searchP(s)}
          autoCapitalize="none"
        />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => (
            <View style={styles.card}>
              <TouchableHighlight
                onPress={() => {
                  setPartida(item.item.nome)
                  setData([])
                  dispatch(
                    setOrigin({
                      location: {
                        lat: item.item.lat,
                        lng: item.item.lng,
                      },
                    })
                  )
                  dispatch(setDestination(null))
                }}
              >
                <Text style={styles.rowText} numberOfLines={1}>
                  {item.item.nome}
                </Text>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
      <View style={tw`h-1/2`}>
        <TextInput
          value={destino}
          style={styles.input}
          placeholder={"Local de Destino..."}
          onChangeText={(s) => searchD(s)}
          autoCapitalize="none"
        />
        <FlatList
          data={data2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => (
            <View style={styles.card}>
              <TouchableHighlight
                onPress={() => {
                  setDestino(item.item.nome)
                  setData2([])
                  dispatch(
                    setDestination({
                      location: {
                        lat: item.item.lat,
                        lng: item.item.lng,
                      },
                    })
                  )
                }}
              >
                <Text style={styles.rowText} numberOfLines={1}>
                  {item.item.nome}
                </Text>
              </TouchableHighlight>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen2

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
  },
})
