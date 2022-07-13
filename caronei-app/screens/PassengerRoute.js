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
import { useDispatch, useSelector } from "react-redux"
import {
  selectDestination,
  selectOrigin,
  setDestination,
  setOrigin,
} from "../slices/navSlice"
import { addRoute } from "../requestsFunctions"
import { useNavigation } from "@react-navigation/native"
import { DefaultButton } from "../components/Button"
import { carregar_passageiro } from "../slices/rideState"
import { store } from "../store"

const PassengerRoute = () => {
  console.log(store.getState().ride.role + " - Tela de rota")

  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [partida, setPartida] = useState("")
  const [destino, setDestino] = useState("")
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const [orig, setOrig] = useState([{}])
  const [rota, setRota] = useState("")
  const [data, setData] = useState([{}])
  const [data2, setData2] = useState([{}])
  const [id, setId] = useState("")
  const [originalData, setOriginalData] = useState([{}])
  const [originalData2, setOriginalData2] = useState([{}])

  useEffect(() => {
    setData(paradas)
    setOriginalData(paradas)
    setData2(paradas)
    setOriginalData2(paradas)
  }, [])

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

  async function seguirParaMotorista(rota) {
    const response = await addRoute(rota)
    setId(await response)
    dispatch(carregar_passageiro())
    navigation.navigate("SearchRideScreen", { parametro: await response })
  }

  return (
    <SafeAreaView>
      <View style={tw`h-45%`}>
        <TextInput
          value={partida}
          style={{
            borderWidth: 2,
            borderColor: "#949494",
            padding: 5,
            backgroundColor: "#e6e6e6",
            borderRadius: 5,
          }}
          placeholder={"Local de Partida..."}
          onChangeText={(s) => searchP(s)}
          autoCapitalize="none"
        />
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => (
            <View>
              <TouchableHighlight
                onPress={() => {
                  setPartida(item.item.nome)
                  setOrig(item.item.para)
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
                <View style={styles.SectionStyle}>
                  <Image
                    style={styles.ImageStyle}
                    source={require("../images/markerico.png")}
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
      <View style={tw`h-45%`}>
        <TextInput
          value={destino}
          style={{
            borderWidth: 2,
            borderColor: "#949494",
            padding: 5,
            backgroundColor: "#e6e6e6",
            borderRadius: 5,
          }}
          placeholder={"Local de Destino..."}
          onChangeText={(s) => searchD(s)}
          autoCapitalize="none"
        />
        <FlatList
          data={data2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={(item) => (
            <View>
              <TouchableHighlight
                onPress={() => {
                  setDestino(item.item.nome)
                  orig.forEach((element) => {
                    if (element[item.item.ponto] != undefined) {
                      setRota(element[item.item.ponto])
                    }
                  })
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
                <View style={styles.SectionStyle}>
                  <Image
                    style={styles.ImageStyle}
                    source={require("../images/markerico.png")}
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
      <View style={tw`h-10%`}>
        <DefaultButton
          title="Confirmar"
          onPress={() => {
            if (origin?.location && destination?.location) {
              dispatch(carregar_passageiro())
              console.log(store.getState().ride.role + " - Escolheu rota")
              seguirParaMotorista(rota)
            }
          }}
        />
      </View>
    </SafeAreaView>
  )
}

export default PassengerRoute

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
