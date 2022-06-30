import { FlatList, Text, TouchableOpacity, View } from "react-native"
import React from "react"
import { Image } from "react-native"
import tw from "twrnc"
import { Icon } from "@rneui/themed"
import "@react-navigation/native"
import { useNavigation } from "@react-navigation/native"
import { useSelector } from "react-redux"
import { selectOrigin } from "../slices/navSlice"

const data = [
  {
    id: "123",
    title: "Solicitar carona",
    image: require("../images/car.png"),
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Restaurantes",
    image: require("../images/ride.png"),
    screen: "DriverScreen",
  },
]

const NavOptions = () => {
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin)
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40`}
          disabled={!origin}
        >
          <View>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={item.image}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="white"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavOptions
