// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TextInput
} from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import tw from 'twrnc'
import NavOptions from '../components/NavOptions'
import { GOOGLE_MAPS_APIKEY } from '@env'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch } from 'react-redux'
import { setDestination, setOrigin } from '../slices/navSlice'
import { logoutAuth } from '../slices/userAuth'
import { store } from '../store'
import { useNavigation } from '@react-navigation/native'
import config from '../config/config.json'
import paradas from '../paradas/paradas.json'
import { DefaultButton } from '../components/Button'

const RateUserScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [name, setName] = useState(null)
  const [comment, setComment] = useState(null)

  async function getUserData() {
    //pega os dados do banco de dados e preenche as variaveis

    let reqs = await fetch(url + '/data/' + store.getState().auth.matricula, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
    const response = await reqs.json()

    setName(response.name)
    setRating(response.rating)
    setExperience(response.experience)
    setEmail({
      ...email,
      data: response.email,
      visibility: response.emailVisibility
    })
    setGender({
      ...gender,
      value: response.gender,
      data: getGenderName(response.gender),
      visibility: response.genderVisibility,
      changed: false
    })
    setPhone({
      ...phone,
      visibility: response.phoneVisibility,
      changed: false
    })
    setBirth({
      ...birth,
      visibility: response.birthVisibility,
      data: response.birth ? new Date(response.birth) : response.birth //converte para objeto de data (chega do back em string)
    })
  }
  getUserData



  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={{ backgroundColor: '#EFE9E5', flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 45
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 30,
                marginBottom: 30,
                maxWidth: 200,
                color: '#46458D'
              }}
            >
              Avalie sua carona
            </Text>
            {/* Esperando para saber como pegar o nome do motorista */}
            <Text style={{
              fontSize: 20,
              marginBottom: 30,
              maxWidth: 200,
              color: '#46458D'
            }}>{name}</Text>

            <Text style={{
              fontSize: 20,
              color: '#46458D',
              textAlign: "center"
            }}>Avaliar</Text>


            <Text style={{
              fontSize: 15,
              textAlign: "right",
              color: '#46458D'
            }}>Todos os comentários passarão por uma avaliação antes de publicados</Text>

            <Text style={{
              fontSize: 18,
              marginBottom: 30,
              maxWidth: 200,
              color: '#46458D'
            }}>Comentário:</Text>

            <TextInput
              placeholder="Escreva seu comentário aqui"
              styles={{
                container: {
                  flex: 0
                },
                textInput: {
                  fontSize: 18,
                  color: '#4D4C7D'
                },

              }}
            />

            <View style={{ marginBottom: 15 }}>
              <DefaultButton title="Enviar" onChangeText={text => setComment(text)} />
            </View>

            <View style={{}}>
              <DefaultButton title="Lembrar mais tarde" onPress={() => navigation.navigate('HomeScreen')} />
            </View>

            <View style={{}}>
              <DefaultButton title="Denunciar usuário" onPress={() => navigation.navigate('ReportScreen')} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RateUserScreen

const styles = StyleSheet.create({
  text: {
    color: 'blue'
  }
})
