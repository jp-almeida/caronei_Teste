import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import React, { useState } from "react"
import { Image, Keyboard } from "react-native"
import tw from "twrnc"
import { store } from "../store"
import { useNavigation } from "@react-navigation/native"
import config from "../config/config.json"
import { Icon } from "react-native-elements"
import ProfileData from "../components/ProfileData"
import Collapsible from 'react-native-collapsible';
import { Picker } from '@react-native-community/picker';
import StarRating from 'react-native-star-rating';
import RNDateTimePicker from "@react-native-community/datetimepicker"

function getGenderName(gender) {
    switch (gender) {
        case "M":
            return "Masculino"
        case "F":
            return "Feminino"
        case "O":
            return "Outro"
        default:
            return "Não quero informar"
    }
}

const ProfileScreen = () => {
    const [name, setName] = useState(null)
    const [changed, setChanged] = useState(false)
    const [rating, setRating] = useState(null)
    const [experience, setExperience] = useState(null)

    const [email, setEmail] = useState({
        data: null,
        visibility: null
    })
    const [gender, setGender] = useState({
        value: null,
        data: null,
        visibility: null,
        isEditing: false
    })
    const [phone, setPhone] = useState({
        data: null,
        visibility: null
    })
    const [birth, setBirth] = useState({
        data: null,
        visibility: null,
        isEditing: false
    })
    function switchGenderAttribute(attribute) {
        let editing = gender.isEditing
        let vis = gender.visibility
        let chang = gender.changed
        switch (attribute) {
            case "visibility":
                vis = !vis
                chang = true
                setChanged(true)
                break
            case "isEditing":
                editing = !editing
                break
            default:
                return null
        }
        setGender({
            value: gender.value,
            data: gender.data,
            visibility: vis,
            isEditing: editing,
            changed: chang,
        })
    }

    async function getUserData() {
        //gambiarra porque as portas não estavam batendo
        let original_port = config.urlRootNode.split(":")[2]
        let url = config.urlRootNode.replace(original_port, config.backend_port)

        let reqs = await fetch(url + '/data/' + store.getState().auth.matricula, {
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
            visibility: response.emailVisibility,
            changed: false
        })
        setGender({
            value: response.gender,
            data: getGenderName(response.gender),
            visibility: response.genderVisibility,
            changed: false
        })
        setPhone({
            data: response.phone,
            visibility: response.phoneVisibility,
            changed: false
        })
        setBirth({
            data: new Date(response.birth),
            visibility: response.birthVisibility,
            changed: false,
            isEditing: false
        })

    }
    async function updateUserData() {

        //gambiarra porque as portas não estavam batendo
        let original_port = config.urlRootNode.split(":")[2]
        let url = config.urlRootNode.replace(original_port, config.backend_port)
        let jsonBody = { matricula: store.getState().auth.matricula.toString() }


        if (email.changed) {
            jsonBody.email = email.data
            jsonBody.emailVisibility = email.visibility
            setEmail({
                data: email.data,
                visibility: email.visibility,
                changed: false
            })
        }

        if (gender.changed) {
            jsonBody.gender = gender.value
            jsonBody.genderVisibility = gender.visibility
            setGender({
                data: gender.data,
                value: gender.value,
                visibility: gender.visibility,
                isEditing: false,
                changed: false
            })

        }

        if (phone.changed) {
            jsonBody.phone = phone.data
            jsonBody.phoneVisibility = phone.visibility
            setPhone({
                data: phone.data,
                visibility: phone.visibility,
                changed: false
            })
        }

        if (birth.changed) {
            jsonBody.birth = birth.data
            jsonBody.birthVisibility = birth.visibility
            setBirth({
                data: birth.data,
                visibility: email.visibility,
                changed: false
            })
        }

        let reqs = await fetch(url + "/update", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(jsonBody),
        })
        let resp = await reqs.json()

        console.log(resp)

        setChanged(false)
    }


    if (!name) { getUserData() }

    const [isCollapsedProfile, setCollapsedProfile] = useState(false)

    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <View style={{marginTop:40, marginLeft:30}}>
                    <Image
                        style={{
                            width: 80,
                            height: 80,
                            resizeMode: "contain",
                        }}
                        source={require("../images/profile_picture.png")}
                    />
                    <Text>{name}</Text>
                    
                    {!rating && //caso ainda não tenha avaliações
                    <Text>Você ainda não foi avaliado</Text>}
                    
                    {rating &&
                        <View style={{width:100}}>
                            <Text>{rating}</Text>
                            <StarRating
                                disabled = {true}
                                rating={rating}
                                starSize = {30}
                                fullStarColor = "#4D4C7D"
                                starStyle = {{}}
                            />
                        </View>
                    }

                    <View style={{}}>

                        <TouchableOpacity style={{}} onPress={() => { //botão de expandir e colapsar
                            setCollapsedProfile(!isCollapsedProfile)
                        }}>
                            <Icon name={isCollapsedProfile ? "expand-more" : "expand-less"} type="material" size={15}></Icon>
                        </TouchableOpacity>

                        <Text>MEU PERFIL</Text>

                        <Collapsible collapsed={isCollapsedProfile}>
                            <ProfileData title="Email" element={email} setFunc={setEmail} changeFunc={setChanged}></ProfileData>

                            <Text>Matrícula: {store.getState().auth.matricula}</Text>

                            <ProfileData title="Número" element={phone} setFunc={setPhone} changeFunc={setChanged}></ProfileData>

                            <Text>Data de nascimento</Text>
                            <Text>
                                {birth.data ?
                                birth.data.getDate() + "/" + (birth.data.getMonth()+1) + "/" + birth.data.getFullYear() :
                                "(Informe sua data de nascimento)"}
                            </Text>
                            <TouchableOpacity style={{}} onPress={() => {
                                setBirth({
                                    data: birth.data,
                                    visibility: birth.visibility,
                                    changed: birth.changed,
                                    isEditing: !birth.isEditing
                                })
                            }}>
                                <Icon name={birth.isEditing ? "done" : "edit"} type="material" size={15}></Icon>
                            </TouchableOpacity>
                            
                            {birth.isEditing &&
                                <RNDateTimePicker 
                                    mode="date"
                                    
                                    value={birth.data ? birth.data : new Date()}
                                    maximumDate= {new Date()}
                                    onChange={(event, date) => {
                                        setBirth({
                                            data: date,
                                            visibility: birth.visibility,
                                            changed: true,
                                            isEditing: false
                                        })
                                        setChanged(true)
                                    }}
                                />
                            }
                            

                            <Text>Gênero</Text>

                            <TouchableOpacity style={{}} onPress={() => switchGenderAttribute("isEditing")}>
                                <Icon name={gender.isEditing ? "done" : "edit"} type="material" size={15}></Icon>
                            </TouchableOpacity>

                            {!gender.isEditing && //se não tiver editando, mostra o genero como texto
                                <Text>{gender.data ? gender.data : "(Informe seu gênero)"}</Text>}

                            <TouchableOpacity style={{}} onPress={() => { //troca a visibilidade do genero
                                switchGenderAttribute("visibility")
                            }}>
                                <Icon name={gender.visibility ? "public" : "public-off"} type="material" size={15} color="#000000"></Icon>
                            </TouchableOpacity>

                            {gender.isEditing && //se tiver editando, mostra o genero como o picker select
                                <Picker
                                    selectedValue={gender.value}
                                    style={{ height: 50, width: 100 }}
                                    onValueChange={(itemValue, itemIndex) => {
                                        setGender({
                                            value: itemValue,
                                            data: getGenderName(itemValue),
                                            visibility: gender.visibility,
                                            isEditing: true,
                                            changed: true
                                        })
                                        setChanged(true)
                                    }
                                    }>
                                    <Picker.Item label="Femino" value="F" />
                                    <Picker.Item label="Masculino" value="M" />
                                    <Picker.Item label="Outro" value="O" />
                                    <Picker.Item label="Não quero informar" value={null} />
                                </Picker>
                            }
                        </Collapsible>


                    </View>
                    {
                        changed && //caso tenha alterações, mostrar o botão de salvar alterações
                        <TouchableOpacity style={{}} onPress={updateUserData}>
                            <Text style={{}}>Salvar alterações</Text>
                        </TouchableOpacity>
                    }

                </View>
            </TouchableWithoutFeedback>
        </SafeAreaView>


    )
}

export default ProfileScreen