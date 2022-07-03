import { TouchableOpacity } from "react-native"
import { Icon } from "react-native-elements"
import React from 'react'


//props
//element -> data, visibility, changed
//changeFunction
const VisibilityButton = (props) => {
  return (
    <TouchableOpacity style={{}} onPress={() => { //troca a visibilidade do elemento e atualiza os dados no componente pai
        props.editFunction({
            ...props.element,
            visibility: !props.element.visibility,
            changed: true
        })
        props.changeFunction(true)
        }}>
        <Icon name={props.element.visibility ? "public" : "public-off"} type="material" size={15} color="#000000"></Icon>
    </TouchableOpacity>
  )
}

export default VisibilityButton