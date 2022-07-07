import {
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
} from "react-native"
import React, { useState } from "react"
import tw from "twrnc"
import { Image } from "react-native"
import { Icon } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { DefaultButton } from "../components/Button"
import { store } from "../store.js"
import {
  cancelar_corrida,
  EM_CORRIDA_MOTORISTA,
  EM_CORRIDA_PASSAGEIRO,
  MOTORISTA,
} from "../slices/rideState"
import { useDispatch } from "react-redux"
import { getPublicData } from "../requestsFunctions"

const MatchRideScreen = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { corrida } = route.params

  const [partida, setPartida] = useState(corrida.rota.partida) //pega o nome do primeiro ponto da roda
  const [destino, setDestino] = useState(corrida.rota.destino) //pega o nome do último ponto da rota

  const [usuario, setUsuario] = useState({})
  const [carregou, setCarregou] = useState(false)

  async function getData() {
    console.log(corrida.matricula)
    //carrega os dados do passeiro ou do motorista de acordo com a matricula encontrada
    let resp = await getPublicData(corrida.matricula)
    setUsuario(resp)
  }

  if (!carregou) {
    setCarregou(true)
    getData()
  }
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ backgroundColor: "#EFE9E5", flex: 1 }}>
          <Image //por o mapa
            style={{
              width: "100%",
              height: undefined,
              aspectRatio: 1,
            }}
            source={require("../images/mapapici.png")}
          />
          <View
            style={{
              //'rgba(144,144, 144, 0.1)'
              justifyContent: "center",
              alignItems: "center",
              margin: 10,
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
                  {store.getState().ride.ride == EM_CORRIDA_PASSAGEIRO ||
                  store.getState().ride.ride == EM_CORRIDA_MOTORISTA ? (
                    <Text style={{ color: "white" }}> Em corrida </Text>
                  ) : store.getState().ride.role == MOTORISTA ? (
                    <Text style={{ color: "white" }}>
                      {" "}
                      Passageiro está a caminho{" "}
                    </Text>
                  ) : (
                    <Text style={{ color: "white" }}>
                      {" "}
                      Motorista está a caminho{" "}
                    </Text>
                  )}

                  <Text>{usuario.name}</Text>
                  <Text>
                    {partida} - {destino}
                  </Text>
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
                      <Icon name="stars" type="material" size={15} />{" "}
                      {usuario.avaliacao}{" "}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              marginTop: 190,
              padding: 25,

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
          <View
            style={{
              padding: 5,
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <DefaultButton
              title="Finalizar viagem"
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

export default MatchRideScreen
