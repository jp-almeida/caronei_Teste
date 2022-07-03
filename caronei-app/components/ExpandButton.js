import { TouchableOpacity } from 'react-native'
import React from 'react'
import { Icon } from "react-native-elements"

const ExpandButton = (props) => {
  return (
    <TouchableOpacity style={{}} onPress={() => { //botão de expandir e colapsar
        props.collapseFunction(!props.isCollapsed)
    }}>
        <Icon name={!props.isCollapsed ? "expand-more" : "keyboard-arrow-right"} type="material" size={15}></Icon>
    </TouchableOpacity>
  )
}

export default ExpandButton