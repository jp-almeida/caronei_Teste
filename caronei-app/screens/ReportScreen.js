// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Keyboard,
  TextInput,
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
import { DefaultButton } from "../components/Button"
import { AntDesign } from "@expo/vector-icons"
import SimpleSelectButton from "react-native-simple-select-button"

const ReportScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const [name, setName] = useState(null)
  const [reportComment, setReportComment] = useState(null)
  const [choice, setChoice] = useState("")

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

  const button_list = [
    { label: "Usuário é diferente da foto", value: "1" },
    { label: "Usuário foi grosso", value: "2" },
    { label: "Direção perigosa", value: "3" },
    { label: "Outros", value: "4" },
  ]

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={{ backgroundColor: "#EFE9E5", flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 45,
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 30,
                marginBottom: 30,
                maxWidth: 200,
                color: "#46458D",
              }}
            >
              {name}
            </Text>

            <Text
              style={{
                fontSize: 25,
                color: "#46458D",
                textAlign: "center",
              }}
            >
              Como podemos ajudar?
            </Text>

            <FlatList
              data={button_list}
              keyExtractor={(item) => item.value}
              extraData={choice}
              renderItem={({ item }) => (
                <SimpleSelectButton
                  onPress={() => setChoice(item.value)}
                  isChecked={choice === item.value}
                  text={item.label}
                  textSize={14}
                  iconName="checkcircleo"
                  iconColor="#fff"
                  iconSize={14}
                  buttonDefaultColor="#e5e5e5"
                  buttonSelectedColor="#46458D"
                  textDefaultColor="#333"
                  textSelectedColor="#fff"
                />
              )}
            />

            <Text
              style={{
                fontSize: 18,
                marginBottom: 30,
                maxWidth: 200,
                color: "#46458D",
              }}
            >
              Detalhes do ocorrido:
            </Text>

            <TextInput
              placeholder="Escreva seu comentário aqui"
              styles={{
                container: {
                  flex: 0,
                },
                textInput: {
                  fontSize: 18,
                  color: "#4D4C7D",
                },
              }}
            />

            <View style={{ marginBottom: 15 }}>
              <DefaultButton
                title="Enviar"
                onChangeText={(text) => setReportComment(text)}
              />
            </View>

            <View style={{ marginBottom: 15 }}>
              <DefaultButton
                title="Cancelar"
                onPress={() => navigation.navigate("HomeScreen")}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ReportScreen

const styles = StyleSheet.create({
  text: {
    color: "blue",
  },
})
