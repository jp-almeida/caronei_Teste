import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Kayboard
} from 'react-native'
import React, { useState } from 'react'
import { Image } from 'react-native'
import tw from 'twrnc'
import { store } from '../store'
import { useNavigation } from '@react-navigation/native'
import config from '../config/config.json'
import { Icon } from 'react-native-elements'
import ProfileData from '../components/ProfileData'

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

  async function getUserData() {
    //gambiarra porque as portas não estavam batendo
    let original_port = config.urlRootNode.split(':')[2]
    let url = config.urlRootNode.replace(original_port, config.backend_port)

    let reqs = await fetch(url + '/data/' + store.getState().auth.matricula, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    })
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
  async function updateUserData() {
    //gambiarra porque as portas não estavam batendo
    let original_port = config.urlRootNode.split(':')[2]
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
      jsonBody.gender = gender.data
      jsonBody.genderVisibility = gender.visibility
      setGender({
        data: gender.data,
        visibility: gender.visibility,
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
      setData({
        data: birth.data,
        visibility: email.visibility,
        changed: false
      })
    }
    // console.log("JASOOOON", JSON.stringify(jsonBody))

    let reqs = await fetch(url + '/update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonBody)
    })
    let resp = await reqs.json()

    setChanged(false)
  }

  if (!name) {
    getUserData()
  }

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={tw`p-10 pt-50`}>
          <View style={{}}>
            <Text>MEU PERFIL</Text>

            <ProfileData
              title="Email"
              element={email}
              setFunc={setEmail}
              changeFunc={setChanged}
            ></ProfileData>
            <Text>
              Visibilidade do email:{' '}
              {email.visibility != undefined
                ? email.visibility.toString()
                : 'undefined'}
            </Text>
            <Text>Matrícula: {store.getState().auth.matricula}</Text>

            <ProfileData title="Número" element={phone}></ProfileData>

            <ProfileData
              title="Data de nascimento"
              element={birth}
            ></ProfileData>

            <ProfileData title="Gênero" element={gender}></ProfileData>
          </View>
          {changed && (
            <TouchableOpacity style={{}} onPress={updateUserData}>
              <Text style={{}}>Salvar alterações</Text>
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default ProfileScreen
