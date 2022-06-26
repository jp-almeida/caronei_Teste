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
import { useNavigation } from "@react-navigation/native"
// import port from "../Controller.js"

//codigo adaptado de https://webdesignemfoco.com/cursos/react-js/integracoes-com-react-native-3-frontend

const SignUpScreen = () => {
  const navigation = useNavigation()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [message, setMessage] = useState(null) //mensagem de resposta do back-end (se o cadastro foi realizado com sucesso ou nao)

  async function registerUser() {
    //gambiarra porque as portas não estavam batendo
    original_port = config.urlRootNode.split(":")[2]
    url = config.urlRootNode.replace(original_port, config.backend_port)
    // console.log(original_port, url)

    let reqs = await fetch(url + "/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        emailUser: email,
        passwordUser: password,
      }),
    })
    let resp = await reqs.json()
    setMessage(resp)
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={tw`p-10 pt-50`}>
          <View style={{}}>
            {message && <Text>{message}</Text>}
            <TextInput
              style={{}}
              placeholder="Digite seu email"
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              style={{}}
              placeholder="Digite a senha:"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />

            <TouchableOpacity style={{}} onPress={registerUser}>
              <Text style={{}}>Enviar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{}}
              onPress={() => navigation.navigate("HomeScreen")}
            >
              <Text style={{}}>Pular cadastro</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default SignUpScreen
