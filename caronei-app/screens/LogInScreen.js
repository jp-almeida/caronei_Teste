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

//codigo adaptado de https://webdesignemfoco.com/cursos/react-js/integracoes-com-react-native-3-frontend

const LogInScreen = () => {
    const navigation = useNavigation()

    const [matricula, setMatricula] = useState(null)
    const [password, setPassword] = useState(null)
    const [message, setMessage] = useState(null) //mensagem de resposta do back-end (se o cadastro foi realizado com sucesso ou nao) ou de preenchimento do formulario
    
    async function login() {

        //gambiarra porque as portas não estavam batendo
        let original_port = config.urlRootNode.split(":")[2]
        let url = config.urlRootNode.replace(original_port, config.backend_port)

        let reqs = await fetch(url + '/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userMatricula: matricula,
                passwordUser: password,
            })
        });
        let resp = await reqs.json();
        setMessage(resp);
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
