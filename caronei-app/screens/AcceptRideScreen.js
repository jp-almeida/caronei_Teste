import {
    Text,
    View,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard
} from "react-native"
import React, { useState } from "react"
import tw from "twrnc"
import { Image } from "react-native"
import { Icon } from "react-native-elements"
import { useNavigation } from "@react-navigation/native"
import { DefaultButton } from '../components/Button'
import { getPublicData } from "../requestsFunctions"
import { cancelar_corrida, em_corrida_motorista, em_corrida_passageiro, MOTORISTA, PASSAGEIRO } from "../slices/rideState"
import { store } from "../store"
import { useDispatch } from "react-redux"
import { getNome } from "../paradas/paradasFunctions"

const AcceptRideScreen = ({ route }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()

    const { corrida } = route.params
    let rota = eval(corrida.rota) //transforma a string da rota em array
    const partida = getNome(rota[0]) //pega o nome do primeiro ponto da roda
    const destino = getNome(rota.slice(-1)) //pega o nome do último ponto da rota

    const matricula = corrida.matriculaPassageiro

    const [usuario, setUsuario] = useState({})
    const [carregou, setCarregou] = useState(false)

    async function getData() { //carrega os dados do passeiro de acordo com a matricula encontrada
        let resp = await getPublicData(matricula)
        setUsuario(resp)
    }

    if (!carregou) {
        setCarregou(true)
        getData()
    }

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{ backgroundColor: '#EFE9E5', flex: 1 }}>
                    <Image //por o mapa
                        style={{
                            width: '100%',
                            height: undefined,
                            aspectRatio: 1,
                        }}
                        source={require("../images/mapapici.png")}
                    />
                    <View style={{
                        backgroundColor: 'rgba(144, 144, 144, 0.1)',
                        //'rgba(144,144, 144, 0.1)'
                        justifyContent: "center",
                        alignItems: "center",
                        margin: 10,
                        borderWidth: 1.5,
                        borderStyle: 'solid',
                        borderColor: '#949494',
                        borderRadius: 10,

                    }}
                    >
                        <Text style={{ color: "#4D4C7D", fontSize: 20, marginTop: 10 }}>Usuário deu match com sua carona</Text>

                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                        }}>
                            <View>
                                <Icon name="account-circle" type="material" size={70} />
                            </View>
                            <View>
                                <Text>{usuario.name}</Text>
                                <Text><Icon name="room" type="material" size={15} />{partida} -- {destino}</Text>
                                <View style={{
                                    flexDirection: 'row',
                                    padding: 10,

                                }}>
                                    <View style={{ backgroundColor: '#4D4C7D', borderRadius: 25, }}>
                                        <Text style={{ color: 'white' }} > <Icon name="stars" type="material" size={15} />  {usuario.avaliacao ? usuario.avaliacao : "(Usuário não avaliado)"}  </Text>
                                    </View>

                                </View>

                            </View>
                        </View>


                    </View>

                    <View style={{
                        padding: 25,
                        marginTop: 100,
                        flexDirection: 'row',
                        justifyContent: 'space-around',

                    }}>
                        <DefaultButton title="Aceitar" onPress={() => {
                            navigation.navigate('MatchRideScreen')
                            if (store.getState().ride.role == PASSAGEIRO) {
                                dispatch((em_corrida_passageiro))
                            }
                            else if (store.getState().ride.role == MOTORISTA) {
                                dispatch((em_corrida_motorista))
                            }
                        }} />
                        <DefaultButton title="Recusar" onPress={() => {
                            navigation.navigate('SearchRideScreen')
                        }} />
                    </View>
                    <View style={{
                        padding: 25,

                        flexDirection: 'row',
                        justifyContent: 'space-around',
                    }}>
                        <DefaultButton title="Cancelar viagem" onPress={() => {
                            dispatch(cancelar_corrida())
                            navigation.navigate("HomeScreen")
                        }} />
                    </View>
                </View>

            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

export default AcceptRideScreen

