import {
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from "react-native"
import React, { useState } from "react"
import tw from "twrnc"
import Map from "../components/Map"
import { Image } from "react-native"
import { Icon } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { DefaultButton } from "../components/Button"
import { store } from "../store"
import { MOTORISTA, PASSAGEIRO, cancelar_corrida } from "../slices/rideState"
import { searchPassageiro, searchDriver } from "../requestsFunctions"
import { useDispatch } from "react-redux"

const SearchRideScreen = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [name, setName] = useState(null)
  const [partida, setPartida] = useState(null)
  const [destino, setDestino] = useState(null)
  const { parametro } = route.params
  var avaliacao = 5
  let procurando = false

  async function procurarPassageiro() {
    const response = await searchPassageiro(parametro)

    if (await response.response) {
      //caso ache uma corrida, vai para a tela de aceitar corrida (apenas motoristas)

      navigation.navigate("AcceptRideScreen", {
        //chama a tela de aceitar o passageiro
        corrida: await response,
        rotaMotorista: parametro,
      })
    } else {
      //caso não ache, deverá continuar procurando
      procurando = false
      console.log("Não achou")
    }
  }

  async function procurarMotorista() {
    const response = await searchDriver(parametro)
    if (typeof response != "string") {
      // FAZER O MATCH!!!!!!
      console.log("DEU MATCH!!!!!!!!!!")
    } else {
      console.log("Nenhum motorista por enquanto")
    }
  }

  // USAR NO BOTÃO DE CANCELAR VIAGEM
  // async function cancelarRota() {
  //   const response = await removeRoute(parametro)

  // }

  if (store.getState().ride.role == MOTORISTA) {
    procurarPassageiro()
  } else {
    console.log(parametro) //printa a rota
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ backgroundColor: "#EFE9E5", flex: 1 }}>
          <View
            //parte do mapa
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: 1,
            }}
          >
            <Map />
          </View>
          <View
            style={{
              //'rgba(144,144, 144, 0.1)'
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
              marginBottom: 5,
            }}
          >
            <Text></Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <View>
                <Icon name="account-circle" type="material" size={100} />
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: "#4D4C7D",
                    borderRadius: 25,
                  }}
                >
                  {store.getState().ride.role == MOTORISTA ? (
                    <Text style={{ color: "white" }}>
                      {" "}
                      Procurando passageiro...{" "}
                    </Text>
                  ) : (
                    <Text style={{ color: "white" }}>
                      {" "}
                      Procurando motorista...{" "}
                    </Text>
                  )}
                </View>

                <View
                  style={{
                    flexDirection: "row",
                    padding: 10,
                  }}
                >
                  <View
                    style={{ backgroundColor: "#4D4C7D", borderRadius: 25 }}
                  >
                    <Text style={{ color: "white" }}>
                      {" "}
                      <Icon name="stars" type="material" size={15} /> ?{" "}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              marginTop: 5,
              padding: 5,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <DefaultButton
              title="Atualizar Busca "
              onPress={() => {
                if (store.getState().ride.role == PASSAGEIRO) {
                  procurarMotorista()
                }
                // navigation.navigate('HomeScreen')
              }}
            />
          </View>
          <View
            style={{
              padding: 5,

              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <DefaultButton
              title="Cancelar viagem"
              onPress={() => {
                dispatch(cancelar_corrida())
                navigation.navigate("HomeScreen")
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default SearchRideScreen
