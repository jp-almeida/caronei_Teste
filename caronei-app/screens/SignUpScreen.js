import { Text, View, TouchableWithoutFeedback, TouchableOpacity, TextInput, SafeAreaView } from "react-native"
import React, { useState } from "react"
import tw from "twrnc"
import config from '../config/config.json'
// import port from "../Controller.js"


//codigo adaptado de https://webdesignemfoco.com/cursos/react-js/integracoes-com-react-native-3-frontend


const SignUpScreen = () => {

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [matricula, setMatricula] = useState(null)
    const [message, setMessage] = useState(null) //mensagem de resposta do back-end (se o cadastro foi realizado com sucesso ou nao) ou de preenchimento do formulario
    const [passwordMessage, setPasswordMessage] = useState(null)
    
    function checkPassword(text){ //verific se os dois campos de senha são igauis
        if(text != password){
            setPasswordMessage("As senhas não são iguais")
            console.log(passwordMessage)
        }
        else{
            setPasswordMessage(null)
        }
    }

    async function registerUser() {

        if (passwordMessage){ //caso algo tenha dado errado no preenchimento do formulario de cadastro
            setMessage("Verifique os campos")
            return
        }

        //gambiarra porque as portas não estavam batendo
        let original_port = config.urlRootNode.split(":")[2]
        let url = config.urlRootNode.replace(original_port, config.backend_port)
        // console.log(original_port, url)

        let reqs = await fetch(url + '/create', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userName: name,
                userEmail: email,
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
                        {message && (
                            <Text>{message}</Text>)}


                        <TextInput
                            style={{}}
                            placeholder="Nome completo"
                            onChangeText={(text) => setName(text)}
                        />
                        {/* podemos verificar se o email é válido usando aquelas formatações */}
                        <TextInput
                            style={{}}
                            placeholder="Email"
                            onChangeText={(text) => setEmail(text)}
                        />

                        <TextInput
                            style={{}}
                            placeholder="Matricula"
                            onChangeText={(text) => setMatricula(text)}
                        />

                        <TextInput
                            style={{}}
                            placeholder="Digite a senha"
                            secureTextEntry={true}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TextInput
                            style={{}}
                            placeholder="Confirmar senha"
                            secureTextEntry={true}
                            onChangeText={(text) => checkPassword(text)}
                        />
                        {passwordMessage && (
                            <Text>{passwordMessage}</Text>)}


                        <TouchableOpacity style={{}} onPress={registerUser}>
                            <Text style={{}}>Enviar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{}} onPress={() => console.log("IR PARA A HOME SCREEN")}>
                            <Text style={{}}>Pular cadastro</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default SignUpScreen