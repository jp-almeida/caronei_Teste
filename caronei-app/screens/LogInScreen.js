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

import { useDispatch } from "react-redux"
import { loginAuth } from "../slices/userAuth"
import { useNavigation } from "@react-navigation/native"

//codigo adaptado de https://webdesignemfoco.com/cursos/react-js/integracoes-com-react-native-3-frontend

const LogInScreen = () => {
    const dispatch = useDispatch()

    const navigation = useNavigation()

    const [matricula, setMatricula] = useState(null)
    const [password, setPassword] = useState(null)
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

        if(response.token){ //muda o estado para logado caso tenha recebido o token
            dispatch(loginAuth(response.token))

            navigation.navigate("HomeScreen")
        }

        
    }

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={tw`p-10 pt-50`}>

                    <View style={{}}>
                    <Text style={{}}>ENTRE NA SUA CONTA</Text>
                        {message && (
                            <Text>{message}</Text>)}
                        
                        <TextInput
                            style={{}}
                            placeholder="Matricula"
                            onChangeText={(text) => setMatricula(text)}
                        />

                        <TextInput
                            style={{}}
                            placeholder="Senha"
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TouchableOpacity style={{}} onPress={login}>
                            <Text style={{}}>Login</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{}}
                            onPress={() => navigation.navigate("RecoverPswdScreen")}
                        >
                            <Text style={{}}>Esqueci minha senha</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{}}
                            onPress={() => navigation.navigate("HomeScreen")}
                        >
                            <Text style={{}}>Pular login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default LogInScreen

