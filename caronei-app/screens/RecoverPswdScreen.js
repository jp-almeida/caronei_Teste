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

const RecoverPswdScreen = () => {
  const dispatch = useDispatch()

  const navigation = useNavigation()

  const [email, setEmail] = useState(null)

  async function recoverPswd() {
    //gambiarra porque as portas não estavam batendo
    let original_port = config.urlRootNode.split(':')[2]
    let url = config.urlRootNode.replace(original_port, config.backend_port)
    //console.log(url)
    let reqs = await fetch(url + '/recoverpswd', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userEmail: email
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
                  marginTop: 20,
                  fontSize: 38,
                  marginBottom: 30,
                  maxWidth: 300,
                  color: '#46458D'
                }}
              >
                Recupere sua conta
              </Text>
            </View>

            <View>
              <View style={{ marginBottom: 30 }}>
                <Text
                  style={{ fontSize: 18, marginBottom: 5, color: '#46458D' }}
                >
                  Insira seu email
                </Text>
                <TextInput
                  style={{
                    borderWidth: 2,
                    borderColor: '#46458D',
                    padding: 5,
                    backgroundColor: '#e6e6e6',
                    borderRadius: 5
                  }}
                  placeholder="Email"
                  onChangeText={text => setEmail(text)}
                />
              </View>

              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 15,
                  marginBottom: 15,
                  color: '#46458D'
                }}
              >
                Após apertar Continuar, um código será enviado para seu e-mail
                para que você possa redefinir sua senha{' '}
              </Text>
            </View>

            <View style={{ marginBottom: 10 }}>
              <DefaultButton
                title="Continuar"
                onPress={() => navigation.navigate('PswdRecoveredScreen')}
              />
            </View>

            <View style={{ marginBottom: 70 }}>
              <DefaultButton
                title="Voltar"
                onPress={() => navigation.navigate('LogInScreen')}
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default RecoverPswdScreen
