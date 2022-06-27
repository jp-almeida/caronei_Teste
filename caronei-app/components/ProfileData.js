import { Text, View, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import React from "react"
import { Icon } from "react-native-elements"

const ProfileData = (props) => {
    return (
        <View>
            <Text>{props.title}:</Text>
            <Text>{props.element.data}</Text>
            <TouchableOpacity style={{}} onPress={() => console.log("ui")}>
                <Icon name="pencil" type="entypo" size={15}></Icon>
            </TouchableOpacity>

            <TouchableOpacity style={{}} onPress={() => console.log("ai")}>
                <Icon name={props.element.visibility ? "unlock" : "lock"} type="entypo" size={15}></Icon>
            </TouchableOpacity>
        </View>


    )
}

export default ProfileData