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

const RecoverPswdScreen = () => {
    const dispatch = useDispatch()

    const navigation = useNavigation()

    const [email, setEmail] = useState(null)
    
    
    async function recoverPswd() {
        
        //gambiarra porque as portas não estavam batendo
        let original_port = config.urlRootNode.split(":")[2]
        let url = config.urlRootNode.replace(original_port, config.backend_port)
        //console.log(url)
        let reqs = await fetch(url + '/recoverpswd', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userEmail: email,
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
                    <Text style={{}}>Entre seu email</Text>
                        <TextInput
                            style={{}}
                            placeholder="Email"
                            onChangeText={(text) => setEmail(text)}
                        />

                        <TouchableOpacity
                            style={{}}
                            onPress={() => navigation.navigate("PswdRecoveredScreen")}
                        >
                            <Text style={{}}>Continuar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{}}
                            onPress={() => navigation.navigate("LogInScreen")}
                        >
                            <Text style={{}}>Voltar</Text>
                        </TouchableOpacity>
                    </View>
               
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}


export default RecoverPswdScreen

