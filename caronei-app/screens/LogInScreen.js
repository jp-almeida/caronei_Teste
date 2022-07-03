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

//codigo adaptado de https://webdesignemfoco.com/cursos/react-js/integracoes-com-react-native-3-frontend

const LogInScreen = () => {
  const dispatch = useDispatch()

  const navigation = useNavigation()

  const [matricula, setMatricula] = useState(null)
  const [password, setPassword] = useState(null)
  const [message, setMessage] = useState(null) //mensagem de resposta do back-end (se o cadastro foi realizado com sucesso ou nao) ou de preenchimento do formulario

  async function login() {
    //gambiarra porque as portas não estavam batendo
    let original_port = config.urlRootNode.split(':')[2]
    let url = config.urlRootNode.replace(original_port, config.backend_port)
    //console.log(url)
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

      navigation.navigate('HomeScreen')
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
                  marginBottom: 30,
                  maxWidth: 200,
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
                  style={{ fontSize: 18, marginBottom: 15, color: '#46458D' }}
                >
                  E-mail ou matrícula
                </Text>
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#949494',
                    padding: 5,
                    backgroundColor: '#e6e6e6',
                    borderRadius: 5
                  }}
                  onChangeText={text => setMatricula(text)}
                />
              </View>

              <View style={{ marginBottom: 30 }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 15, color: '#46458D' }}
                >
                  Senha
                </Text>
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#949494',
                    padding: 5,
                    backgroundColor: '#e6e6e6',
                    borderRadius: 5
                  }}
                  onChangeText={text => setPassword(text)}
                />
              </View>
            </View>

            <View>
              <View style={{ marginBottom: 15 }}>
                <DefaultButton title="Enviar" onPress={login} />
              </View>

              <View style={{}}>
                <DefaultButton title="Voltar" onPress={() => navigation.navigate('InitialScreen')} />
              </View>

              <TouchableOpacity
                style={{}}
                onPress={() => navigation.navigate('RecoverPswdScreen')}
              >
                <Text style={{}}>Esqueci minha senha</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{}}
                onPress={() => {
                  navigation.navigate('HomeScreen')}}
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
