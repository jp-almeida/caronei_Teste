import { Text, View, TouchableOpacity, TouchableWithoutFeedback, TextInput } from "react-native"
import React, { useState } from "react"
import { Icon } from "react-native-elements"
import EditButton from "./buttons/EditButton"
import VisibilityButton from "./buttons/VisibilityButton"

const ProfileData = (props) => {
    
    return (
        <View>
            <Text>{props.title}:</Text> 
            <VisibilityButton element={props.element} changeFunction={props.changeFunction} editFunction={props.editFunction} />

            {props.element.isEditing ? 
            //se não tiver editando, irá aparecer um texto normal
                <TextInput
                    style={{}}
                    defaultValue= {props.element.data}
                    onChangeText={(text) => {
                        props.editFunction({
                        ...props.element,
                        data: text,
                        changed: true
                        })
                        props.changeFunction(true)
                    }
                }
                />
                : //se tiver editando, irá aparecer a caixa para escrever
                    <Text>{props.element.data}</Text>
            }

            <EditButton element={props.element} editFunction = {props.editFunction} changeFunction = {props.changeFunc} />
            
        </View>


    )
}

export default ProfileData