// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native"
import React, { useState } from "react"
import { Image } from "react-native"
import tw from "twrnc"
import NavOptions from "../components/NavOptions"
import { GOOGLE_MAPS_APIKEY } from "@env"
import { useDispatch } from "react-redux"
import { setDestination, setOrigin } from "../slices/navSlice"
import { logoutAuth } from "../slices/userAuth"
import { store } from "../store"
import { useNavigation } from "@react-navigation/native"
import config from "../config/config.json"
import paradas from "../paradas/paradas.json"

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [name, setName] = useState(null)

  function exitAccount() {
    dispatch(logoutAuth())
    navigation.navigate("LogInScreen")
  }
  async function getUserName() {
    //gambiarra porque as portas não estavam batendo
    let original_port = config.urlRootNode.split(":")[2]
    let url = config.urlRootNode.replace(original_port, config.backend_port)

    let reqs = await fetch(
      url + "/username/" + store.getState().auth.matricula,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
    const response = await reqs.json()
    setName(response)
  }
  getUserName()

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 150,
            height: 200,
            resizeMode: "contain",
          }}
          source={require("../images/logo.png")}
        />

        <Text>Olá, {name}</Text>
        <TouchableOpacity style={{}} onPress={exitAccount}>
          <Text style={{}}>Sair</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{}}
          onPress={() => navigation.navigate("ProfileScreen")}
        >
          <Text style={{}}>Perfil</Text>
        </TouchableOpacity>

        {/* <GooglePlacesAutocomplete
          placeholder="Local de partida"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            )
            dispatch(setDestination(null))
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        /> */}
        <NavOptions />
      </View>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
})
