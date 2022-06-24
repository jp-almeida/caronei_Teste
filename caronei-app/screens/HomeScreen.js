// @ts-nocheck
import { StyleSheet, Text, View, SafeAreaView } from "react-native"
import React from "react"
import { Image } from "react-native"
import tw from "twrnc"
import NavOptions from "../components/NavOptions"
import { GOOGLE_MAPS_APIKEY } from "@env"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { useDispatch } from "react-redux"
import { setDestination, setOrigin } from "../slices/navSlice"

const HomeScreen = () => {
  const dispatch = useDispatch()
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5`}>
        <Image
          style={{
            width: 150,
            height: 200,
            resizeMode: "contain",
          }}
          // source={{
          //   uri: "./images/logo.png",
          //   uri: "https://links.papareact.com/gzs",
          // }}
          source={require("../images/logo.png")}
        />
        <GooglePlacesAutocomplete
          placeholder="Para onde?"
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
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debouce={400}
        />
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
