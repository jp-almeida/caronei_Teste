import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Dimensions,
} from "react-native"
import React, { useState } from "react"
import MapView, { Marker } from "react-native-maps"
import paradas from "../paradas/paradas.json"
import tw from "twrnc"
import NavOptions from "../components/NavOptions"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { logoutAuth } from "../slices/userAuth"
import config from "../config/config.json"
import { store } from "../store"
import { logout } from "../slices/rideState"
import { getUsernameData } from "../requestsFunctions"
import { Icon } from "@rneui/themed"
import mapStyle from "../paradas/MapStyle.json"

export default function HomeScreen() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [name, setName] = useState(null)

  function exitAccount() {
    dispatch(logoutAuth())
    dispatch(logout())
    navigation.navigate("LogInScreen")
  }
  async function getUserName() {
    let reqs = getUsernameData(store.getState().auth.matricula)
    setName(await reqs)
  }
  getUserName()

  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            justifyContent: "space-between",
            height: "20%",
            paddingHorizontal: 20,
            alignItems: "center",
            flexDirection: "row",
            padding: 10,
            backgroundColor: "#EFE9E5",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                width: 140 / 1.5,
                height: 100 / 1.5,
              }}
              source={require("../images/logo.png")}
            />

            {/* <Text>Olá, {name}</Text> */}
          </View>

          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              style={styles.homeButton1}
              onPress={() => navigation.navigate("ProfileScreen")}
            >
              <Icon
                size={20}
                style={{}}
                name="user"
                color="#EFE9E5"
                type="feather"
              />
              <Text style={styles.homeButtonText}>Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.homeButton2} onPress={exitAccount}>
              <Icon
                size={20}
                style={{}}
                name="log-out"
                color="#EFE9E5"
                type="feather"
              />

              <Text style={styles.homeButtonText}>Sair</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={tw`h-40%`}>
          <MapView
            style={styles.mapStyle}
            region={{
              latitude: -3.742522,
              longitude: -38.574836,
              latitudeDelta: 0.013,
              longitudeDelta: 0.013,
            }}
            customMapStyle={mapStyle}
          >
            {paradas.map((marker, index) => (
              <Marker
                key={index}
                coordinate={{
                  latitude: marker.lat,
                  longitude: marker.lng,
                }}
                title={marker.nome}
              />
            ))}
          </MapView>
        </View>
        <View
          style={{
            height: "40%",
            backgroundColor: "#EFE9E5",
          }}
        >
          <NavOptions />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: "100%",
  },
  homeButton1: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#4D4C7D",
    borderRadius: 8,
  },
  homeButton2: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "black",
    borderRadius: 8,
    marginLeft: 10,
  },
  homeButtonText: {
    marginLeft: 5,
    color: "white",
  },
})
