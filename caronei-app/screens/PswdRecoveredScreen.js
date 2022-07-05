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
import { useNavigation } from '@react-navigation/native'
import { DefaultButton } from '../components/Button'

//codigo adaptado de https://webdesignemfoco.com/cursos/react-js/integracoes-com-react-native-3-frontend

const PswdRecoveredScreen = () => {
  const dispatch = useDispatch()

  const navigation = useNavigation()

  const [password, setPassword] = useState(null)
  const [message, setMessage] = useState(null) //mensagem de resposta do back-end (se o cadastro foi realizado com sucesso ou nao) ou de preenchimento do formulario

  async function pswdRecovered() {
    //gambiarra porque as portas não estavam batendo
    let original_port = config.urlRootNode.split(':')[2]
    let url = config.urlRootNode.replace(original_port, config.backend_port)
    //console.log(url)
    let reqs = await fetch(url + '/pswdrecovered', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userPassword: password
      })
    })

    let response = await reqs.json()
    setMessage(response.message)
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
                  maxWidth: 300,
                  flexDirection: 'row',
                  color: '#46458D'
                }}
              >
                Recupere sua conta
              </Text>
              {message && <Text>{message}</Text>}
            </View>

            <View style={{ marginBottom: 0 }}>
              <Text style={{ fontSize: 18, marginBottom: 5, color: '#46458D' }}>
                Código recebido pelo email
              </Text>

              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: '#46458D',
                  padding: 5,
                  backgroundColor: '#e6e6e6',
                  borderRadius: 5
                }}
                placeholder="Código recebido pelo email"
                secureTextEntry={true}
              />
            </View>

            <View style={{ marginBottom: 30 }}>
              <Text style={{ fontSize: 18, marginBottom: 5, color: '#46458D' }}>
                Nova senha
              </Text>
              <TextInput
                style={{
                  borderWidth: 2,
                  borderColor: '#46458D',
                  padding: 5,
                  backgroundColor: '#e6e6e6',
                  borderRadius: 5
                }}
                placeholder="Nova senha"
                secureTextEntry={true}
                onChangeText={text => setPassword(text)}
              />
            </View>

            <View style={{ marginBottom: 30 }}>
              <DefaultButton
                title="Confirmar e voltar para Login"
                onPress={() => navigation.navigate('LogInScreen')}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default PswdRecoveredScreen
