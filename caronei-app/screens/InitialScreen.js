import {
    Text,
    View,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    Keyboard
} from "react-native"
import React, { useState } from "react"
import tw from "twrnc"
import config from "../config/config.json"
import { Image } from "react-native"

import { useDispatch } from "react-redux"
import { loginAuth } from "../slices/userAuth"
import { useNavigation } from "@react-navigation/native"
import { DefaultButton } from '../components/Button'

//codigo adaptado de https://webdesignemfoco.com/cursos/react-js/integracoes-com-react-native-3-frontend

const InitialScreen = () => {
    const dispatch = useDispatch()

    const navigation = useNavigation()

    const [message, setMessage] = useState(null) //mensagem de resposta do back-end (se o cadastro foi realizado com sucesso ou nao) ou de preenchimento do formulario

    async function login() {

        //gambiarra porque as portas não estavam batendo
        let original_port = config.urlRootNode.split(":")[2]
        let url = config.urlRootNode.replace(original_port, config.backend_port)
        //console.log(url)
        let reqs = await fetch(url + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userMatricula: matricula,
                userPassword: password,
            })
        });

        let response = await reqs.json();
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
                        <Image
                            style={{
                                width: 150,
                                height: 200,
                                resizeMode: "contain",
                            }}
                            source={require("../images/logo.png")}
                        />

                        <Text style={{textAlign: 'center', color: '#4D4C7D'}}>Olá, seja bem vindo</Text>

                        <View>
                            <View style={{ marginBottom: 15 }}>
                                <DefaultButton title="Criar uma conta" onPress={() => navigation.navigate('SignUpScreen')} />
                            </View>
    
                            <Text style={{color: '#4D4C7D'}}>Já tem conta?</Text>

                            <View style={{}}>
                                <DefaultButton title="Entrar" onPress={() => navigation.navigate('LogInScreen')} />
                            </View>
                            

                           
                            <Image
                                style={{
                                    width: 150,
                                    height: 200,
                                    resizeMode: "contain",
                                }}
                                source={require("../images/ufc_logo.png")}
                            />
                            <Image
                                style={{
                                    width: 150,
                                    height: 200,
                                    resizeMode: "contain",
                                }}
                                source={require("../images/cc_logo.png")}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default InitialScreen

