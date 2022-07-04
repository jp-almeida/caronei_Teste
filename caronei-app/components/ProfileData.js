import { Text, View, TouchableOpacity, TouchableWithoutFeedback, TextInput } from "react-native"
import React, { useState } from "react"
import { Dialog, Icon } from "react-native-elements"
import EditButton from "./buttons/EditButton"
import VisibilityButton from "./buttons/VisibilityButton"
import { styles } from "../styles"

const ProfileData = (props) => {
    let currentData = props.element.data 
    return (
        <View style={styles.profileLine}>
            <Text style= {styles.profileLineDataTitle}>{props.title}:</Text> 
            
            {props.element.data ?
                <Text style= {styles.profileLineData}>{props.element.data}</Text>
            :
            <Text style= {styles.profileLineData}>{"(Sem " + props.title.toLowerCase() + ")"}</Text>
            }
            

            {/* botões */}
            <EditButton element={props.element} editFunction = {props.editFunction} changeFunction = {props.changeFunc} />
            <VisibilityButton element={props.element} changeFunction={props.changeFunction} editFunction={props.editFunction} />
            
            <Dialog visible={props.element.isEditing} overlayStyle={styles.dialog}>
                <Dialog.Title title={"Editar "+ props.title.toLowerCase()} titleStyle={styles.dialogTitle}/>
                <TextInput
                    style={styles.textInput}
                    defaultValue= {props.element.data}
                    onChangeText={(text) => {
                        currentData = text
                    }
                }/>
                <Dialog.Button title="Salvar" 
                buttonStyle={{}}
                onPress={() => {
                    props.editFunction({
                        ...props.element,
                        data: currentData,
                        changed: true,
                        isEditing: false
                        })
                    props.changeFunction(true)
                }}/>
                <Dialog.Button title="Cancelar"
                buttonStyle={{}}
                onPress={() => {
                    props.editFunction({
                        ...props.element,
                        isEditing: false
                        })
                    currentData = props.element.data
                }}/>

            </Dialog>
            
        </View>


    )
}

export default ProfileData