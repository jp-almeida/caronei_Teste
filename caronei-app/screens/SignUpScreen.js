import { Text, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, SafeAreaView } from "react-native"
import React, { useState } from "react"
import tw from "twrnc"
import config from '../config/config.json'
// import port from "../Controller.js"


//codigo adaptado de https://webdesignemfoco.com/cursos/react-js/integracoes-com-react-native-3-frontend


const SignUpScreen = () => {
    
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)

    async function registerUser(){
        //gambiarra porque as portas não estavam batendo
        original_port = config.urlRootNode.split(":")[2]
        url = config.urlRootNode.replace(original_port, config.backend_port)
        // console.log(original_port, url)
        
        let reqs = await fetch(url +'/create',{
            method: 'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                emailUser: email,
                passwordUser: password,
            })
        });
    }

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

                        <TouchableOpacity style={{}} onPress={registerUser}>
                            <Text style={{}}>Enviar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default SignUpScreen