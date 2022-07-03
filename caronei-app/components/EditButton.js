import { TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements"
import React from 'react'


//props
//element -> data, isEditing
//changeFunction
const EditButton = (props) => {
  return (
    <TouchableOpacity style={{}} onPress={() => {
        props.editFunction({
            ...props.element,
            isEditing: !props.element.isEditing
        })
        
    }}>
        <Icon name={props.element.isEditing ? "done" : "edit"} type="material" size={15}></Icon>
    </TouchableOpacity>
  )
}

export default EditButton