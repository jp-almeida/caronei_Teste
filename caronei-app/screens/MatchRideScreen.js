import {
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard
} from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc'
import { Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { DefaultButton } from '../components/Button'
import { store } from '../store.js'
import {
  cancelar_corrida,
  EM_CORRIDA_MOTORISTA,
  EM_CORRIDA_PASSAGEIRO,
  MOTORISTA
} from '../slices/rideState'
import { useDispatch } from 'react-redux'
import {
  acabarCorrida,
  getPublicData,
  verificarStatus
} from '../requestsFunctions'
import { getCoords } from '../paradas/paradasFunctions'
import Map from '../components/Map'

// chamar {corrida: <obj corrida>, rota: {partida: <partida>, destino: <destino>}, matricula: <matricula outro usuario>, coordenadas: {origin: <origin>, destination: <destination>}}

const MatchRideScreen = ({ route }) => {
  console.log(store.getState().ride.role + ' - Tela da corrida')
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { corrida, rota, matricula, coordenadas } = route.params

  const [partida, setPartida] = useState(rota.partida) //pega o nome do primeiro ponto da roda
  const [destino, setDestino] = useState(rota.destino) //pega o nome do último ponto da rota

  const [usuario, setUsuario] = useState({})
  const [carregou, setCarregou] = useState(false)

  const [readyUpdate, setReadyUpdate] = useState(true)

  const origin = coordenadas.origin
  const destination = coordenadas.destination

  async function getData() {
    console.log('CORRIDA: ', corrida)
    console.log(matricula)
    //carrega os dados do passeiro ou do motorista de acordo com a matricula encontrada
    let resp = await getPublicData(matricula)
    setUsuario(resp)
  }

  async function verificarStatusCorrida() {
    //verifica o status da corrida: se ela foi cancelada ou finalizada
    let resp = await verificarStatus(corrida.idRota)
    if (!(await resp.ativa)) {
      console.log(
        store.getState().ride.role + ' - Identificou: corrida inativa'
      )
      if (await resp.finalizada) {
        console.log(
          store.getState().ride.role + ' - Identificou: corrida finalizada'
        )
        navigation.navigate("RateUserScreen", {matricula: matricula, rota: {partida: partida, destino: destino}})
      } else {
        console.log(
          store.getState().ride.role + ' - Identificou: corrida cancelada'
        )
        navigation.navigate("HomeScreen")
      }
    } else {
      console.log(
        store.getState().ride.role + ' - Identificou: corrida ainda ativa'
      )
    }
  }

  async function acabar(finalizar) {
    let resp = await acabarCorrida(corrida.idRota, finalizar)

    if (await resp.response) {
      console.log(
        store.getState().ride.role +
          ' - Desativação da corrida com sucesso. Indo para homescreen'
      )
      dispatch(cancelar_corrida())
      navigation.navigate('RateUserScreen', {
        matricula: matricula,
        rota: { partida: partida, destino: destino }
      })
    } else {
    }
  }

  if (!carregou) {
    setCarregou(true)
    getData()
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ backgroundColor: '#EFE9E5', flex: 1 }}>
          <View //por o mapa
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1
            }}
          >
            <Map origin={origin} destination={destination} />
          </View>
          <View
            style={{
              //'rgba(144,144, 144, 0.1)'
              justifyContent: 'center',
              alignItems: 'center',
              //margin: 10,
              marginBottom: 5
            }}
          >
            <Text></Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around'
              }}
            >
              <View style={{ width: '25%' }}>
                <Icon name="account-circle" type="material" size={100} />
              </View>
              <View style={{ marginLeft: '3%', width: '75%' }}>
                <View
                  style={{
                    backgroundColor: '#4D4C7D',
                    borderRadius: 25
                  }}
                >
                  {store.getState().ride.ride == EM_CORRIDA_PASSAGEIRO ||
                  store.getState().ride.ride == EM_CORRIDA_MOTORISTA ? (
                    <Text style={{ color: 'white' }}> Em corrida </Text>
                  ) : store.getState().ride.role == MOTORISTA ? (
                    <Text style={{ marginLeft: '5%', color: 'white' }}>
                      {' '}
                      Passageiro está esperando{' '}
                    </Text>
                  ) : (
                    <Text style={{ color: 'white' }}>
                      {' '}
                      Motorista está a caminho{' '}
                    </Text>
                  )}

                  <Text style={{ marginLeft: '5%' }}>{usuario.name}</Text>
                  <View style={{ marginLeft: '5%', flexDirection: 'row' }}>
                    <Text style={{ width: '47%' }}>{partida}</Text>
                    <View style={{ width: '6%' }}>
                      <Text> - </Text>
                    </View>
                    <Text style={{ width: '47%' }}>{destino}</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    padding: 10
                  }}
                >
                  <View
                    style={{ backgroundColor: '#4D4C7D', borderRadius: 25 }}
                  >
                    <Text style={{ color: 'white' }}>
                      {' '}
                      <Icon name="stars" type="material" size={15} />{' '}
                      {usuario.avaliacao}{' '}
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

              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <DefaultButton
              title="Atualizar viagem"
              onPress={() => {
                verificarStatusCorrida()
              }}
            />
          </View>

          <View
            style={{
              padding: 25,
              marginTop: '10%',
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <View style={{ width: '47%' }}>
              <DefaultButton
                title="Cancelar viagem"
                onPress={() => {
                  console.log(
                    store.getState().ride.role + ' - Cancelou corrida ativa'
                  )
                  acabar(false)
                }}
              />
            </View>
            <View style={{ width: '6%' }} />
            <View style={{ width: '47%' }}>
              <DefaultButton
                title="Finalizar viagem"
                onPress={() => {
                  console.log(
                    store.getState().ride.role + ' - Finalizou corrida'
                  )
                  acabar(true)
                }}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default MatchRideScreen
