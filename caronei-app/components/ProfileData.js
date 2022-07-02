import { Text, View, TouchableOpacity, TouchableWithoutFeedback, TextInput } from "react-native"
import React, { useState } from "react"
import { Icon } from "react-native-elements"

const ProfileData = (props) => {

    const [isEditing, setIsEditing] = useState(false) //indica se este componente está sendo editado ou não
    const [currentData, setCurrentData] = useState(null)
    
    function updateData(switchVisibility = false){
        props.setFunc({
            data: currentData,
            visibility: switchVisibility ? (!props.element.visibility) : props.element.visibility,
            changed: true}
        )
        props.changeFunc(true)
    }
    function editData(){
        if(isEditing){ //se tiver editando
            setIsEditing(false) //para de editar
            updateData() //atualiza os dados
        }
        else{ //se não tiver editando
            setIsEditing(true) //começará a editar
        }
        
    }
    
    return (
        <View>
            <Text>{props.title}:</Text> 
            <TouchableOpacity style={{}} onPress={() => { //troca a visibilidade do elemento e atualiza os dados no componente pai
                updateData(switchVisibility = true)
                }}>
                <Icon name={props.element.visibility ? "public" : "public"} type="material" size={15} color="#000000"></Icon>
            </TouchableOpacity>

            {!isEditing && //se não tiver editando, irá aparecer um texto normal
            <Text>{props.element.data}</Text>
            }
            
            {isEditing && //se tiver editando, irá aparecer a caixa para escrever
            <TextInput
                style={{}}
                defaultValue= {props.element.data}
                onChangeText={(text) => setCurrentData(text)}
            />
            }

            <TouchableOpacity style={{}} onPress={() => editData()}>
                <Icon name={isEditing ? "done" : "edit"} type="material" size={15}></Icon>
            </TouchableOpacity>
            

            
            
        </View>


    )
}

export default ProfileData