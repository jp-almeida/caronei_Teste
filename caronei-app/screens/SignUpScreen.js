import {
  Text,
  View,
  TouchableWithoutFeedback,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native"
import React, { useState } from "react"
import tw from "twrnc"
import config from "../config/config.json"
import { useNavigation } from "@react-navigation/native"
import { DefaultButton } from "../components/Button"

//codigo adaptado de https://webdesignemfoco.com/cursos/react-js/integracoes-com-react-native-3-frontend

const SignUpScreen = () => {
  const navigation = useNavigation()

  const [name, setName] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [matricula, setMatricula] = useState(null)
  const [message, setMessage] = useState(null) //mensagem de resposta do back-end (se o cadastro foi realizado com sucesso ou nao) ou de preenchimento do formulario
  const [passwordMessage, setPasswordMessage] = useState(null)
  const [emailMessage, setEmailMessage] = useState(null)
  const [matriculaMessage, setMatriculaMessage] = useState(null)

  function checkEmail(text) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/
    //verifica se o email passado está de acordo com o regex acima
    if (reg.test(text) == true) {
      setEmail(text)
      setEmailMessage(null)
    } else {
      setEmailMessage("O e-mail está no formato incorreto")
    }
  }

  function checkMatricula(text) {
    if (text.length == 6) {
      setMatricula(text)
      setMatriculaMessage(null)
    } else {
      setMatriculaMessage("A matrícula precisa ter 6 caracteres")
    }
  }

  function checkPassword(text) {
    //verifica se os dois campos de senha são iguais
    if (text != password) {
      setPasswordMessage("As senhas não são iguais")
    } else {
      setPasswordMessage(null)
    }
  }

  async function registerUser() {
    if (passwordMessage) {
      //caso algo tenha dado errado no preenchimento do formulario de cadastro
      setMessage("Verifique os campos")
      return
    }

    //gambiarra porque as portas não estavam batendo
    let original_port = config.urlRootNode.split(":")[2]
    let url = config.urlRootNode.replace(original_port, config.backend_port)

    let reqs = await fetch(url + "/create", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: name,
        userEmail: email,
        userMatricula: matricula,
        userPassword: password,
      }),
    })
    let resp = await reqs.json()
    setMessage(resp)
  }

  return (
    <SafeAreaView style={tw`bg-[#EFE9E5]`}>
      <ScrollView>
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={0}>
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <View
              style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 45,
              }}
            >
              <View style={{}}>
                <Text
                  style={{
                    fontSize: 38,
                    marginBottom: 15,
                    maxWidth: 200,
                    flexDirection: "row",
                    color: "#46458D",
                  }}
                >
                  Crie sua conta
                </Text>
                {message && <Text>{message}</Text>}
              </View>

              <View>
                <View style={{ marginBottom: 30 }}>
                  <Text
                    style={{
                      fontSize: 18,
                      marginBottom: 5,
                      color: "#46458D",
                    }}
                  >
                    Nome Completo
                  </Text>
                  <TextInput
                    style={{
                      borderWidth: 2,
                      borderColor: "#46458D",
                      padding: 5,
                      backgroundColor: "#e6e6e6",
                      borderRadius: 5,
                    }}
                    placeholder="Nome completo"
                    onChangeText={(text) => setName(text)}
                  />
                  {/* podemos verificar se o email é válido usando aquelas formatações */}
                  <View style={{ marginTop: 15 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        marginBottom: 5,
                        color: "#46458D",
                      }}
                    >
                      E-mail
                    </Text>
                    <TextInput
                      style={{
                        borderWidth: 2,
                        borderColor: "#46458D",
                        padding: 5,
                        backgroundColor: "#e6e6e6",
                        borderRadius: 5,
                      }}
                      placeholder="E-mail"
                      onChangeText={(text) => checkEmail(text)}
                    />
                    {emailMessage && (
                      <Text style={{ color: "#ED5C5C" }}>{emailMessage}</Text>
                    )}
                  </View>

                  <View style={{ marginTop: 15 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        marginBottom: 5,
                        color: "#46458D",
                      }}
                    >
                      Matrícula
                    </Text>

                    <TextInput
                      style={{
                        borderWidth: 2,
                        borderColor: "#46458D",
                        padding: 5,
                        backgroundColor: "#e6e6e6",
                        borderRadius: 5,
                      }}
                      placeholder="Matrícula"
                      onChangeText={(text) => checkMatricula(text)}
                    />
                    {matriculaMessage && (
                      <Text style={{ color: "#ED5C5C" }}>
                        {matriculaMessage}
                      </Text>
                    )}
                  </View>

                  <View style={{ marginTop: 15 }}>
                    <Text
                      style={{
                        fontSize: 18,
                        marginBottom: 5,
                        color: "#46458D",
                      }}
                    >
                      Senha
                    </Text>

                    <TextInput
                      style={{
                        borderWidth: 2,
                        borderColor: "#46458D",
                        padding: 5,
                        backgroundColor: "#e6e6e6",
                        borderRadius: 5,
                      }}
                      placeholder="Digite a senha"
                      secureTextEntry={true}
                      onChangeText={(text) => setPassword(text)}
                    />
                  </View>

                  <View style={{ marginTop: 15 }}>
                    <Text style={{ fontSize: 18, color: "#46458D" }}>
                      Confirmar senha
                    </Text>

                    <TextInput
                      style={{
                        borderWidth: 2,
                        borderColor: "#46458D",
                        padding: 5,
                        backgroundColor: "#e6e6e6",
                        marginTop: 5,
                        borderRadius: 5,
                      }}
                      placeholder="Confirmar senha"
                      secureTextEntry={false}
                      onChangeText={(text) => checkPassword(text)}
                    />
                    {passwordMessage && (
                      <Text style={{ color: "#ED5C5C" }}>
                        {passwordMessage}
                      </Text>
                    )}
                  </View>
                </View>
              </View>

              <View>
                <View style={{ marginBottom: 15 }}>
                  <DefaultButton title="Enviar" onPress={registerUser} />
                </View>

                <View style={{}}>
                  <DefaultButton
                    title="Já tenho uma conta"
                    onPress={() => navigation.navigate("LogInScreen")}
                  />
                </View>

                <TouchableOpacity
                  style={{}}
                  onPress={() => navigation.navigate("HomeScreen")}
                >
                  <Text style={{}}>Pular cadastro</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUpScreen
