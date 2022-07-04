import React from "react"
import { StyleSheet, Text, View } from "react-native"
import { Provider } from "react-redux"
import { SafeAreaProvider } from "react-native-safe-area-context"
import "react-native-gesture-handler"
import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"

import { store } from "./store"
import HomeScreen from "./screens/HomeScreen"
import MapScreen from "./screens/MapScreen"
import SignUpScreen from "./screens/SignUpScreen"
import LogInScreen from "./screens/LogInScreen"
import ProfileScreen from "./screens/ProfileScreen"
import RecoverPswdScreen from "./screens/RecoverPswdScreen"
import PswdRecoveredScreen from "./screens/PswdRecoveredScreen"
import InitialScreen from "./screens/InitialScreen"
import HomeScreen2 from "./screens/HomeScreen2"
import RateUserScreen from "./screens/RateUserScreen"
//import MainScreen from "./screens/MainScreen"
import AcceptRideScreen from "./screens/AcceptRideScreen"
import ReportScreen from "./screens/ReportScreen"
import MainScreen from "./screens/MainScreen"

export default function App() {
  const Stack = createNativeStackNavigator()
  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator>
            {/* <Stack.Screen
              name="HomeScreen2"
              component={HomeScreen2}
              options={{
                headerShown: false,
              }}
            /> */}
            <Stack.Screen
              name="InitialScreen"
              component={InitialScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="MainScreen"
              component={MainScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="RateUserScreen"
              component={RateUserScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="ReportScreen"
              component={ReportScreen}
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
              name="RecoverPswdScreen"
              component={RecoverPswdScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="PswdRecoveredScreen"
              component={PswdRecoveredScreen}
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="LogInScreen"
              component={LogInScreen}
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
              name="ProfileScreen"
              component={ProfileScreen}
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
