import {
    Text,
    View,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard
} from "react-native"
import React, { useState } from "react"
import tw from "twrnc"
import Map from "../components/Map"
import { Image } from "react-native"
import { Icon } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { DefaultButton } from '../components/Button'
import { store } from "../store"
import { MOTORISTA, PASSAGEIRO } from "../slices/rideState"
import { searchPassageiro } from "../requestsFunctions"
import { useDispatch } from "react-redux"

const SearchRideScreen = ({ route }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [name, setName] = useState(null)
    const [partida, setPartida] = useState(null)
    const [destino, setDestino] = useState(null)
    const [match, setMatch] = useState(null)
    var avaliacao = 5
    let procurando = false
    
    
    async function procurarPassageiro() {
        const { rota } = route.params
        const response = await searchPassageiro(rota)
        
        if (await response.response) {
            setMatch(await response.pedidos)
            navigation.navigate("AcceptRideScreen", {corrida: await response.pedidos})
        }
        else {
            procurando = false
            console.log("Não achou")
        }
    }



    if (store.getState().ride.role == MOTORISTA && !procurando){
        procurando = true
        procurarPassageiro()
    }


        return (
            <SafeAreaView style={tw`bg-white h-full`}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={{ backgroundColor: '#EFE9E5', flex: 1 }}>
                        <View style={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1,
                        }}>
                            <Map />
                        </View>
                        <View style={{
                            //'rgba(144,144, 144, 0.1)'
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 10,
                        }}
                            source={require("../images/mapapici.png")}
                        />
                        <View style={{
                            //'rgba(144,144, 144, 0.1)'
                            justifyContent: "center",
                            alignItems: "center",
                            margin: 10,
                        }}
                        >
                            <Text ></Text>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                            }}>
                                <View>
                                    <Icon name="account-circle" type="material" size={100} />
                                </View>
                                <View>
                                    <View style={{
                                        backgroundColor: '#4D4C7D',
                                        borderRadius: 25
                                    }}>
                                        {store.getState().ride.role == MOTORISTA ?
                                            <Text style={{ color: 'white' }}>    Procurando passageiro... </Text>
                                            :
                                            <Text style={{ color: 'white' }}>    Procurando motorista... </Text>
                                        }


                                    </View>

                                    <View style={{
                                        flexDirection: 'row',
                                        padding: 10,

                                    }}>
                                        <View style={{ backgroundColor: '#4D4C7D', borderRadius: 25 }}>
                                            <Text style={{ color: 'white' }}> <Icon name="alarm" type="material" size={15} />   ?   </Text>
                                        </View>
                                        <View>
                                            <Text>  </Text>
                                        </View>
                                        <View style={{ backgroundColor: '#4D4C7D', borderRadius: 25, }}>
                                            <Text style={{ color: 'white' }}> <Icon name="stars" type="material" size={15} />   ?   </Text>
                                        </View>

                                    </View>

                                </View>
                            </View>


                        </View>

                        <View style={{
                            marginTop: 100,
                            padding: 5,

                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}>
                            <DefaultButton
                                title="Atualizar Busca"
                                onPress={() => navigation.navigate('HomeScreen')} />
                        </View>
                        <View style={{
                            padding: 5,

                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}>
                            <DefaultButton
                                title="Cancelar viagem"
                                onPress={() => {
                                    dispatch(cancelar_corrida())
                                    navigation.navigate('HomeScreen')
                                }} />
                        </View>
                    </View>

                </TouchableWithoutFeedback>
            </SafeAreaView>
        )
}

export default SearchRideScreen

