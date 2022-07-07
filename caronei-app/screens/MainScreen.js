import {
    Text,
    View,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard
} from "react-native"
import React from "react"
import tw from "twrnc"
import { Image } from "react-native"

import { useNavigation } from "@react-navigation/native"
import { DefaultButton } from '../components/Button'
import { useDispatch } from "react-redux"
import { em_corrida_passageiro } from "../slices/rideState"


const MainScreen = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                
                <View style={{ backgroundColor: '#EFE9E5', flex: 1 }}>
                    <View><Image //por o mapa
                            style={{
                                width: 509,
                                height: 473,
                                resizeMode: "cover",
                            }}
                            source={require("../images/mapapici.png")}
                        /></View>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            padding: 45
                        }}
                    >
                

                        <View>
                            <View style={{ marginBottom: 15 }}>
                                <DefaultButton title="Solicitar carona" onPress={() => {
                                    dispatch(em_corrida_passageiro())
                                }} />
                            </View>
    
                            <View style={{}}>
                                <DefaultButton title="Oferecer carona" onPress={() => {
                                    dispatch(em_corrida_motorista())
                                }} />
                            </View>
                             
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default MainScreen