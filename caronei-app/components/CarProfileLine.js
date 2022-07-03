import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { Dialog, Icon } from "react-native-elements"
import React from 'react'
import EditButton from './buttons/EditButton'
import { store } from '../store'
import config from '../config/config.json'
import { updateCar } from '../requestsFunctions'



const CarProfileLine = (props) => {

    let placa = props.carro.placa
    let modelo = props.carro.placa
    let cor = props.carro.cor

    return (
        <View>
            <Text>{props.carro.placa} {props.carro.modelo} {props.carro.cor}</Text>
        
            <EditButton element = {props.carro} editFunction = {props.editFunction}/>
            <Dialog 
                visible={props.carro.isEditing}
                onTouchOutside={props.editFunction}
            >
                <Dialog.Title title="Editar"/>
                    <Text>Placa</Text>
                    <TextInput
                        style={{}}
                        defaultValue={props.carro.placa}
                        onChangeText={(text) => {placa = text}}
                    />
                    <Text>Modelo</Text>
                    <TextInput
                        style={{}}
                        defaultValue={props.carro.modelo}
                        onChangeText={(text) => {modelo = text}}
                    />
                    <Text>Cor</Text>
                    <TextInput
                        style={{}}
                        defaultValue={props.carro.cor}
                        onChangeText={(text) => {cor = text}}
                    />
                    <Dialog.Button title="Adicionar" onPress = {() => {
                        let resp = updateCar(cor,placa,modelo)
                        if(resp){
                            props.editFunction({
                                ...props.carro,
                                placa: placa,
                                modelo: modelo,
                                cor: cor,
                                isEditing: false,
                                changed: true
                            })
                        }
                        
                    }}/>
                    <Dialog.Button title="Cancelar" onPress = {() => 
                        props.editFunction({
                            ...props.carro,
                            isEditing: false
                        })}/>
                </Dialog>
        </View>
    )
}

export default CarProfileLine