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
                <View style={tw`p-10 pt-50`}>
                    <Image
                        style={{
                            width: 150,
                            height: 200,
                            resizeMode: "contain",
                        }}
                        source={require("../images/logo.png")}
                        />
                    
                    <Text style={{}}>Olá, seja bem vindo</Text>

                    <View style={{}}>
                        <TouchableOpacity
                            style={{}}
                            onPress={() => navigation.navigate("SignUpScreen")}
                        >
                            <Text style={{}}>Criar uma conta</Text>
                        </TouchableOpacity>

                        <Text style={{}}>Já tem uma conta?</Text>
                        
                        <TouchableOpacity
                            style={{}}
                            onPress={() => navigation.navigate("LogInScreen")}
                        >
                            <Text style={{}}>Entrar</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default InitialScreen

