import { Text, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import React from "react"
import { Icon } from "react-native-elements"

const ProfileData = (props) => {
    function func(){
        props.setFunc({
            data: props.element.data,
            visibility: !props.element.visibility,
            changed: true}
        )
        props.changeFunc(true)
    }
    return (
        <View>
            <Text>{props.title}:</Text>
            <Text>{props.element.data}</Text>
            <TouchableOpacity style={{}} onPress={() => console.log("ui")}>
                <Icon name="pencil" type="entypo" size={15}></Icon>
            </TouchableOpacity>

            <TouchableOpacity style={{}} onPress={func}>
                <Icon name={props.element.visibility ? "public" : "public_off"} type="material" size={15} color={props.element.changed ? '#FF2D00': '#000000'}></Icon>
            </TouchableOpacity>
            
        </View>


    )
}

export default ProfileData