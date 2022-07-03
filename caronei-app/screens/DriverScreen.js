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
import { Geometry } from "react-native-google-places-autocomplete"
const polyline = require("@mapbox/polyline")

const DriverScreen = () => {
  const [coordsArray, setCoordsArray] = useState({})
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin)
  const destination = useSelector(selectDestination)
  // const [rideOrigin, setRideOrigin] = useState(null)
  // const [rideDestination, setRideDestination] = useState(null)

  async function test() {
    const startLoc = `${origin.location.lat}, ${origin.location.lng}`
    const endLoc = `${destination.location.lat}, ${destination.location.lng}`
    const resp = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${endLoc}&key=${GOOGLE_MAPS_APIKEY}`
    )
    const respJson = await resp.json()
    let points = polyline.decode(respJson.routes[0].overview_polyline.points)
    let coords = []
    for (let i = 0; i < points.length; i++) {
      coords.push([points[0][i], points[1][i]])
    }
    setCoordsArray({ coords: coords })
  }

  let rideOrigin = {
    lat: 0.0,
    lng: 0.0,
  }
  let rideDestination = {
    lat: 0.0,
    lng: 0.0,
  }

  function isRouteSubset() {
    let originOnRoute = isPointInLine(
      {
        latitude: rideOrigin.lat,
        longitude: rideOrigin.lng,
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
        latitude: rideDestination.lat,
        longitude: rideDestination.lng,
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
            // setRideOrigin({
            //   location: details?.geometry.location,
            //   description: data.description,
            // })
            if (
              details?.geometry.location.lat !== undefined &&
              details?.geometry.location.lng !== undefined
            ) {
              rideOrigin.lat = details?.geometry.location.lat
              rideOrigin.lng = details?.geometry.location.lng
            }
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
            // setRideDestination({
            //   location: details?.geometry.location,
            //   description: data.description,
            // })
            if (
              details?.geometry.location.lat !== undefined &&
              details?.geometry.location.lng !== undefined
            ) {
              rideDestination.lat = details?.geometry.location.lat
              rideDestination.lng = details?.geometry.location.lng
            }
            const resultado = isPointInLine(
              { latitude: rideOrigin.lat, longitude: rideOrigin.lng },
              { latitude: origin.location.lat, longitude: origin.location.lng },
              {
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }
            )
            const resultado2 = isPointInLine(
              { latitude: rideDestination.lat, longitude: rideDestination.lng },
              { latitude: origin.location.lat, longitude: origin.location.lng },
              {
                latitude: destination.location.lat,
                longitude: destination.location.lng,
              }
            )
            // console.log(origin.location)
            // console.log(destination.location)
            // console.log(rideOrigin.lat)
            // console.log(rideOrigin.lng)
            // console.log(rideDestination.lat)
            // console.log(rideDestination.lng)
            // console.log(resultado)
            // console.log(resultado2)
            console.log("coordsArray", coordsArray)
            // console.log("coordsArray[0]", coordsArray[0])
            // console.log("coordsArray[1]", coordsArray[1])
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
