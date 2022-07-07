import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Image } from 'react-native'
import tw from 'twrnc'
import { Icon } from '@rneui/themed'
import '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectOrigin } from '../slices/navSlice'
import { FullWindowOverlay } from 'react-native-screens'

const data = [
  {
    id: '123',
    title: 'Solicitar carona',
    image: require('../images/ride.png'),
    screen: 'PassengerRoute'
  },
  {
    id: '456',
    title: 'Oferecer carona',
    image: require('../images/car.png'),
    screen: 'DriverRoute'
  }
]

const NavOptions = () => {
  const navigation = useNavigation()
  const origin = useSelector(selectOrigin)
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          // @ts-ignore
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-7 pb-5 bg-gray-200 m-5 w-40 h-80%`}
        >
          <View>
            <Image
              style={{ width: 100, height: 100, resizeMode: 'contain' }}
              source={item.image}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={{
                padding: 12,
                backgroundColor: '#4D4C7D',
                width: 50,
                height: 50,
                marginTop: 4,
                borderRadius: 100
              }}
              // style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              name="arrowright"
              color="#EFE9E5"
              type="antdesign"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  )
}

export default NavOptions
