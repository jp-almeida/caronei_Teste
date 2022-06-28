import { Button, StyleSheet, Text, View } from "react-native"
import React, { useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import { selectDestination, selectOrigin } from "../slices/navSlice"
import { isPointInLine } from "geolib"
import { useDispatch, useSelector } from "react-redux"
// @ts-ignore
import { GOOGLE_MAPS_APIKEY } from "@env"
import tw from "twrnc"
import { useNavigation } from "@react-navigation/native"

const DriverScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  const [rideOrigin, setRideOrigin] = useState(null)
  const [rideDestination, setRideDestination] = useState(null)

  function isRouteSubset() {
    let originOnRoute = isPointInLine(
      {
        latitude: rideOrigin?.location.lat,
        longitude: rideOrigin?.location.lng,
      },
      {
        latitude: origin.location.lat,
        longitude: origin.location.lng,
      },
      {
        latitude: destination.location.lat,
        longitude: destination.location.lng,
      }
    )

    let destinationOnRoute = isPointInLine(
      {
        latitude: rideDestination?.location.lat,
        longitude: rideDestination?.location.lng,
      },
      {
        latitude: origin.location.lat,
        longitude: origin.location.lng,
      },
      {
        latitude: destination.location.lat,
        longitude: destination.location.lng,
      }
    )

    if (originOnRoute && destinationOnRoute) {
      return "Rota semelhante"
    } else if (!destinationOnRoute || !rideOrigin || !origin || !destination) {
      return "algum dado faltando"
    } else {
      return "Não é semehante"
    }
  }
  return (
    <SafeAreaView>
      <View style={tw`h-1/2`}>
        <GooglePlacesAutocomplete
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
            setRideOrigin({
              location: details?.geometry.location,
              description: data.description,
            })
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
        <GooglePlacesAutocomplete
          placeholder="Local de destino"
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            setRideDestination({
              location: details?.geometry.location,
              description: data.description,
            })
          }}
          fetchDetails={true}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_APIKEY,
            language: "en",
          }}
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />
      </View>

      <View style={tw`h-1/2`}>
        <Text>{isRouteSubset()}</Text>
      </View>
    </SafeAreaView>
  )
}

export default DriverScreen

const styles = StyleSheet.create({})
