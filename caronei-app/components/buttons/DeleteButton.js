import { TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements"
import React from 'react'


//props
//element -> data, isEditing
//changeFunction
const DeleteButton = (props) => {
  return (
    <TouchableOpacity style={{}} onPress={() => {
        props.deleteFunction()
        if (props.changeFunction){
          props.changeFunction(true)
        }
        
    }}>
        <Icon name="delete" type="material" size={15}></Icon>
    </TouchableOpacity>
  )
}

export default DeleteButton