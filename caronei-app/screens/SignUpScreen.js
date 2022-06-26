import { Text, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, SafeAreaView } from "react-native"
import React, { useState } from "react"
import tw from "twrnc"
import config from '../config/config.json'


//codigo adaptado de https://webdesignemfoco.com/cursos/react-js/integracoes-com-react-native-3-frontend

async function registerUser(){
    let reqs = await fetch(config.urlRootNode+'create',{
        method: 'POST',
        headers:{
            'Accept':'application/json',
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            nameUser: user,
            passwordUser: password,
            emailUser: email
        })
    });
}


const SignUpScreen = () => {
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View  style={tw`p-10 pt-50`}>

                    <View style={{}}>

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

                        <TouchableOpacity style={{}} onPress={console.log("Registrando usuário")}>
                            <Text style={{}}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default SignUpScreen