import { Text, View, TouchableOpacity, TouchableWithoutFeedback, TextInput } from "react-native"
import React, { useState } from "react"
import { Dialog, Icon } from "react-native-elements"
import EditButton from "./buttons/EditButton"
import VisibilityButton from "./buttons/VisibilityButton"
import { styles } from "../styles"

const ProfileData = (props) => {
    let currentData = props.element.data 
    return (
        <View>
            <Text style= {{color: '#46458D'}}>{props.title}:</Text> 
            <VisibilityButton element={props.element} changeFunction={props.changeFunction} editFunction={props.editFunction} />
            <Text style= {{color: '#46458D'}}>{props.element.data}</Text>
            <EditButton element={props.element} editFunction = {props.editFunction} changeFunction = {props.changeFunc} />
            
            <Dialog visible={props.element.isEditing} style={styles.dialog}>
                <Dialog.Title title={"Editar "+props.title} titleStyle={styles.dialogTitle}/>
                <TextInput
                    style={{}}
                    defaultValue= {props.element.data}
                    onChangeText={(text) => {
                        currentData = text
                    }
                }/>
                <Dialog.Button title="Salvar" onPress={() => {
                    props.editFunction({
                        ...props.element,
                        data: currentData,
                        changed: true,
                        isEditing: false
                        })
                    props.changeFunction(true)
                }}/>
                <Dialog.Button title="Cancelar" onPress={() => {
                    props.editFunction({
                        ...props.element,
                        isEditing: false
                        })
                    props.changeFunction(true)
                    currentData = props.element.data
                }}/>

            </Dialog>
            
        </View>


    )
}

export default ProfileData