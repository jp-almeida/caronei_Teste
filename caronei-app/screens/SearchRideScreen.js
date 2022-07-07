import {
  Text,
  View,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard
} from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import Map from '../components/Map'
import { Image } from 'react-native'
import { Icon } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import { DefaultButton } from '../components/Button'
import { store } from '../store'
import { MOTORISTA, PASSAGEIRO, cancelar_corrida } from '../slices/rideState'
import {
  searchPassageiro,
  searchDriver,
  removeRoute
} from '../requestsFunctions'
import { useDispatch, useSelector } from 'react-redux'
import { getNome } from '../paradas/paradasFunctions'
import { selectDestination, selectOrigin } from '../slices/navSlice'

const SearchRideScreen = ({ route }) => {
  const dispatch = useDispatch()
  const { parametro } = route.params
  const navigation = useNavigation()
  const [name, setName] = useState(null)
  const [message, setMessage] = useState('Procurando...')

  //caso exista "rota" no parametro (isso so ocorre se o usuário for motorista), irá setar o nome da origem e do destino para passar para a tela de match
  const [rota, setRota] = useState(parametro.rota ? eval(parametro.rota) : null)
  const [partida, setPartida] = useState(rota ? getNome(rota[0]) : null)
  const [destino, setDestino] = useState(rota ? getNome(rota.slice(-1)) : null)

  let procurando = false

  async function procurarPassageiro() {
    const response = await searchPassageiro(parametro)

    if (await response.response) {
      //caso ache uma corrida, vai para a tela de aceitar corrida (apenas motoristas)

      navigation.navigate('AcceptRideScreen', {
        //chama a tela de aceitar o passageiro
        corrida: await response,
        rotaMotorista: parametro
      })
    } else {
      //caso não ache, deverá continuar procurando
      procurando = false
      setMessage('Clique no botão para tentar novamente.')
    }
  }

  async function procurarMotorista() {
    const response = await searchDriver(parametro.id)
    if (await response.response) {
      navigation.navigate('MatchRideScreen', {
        matricula: await response.content.matriculaMotorista,
        corrida: await response.content,
        coordenadas: {
          origin: useSelector(selectOrigin),
          destination: useSelector(selectDestination)
        },
        rota: {
          destino: destino,
          partida: partida
        }
      })
    } else {
      console.log(response.content)
      setMessage('Clique no botão para tentar novamente.')
    }
  }

  async function cancelarRota() {
    //parametro é o id da rota
    const response = await removeRoute(parametro)

    if (await response) {
      navigation.navigate('HomeScreen')
    }
  }

  if (store.getState().ride.role == MOTORISTA) {
    //se for motorista
    procurarPassageiro()
  } else {
    //se for passageiro
    procurarMotorista()
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ backgroundColor: '#EFE9E5', flex: 1 }}>
          <View
            //parte do mapa
            style={{
              width: '100%',
              height: undefined,
              aspectRatio: 1
            }}
          >
            <Map />
          </View>
          <View
            style={{
              //'rgba(144,144, 144, 0.1)'
              justifyContent: 'center',
              alignItems: 'center',
              margin: 10,
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
              <View>
                <Icon name="account-circle" type="material" size={100} />
              </View>
              <View>
                <View
                  style={{
                    backgroundColor: '#4D4C7D',
                    borderRadius: 25
                  }}
                >
                  {store.getState().ride.role == MOTORISTA ? (
                    <Text style={{ color: 'white' }}>
                      {' '}
                      Procurando passageiro...{' '}
                    </Text>
                  ) : (
                    <Text style={{ color: 'white' }}>
                      {' '}
                      Procurando motorista...{' '}
                    </Text>
                  )}
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
                      <Icon name="stars" type="material" size={15} /> ?{' '}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              //marginTop: 5,
              padding: 5,
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <DefaultButton
              title="Atualizar Busca "
              onPress={() => {
                setMessage('Procurando...')
                if (store.getState().ride.role == PASSAGEIRO) {
                  //se for passageiro
                  procurarMotorista()
                } else {
                  //se for motorista
                  procurarPassageiro()
                }
              }}
            />
          </View>
          <View
            style={{
              padding: 5,
              flexDirection: 'row',
              justifyContent: 'space-around'
            }}
          >
            <DefaultButton
              title="Cancelar viagem"
              onPress={() => {
                if (store.getState().ride.role == MOTORISTA) {
                  dispatch(cancelar_corrida())
                  navigation.navigate('HomeScreen')
                } else {
                  cancelarRota()
                }
              }}
            />

            <Text>{message}</Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default SearchRideScreen
