import {
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    
} from "react-native"
import React, { useState } from "react"
import tw from "twrnc"
import config from "../config/config.json"


import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"

//codigo adaptado de https://webdesignemfoco.com/cursos/react-js/integracoes-com-react-native-3-frontend

const PswdRecoveredScreen = () => {
  const dispatch = useDispatch()

  const navigation = useNavigation()

  const [password, setPassword] = useState(null)
  const [message, setMessage] = useState(null) //mensagem de resposta do back-end (se o cadastro foi realizado com sucesso ou nao) ou de preenchimento do formulario
  
  async function pswdRecovered() {
      
      //gambiarra porque as portas não estavam batendo
      let original_port = config.urlRootNode.split(":")[2]
      let url = config.urlRootNode.replace(original_port, config.backend_port)
      //console.log(url)
      let reqs = await fetch(url + '/pswdrecovered', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              userPassword: password,
          })
      });
      
      let response = await reqs.json();
      setMessage(response.message)

    }

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View style={tw`p-10 pt-50`}>

              <View style={{}}>
              <Text style={{}}>RECUPERE SUA CONTA</Text>
                  {message && (
                      <Text>{message}</Text>)}
                  
                  <Text style={{}}>Senha recebida pelo email</Text>

                  <TextInput
                      style={{}}
                      placeholder="Senha provisória"
                      secureTextEntry={true}
                  />

                  <Text style={{}}>Nova senha</Text>
                  <TextInput
                      style={{}}
                      placeholder="Nova senha"
                      secureTextEntry={true}
                      onChangeText={(text) => setPassword(text)}
                  />

                  <TouchableOpacity
                      style={{}}
                      onPress={() => navigation.navigate("LogInScreen")}
                  >
                      <Text style={{}}>Confirmar e voltar para tela inicial</Text>
                  </TouchableOpacity>

        
              </View>
              </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}


export default PswdRecoveredScreen

