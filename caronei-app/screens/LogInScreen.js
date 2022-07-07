import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Keyboard
} from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import config from '../config/config.json'

import { useDispatch } from 'react-redux'
import { loginAuth } from '../slices/userAuth'
import { useNavigation } from '@react-navigation/native'
import { DefaultButton } from '../components/Button'
import { url } from '../requestsFunctions'
import { ReportButton } from '../components/buttons/ReportButton'

const LogInScreen = () => {
  const dispatch = useDispatch()

  const navigation = useNavigation()

  const [matricula, setMatricula] = useState(null)
  const [password, setPassword] = useState(null)
  const [message, setMessage] = useState(null) //mensagem de resposta do back-end (se o cadastro foi realizado com sucesso ou nao) ou de preenchimento do formulario

  async function login() {
    let reqs = await fetch(url + '/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userMatricula: matricula,
        userPassword: password
      })
    })

    let response = await reqs.json()
    setMessage(response.message)
    if (typeof response.token === 'number') {
      //muda o estado para logado caso tenha recebido o token
      dispatch(loginAuth(response.token))
      console.log("Login - Matricula:" + response.token)
      navigation.navigate('HomeScreen')
    }
    else{
      console.log("Login inválido")
    }
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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
                  fontSize: 38,
                  marginBottom: 15,
                  maxWidth: 200,
                  flexDirection: 'row',
                  color: '#46458D'
                }}
              >
                Entre na sua conta
              </Text>
              {message && <Text>{message}</Text>}
            </View>
            <View>
              <View style={{ marginBottom: 30 }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 5, color: '#46458D' }}
                >
                  Matrícula
                </Text>
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#46458D',
                    padding: 5,
                    backgroundColor: '#e6e6e6',
                    borderRadius: 5
                  }}
                  placeholder="Matrícula"
                  onChangeText={text => setMatricula(text)}
                />
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 5, color: '#46458D' }}
                >
                  Senha
                </Text>
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#46458D',
                    padding: 5,
                    backgroundColor: '#e6e6e6',
                    borderRadius: 5
                  }}
                  placeholder="Senha"
                  onChangeText={text => setPassword(text)}
                />

                <TouchableOpacity
                  style={{}}
                  onPress={() => navigation.navigate('RecoverPswdScreen')}
                >
                  <Text
                    style={{ fontSize: 13, marginBottom: 15, color: '#46458D' }}
                  >
                    Esqueci minha senha
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <View style={{ marginBottom: 15 }}>
                <DefaultButton title="Enviar" onPress={login} />
              </View>

              <View style={{}}>
                <DefaultButton
                  title="Voltar"
                  onPress={() => navigation.navigate('InitialScreen')}
                />
              </View>

              <TouchableOpacity
                style={{}}
                onPress={() => {
                  navigation.navigate('HomeScreen')
                }}
              >
                <Text style={{}}>Pular login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default LogInScreen
