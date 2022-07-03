import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableHighlight,
} from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import paradas from "../paradas/paradas.json"

const HomeScreen2 = () => {
  const [title, setTitle] = useState("")
  const [data, setData] = useState([{}])
  const [originalData, setOriginalData] = useState([{}])

  useEffect(() => {
    setData(paradas)
    setOriginalData(paradas)
  }, [])

  function renderOptions(item) {
    return (
      <View style={styles.card}>
        <TouchableHighlight
          style={styles.item}
          onPress={() => {
            setTitle(item.nome)
            setData([])
          }}
        >
          <Text style={{ color: "black" }} numberOfLines={1}>
            {item.item.nome}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }

  function search(s) {
    let arr = [...originalData]
    setData(arr.filter((d) => d.nome.toLowerCase().includes(s.toLowerCase())))
    setTitle(s)
  }

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder={"Local de Partida..."}
        onChangeText={(s) => search(s)}
        autoCapitalize="none"
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={(item) => renderOptions(item)}
      />
      <Text>HomeScreen2</Text>
    </SafeAreaView>
  )
}

export default HomeScreen2

const styles = StyleSheet.create({
  card: {
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  title: {
    fontSize: 14,
    color: "#444",
    fontWeight: "normal",
    marginTop: 7,
  },
  body: {
    fontSize: 13,
    color: "#777",
    fontWeight: "normal",
    marginTop: 7,
  },
  input: {
    borderColor: "#eee",
    borderWidth: 1,
    borderRadius: 4,
    padding: 15,
    marginHorizontal: 20,
    marginTop: 20,
  },
  container: {
    flex: 1,
    paddingTop: 100,
    backgroundColor: "#ecf0f1",
    padding: 8,
  },
  itemm: {
    justifyContent: "center",
    height: "20%",
  },
  rowText: {
    color: "#000",
    fontSize: 20,
    marginStart: 20,
    borderColor: "#FAFAFA",
  },
})
