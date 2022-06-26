import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Provider } from "react-redux"
import { SafeAreaProvider } from "react-native-safe-area-context"
import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"

import { store } from "./store"
import HomeScreen from "./screens/HomeScreen"
import MapScreen from "./screens/MapScreen"
import SignUpScreen from "./screens/SignUpScreen"
import LogInScreen from "./screens/LogInScreen"

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
          <Stack.Screen
              name="LogInScreen"
              component={LogInScreen}
              options={{
                headerShown: false,
              }}
            />
          <Stack.Screen
              name="SignUpScreen"
              component={SignUpScreen}
              options={{
                headerShown: false,
              }}
            />
          

            

            
            
            
            <Stack.Screen
              name="HomeScreen"
              component={HomeScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="MapScreen"
              component={MapScreen}
              options={{
                headerShown: false,
              }}
            />
            {/* <HomeScreen /> */}
          </Stack.Navigator>
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
