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
import { carregar_motorista, carregar_passageiro, em_corrida_motorista, em_corrida_passageiro} from "../slices/rideState"

const InitialScreen = () => {
    const dispatch = useDispatch()

    const navigation = useNavigation()

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
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                style={{
                                    width: 255,
                                    height: 320,
                                    resizeMode: "contain",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }}
                                source={require("../images/logo.png")}
                            />

                        </View>


                        <Text style={{ textAlign: 'center', color: '#4D4C7D' }}>Olá, seja bem vindo</Text>

                        <View>
                            <View style={{ marginBottom: 30 }}>
                                <DefaultButton title="Criar uma conta" onPress={() => navigation.navigate('SignUpScreen')} />
                            </View>

                            <Text style={{textAlign: 'center', color: '#4D4C7D' }}>Já tem conta?</Text>

                            <View style={{}}>
                                <DefaultButton title="Entrar" onPress={() => navigation.navigate('LogInScreen')} />
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 100 }}>
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
                                /></View>
  
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default InitialScreen

