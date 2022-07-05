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
import {Icon} from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { DefaultButton } from '../components/Button'
import { store } from "../store"
import { MOTORISTA } from "../slices/rideState"
import { searchPassageiro } from "../requestsFunctions"

const SearchRideScreen = ({route}) => {

    const navigation = useNavigation()
    const {rota} = route.params
    const [name,setName] = useState(null)
    const [partida,setPartida] = useState(null)
    const [destino,setDestino] = useState(null)
    const [corrida,setCorrida] = useState(null)    
    var avaliacao = 5

    async function procurarPassageiro() {
        const response = await searchPassageiro(store.getState().auth.matricula, rota)
        if (response.response) {
            setCorrida(response.pedidos)
        }
        else {
            console.log("Não achou")
        }
    }

    if (store.getState().ride.role == MOTORISTA) {
        procurarPassageiro()
    }

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#EFE9E5', flex: 1 }}>
                <View style={{
                                width: '100%',
                                height: undefined,
                                aspectRatio :1,
                            }}>
                    <Map />
                </View>
                    {/* <Image //por o mapa
                            style={{
                                width: '100%',
                                height: undefined,
                                aspectRatio :1,
                            }}
                            source={require("../images/mapapici.png")}
                        /> */}
                        <View style ={{
                            
                            //'rgba(144,144, 144, 0.1)'
                            justifyContent:"center",
                            alignItems:"center",
                            margin:10,
                            
                            
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
                                    <View style ={{
                                        backgroundColor:'#4D4C7D',
                                        borderRadius:25
                                    }}>
                                        
                                        <Text style={{color:'white'}}>       Procurando motorista... </Text>
                                    </View>
                                    
                                    <View style = {{
                                        flexDirection: 'row',
                                        padding:10,

                                        }}>
                                        <View style ={{backgroundColor:'#4D4C7D',borderRadius:25}}>
                                            <Text style={{color:'white'}}> <Icon name="alarm" type="material" size={15}/> Tempo para chegada </Text>
                                        </View>
                                        <View>
                                            <Text>  </Text>
                                        </View>
                                        <View style ={{backgroundColor:'#4D4C7D',borderRadius:25,}}>
                                            <Text style={{color:'white'}}> <Icon name="stars" type="material" size={15}/>  {avaliacao}  </Text>
                                        </View>
                                        
                                    </View>    
                                        
                                </View>
                            </View>


                        </View>
        
                        <View style={{
                             marginTop:100,  
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
                            onPress={() => navigation.navigate('HomeScreen')} />
                        </View>
                   </View>
               
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default SearchRideScreen

