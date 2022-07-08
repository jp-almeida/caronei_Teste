import { StyleSheet, Text, View } from "react-native"
import React, { useEffect } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import tw from "twrnc"
// @ts-ignore
import { useDispatch } from "react-redux"
import { selectOrigin, setDestination } from "../slices/navSlice"
import { useNavigation } from "@react-navigation/native"

const GOOGLE_MAPS_APIKEY = "AIzaSyC-QBVamaBEmATYgT7D8bJiL-8GJX0layQ"
const NavigateCard = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <Text style={tw`text-center py-5 text-xl`}>Para onde?</Text>
      <View style={tw`border-t border-gray-200 flex-shrink`}>
        <View>
          {/* <GooglePlacesAutocomplete
            placeholder="Para onde?"
            styles={toInputBoxStyles}
            fetchDetails={true}
            // @ts-ignore
            returnKeyType={"default"}
            minLength={2}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              )
              // @ts-ignore
              navigation.navigate("RideOptionsCard")
            }}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_APIKEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            debounce={400}
          /> */}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textIputContainers: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
})
