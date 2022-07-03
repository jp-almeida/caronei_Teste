import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native'
import { Dialog, Icon } from "react-native-elements"
import React from 'react'
import EditButton from './EditButton'
import { store } from '../store'
import config from '../config/config.json'



const CarProfileLine = (props) => {
    

    async function updateCar(cor, placa, modelo) {
        //gambiarra porque as portas não estavam batendo
        let original_port = config.urlRootNode.split(":")[2]
        let url = config.urlRootNode.replace(original_port, config.backend_port)
    
        let reqs = await fetch(url + "/alterar-carro/", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                matricula: store.getState().auth.matricula,
                cor: cor,
                placa: placa,
                modelo: modelo
            }),
        })
        let resp = await reqs.json()
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
    }

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
                        updateCar(cor,placa,modelo)
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