import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import React, { useState } from "react"
import { Image } from "react-native"
import tw from "twrnc"
import { store } from "../store"
import { useNavigation } from "@react-navigation/native"
import config from "../config/config.json"



const ProfileScreen = () => {
    const [name, setName] = useState(null)
    const [rating, setRating] = useState(null)
    const [experience, setExperience] = useState(null)

    const [email, setEmail] = useState({
        data: null,
        visibility: null
    })
    
    const [gender, setGender] = useState({
        data: null,
        visibility: null
    })
    const [phone, setPhone] = useState({
        data: null,
        visibility: null
    })
    const [birth, setBirth] = useState({
        data: null,
        visibility: null
    })

    async function getUserData(){
        //gambiarra porque as portas não estavam batendo
        let original_port = config.urlRootNode.split(":")[2]
        let url = config.urlRootNode.replace(original_port, config.backend_port)
        
        let reqs = await fetch(url + '/data/'+store.getState().auth.matricula, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const response = await reqs.json()
        setName(response.name)
        setRating(response.rating)
        setExperience(response.experience)
        setEmail({
            data: response.email,
            visibility: response.emailVisibility
        })
        setGender({
            data: response.gender,
            visibility: response.genderVisibility
        })
        setPhone({
            data: response.phone,
            visibility: response.phoneVisibility
        })
        setBirth({
            data: response.birth,
            visibility: response.birthVisibility
        })
        
    }
    
    if (!name){getUserData()}
    

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={tw`p-10 pt-50`}>
                    <View style={{}}>
                        <Text>MEU PERFIL</Text>
                        <Text>Email: {email.data}</Text>
                        <Text>Número: {phone.data}</Text>
                        <Text>Matrícula: {store.getState().auth.matricula}</Text>
                        <Text>Data de nascimento: {birth.data}</Text>
                        <Text>Gênero: {gender.data}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>


    )
}

export default ProfileScreen