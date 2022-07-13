import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  Pressable,
} from "react-native"
import React, { useState } from "react"
import { Image, Keyboard } from "react-native"
import tw from "twrnc"
import { store } from "../store"
import { useNavigation } from "@react-navigation/native"
import config from "../config/config.json"
import { Icon } from "react-native-elements"
import ProfileData from "../components/ProfileData"
import Collapsible from "react-native-collapsible"
import { Picker } from "@react-native-community/picker"
import StarRating from "react-native-star-rating"
import RNDateTimePicker from "@react-native-community/datetimepicker"
import EditButton from "../components/buttons/EditButton"
import VisibilityButton from "../components/buttons/VisibilityButton"
import ExpandButton from "../components/buttons/ExpandButton"
import { Dialog } from "react-native-elements"
import CarProfileLine from "../components/CarProfileLine"
import { getCars, addCar, getUserData, loadRides } from "../requestsFunctions"
import { styles } from "../styles"
import { DefaultButton } from "../components/Button"
import { ScrollView } from "react-native-gesture-handler"

//gambiarra porque as portas não estavam batendo
const url = config.urlRootNode
var cars = []

function getGenderName(gender) {
  switch (gender) {
    case "M":
      return "Masculino"
    case "F":
      return "Feminino"
    case "O":
      return "Outro"
    case "N":
      return "Não quero informar"
    default:
      return null
  }
}

const ProfileScreen = () => {
  const navigation = useNavigation()
  const [name, setName] = useState({
    data: null,
    isEditing: false,
    changed: false,
  })
  const [changed, setChanged] = useState(false)
  const [rating, setRating] = useState(null)
  const [experience, setExperience] = useState(null)

  const [email, setEmail] = useState({
    data: null,
    visibility: null,
    isEditing: false,
  })
  const [gender, setGender] = useState({
    value: null,
    data: null,
    visibility: null,
    isEditing: false,
    changed: false,
  })
  const [phone, setPhone] = useState({
    data: null,
    visibility: null,
    changed: false,
    isEditing: false,
  })
  const [birth, setBirth] = useState({
    data: null,
    visibility: null,
    isEditing: false,
    changed: false,
  })
  const [cars, setCars] = useState([])
  const [selectedGender, setSelectedGender] = useState()

  //arrays de corridas
  const [rides, setRides] = useState([]) //todas as corridas
  const [ridesDriver, setRidesDriver] = useState([]) //corridas oferecidas
  const [ridesPassenger, setRidesPassenger] = useState([]) //corridas solicitadas

  const [filteSelected, setFilterSelected] = useState("1")

  async function getData() {
    console.log(
      store.getState().auth.matricula + " - Carregando dados (tela de perfil)"
    )
    //pega os dados do banco de dados e preenche as variaveis

    const response = await getUserData()

    setName({
      ...name,
      data: response.name,
    })
    setRating(response.rating)
    setExperience(response.experience)
    setEmail({
      ...email,
      data: response.email,
      visibility: response.emailVisibility,
    })
    setGender({
      ...gender,
      value: response.gender,
      data: getGenderName(response.gender),
      visibility: response.genderVisibility,
      changed: false,
    })
    setPhone({
      ...phone,
      visibility: response.phoneVisibility,
      changed: false,
    })
    setBirth({
      ...birth,
      visibility: response.birthVisibility,
      data: response.birth ? new Date(response.birth) : response.birth, //converte para objeto de data (chega do back em string)
    })
    setSelectedGender(response.gender)
  }
  async function updateUserData() {
    console.log(
      store.getState().auth.matricula + " - Salvando dados (tela de perfil)"
    )
    let jsonBody = { matricula: store.getState().auth.matricula.toString() }
    if (name.changed) {
      jsonBody.name = name.data
      setName({
        ...name,
        changed: false,
      })
    }
    if (email.changed) {
      jsonBody.email = email.data
      jsonBody.emailVisibility = email.visibility
      setEmail({
        ...email,
        changed: false,
      })
    }

    if (gender.changed) {
      jsonBody.gender = gender.value
      jsonBody.genderVisibility = gender.visibility
      setGender({
        ...gender,
        isEditing: false,
        changed: false,
      })
    }

    if (phone.changed) {
      jsonBody.phone = phone.data
      jsonBody.phoneVisibility = phone.visibility
      setPhone({
        ...phone,
        changed: false,
      })
    }

    if (birth.changed) {
      jsonBody.birth = birth.data
      jsonBody.birthVisibility = birth.visibility
      setBirth({
        ...birth,
        changed: false,
      })
    }

    let reqs = await fetch(url + "/update", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonBody),
    })
    let resp = await reqs.json()

    setChanged(false)
  }

  async function updateCars() {
    let carros = await getCars()
    let carros2 = []
    await carros.forEach((car) => {
      carros2.push({
        ...car,
        isEditing: false,
        changed: false,
      })
    })
    setCars(await carros2)
  }
  async function addACar(placa, modelo, cor) {
    await addCar(placa, modelo, cor)
    updateCars() //atualiza os carros
  }

  async function getRides() {
    const r = await loadRides()
    setRides(await r)

    setRidesDriver(
      await r.filter((element) => {
        return element.matriculaMotorista == store.getState().auth.matricula
      })
    )

    setRidesPassenger(
      await r.filter((element) => {
        return element.matriculaPassageiro == store.getState().auth.matricula
      })
    )
  }

  if (!name.data) {
    getData()
    updateCars()
    getRides()
    console.log(ridesPassenger)
  }

  const [isCollapsedProfile, setCollapsedProfile] = useState(false)
  const [isCollapsedCars, setCollapsedCars] = useState(false)
  const [isCollapsedRides, setCollapsedRides] = useState(false)
  const [isAddingCar, setAddingCar] = useState(false)

  let placa, modelo, cor, currentName

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView style={{ backgroundColor: "#EFE9E5", flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: "column",

            padding: 45,
          }}
        >
          {/* HEADER DO PERFIL */}

          <View style={styles.userHeaderView}>
            <View
              style={{
                marginLeft: -10 /*por enquanto*/,
              }}
            >
              <Image
                style={{
                  width: 80,

                  height: 80,
                  resizeMode: "contain",
                }}
                source={require("../images/profile_picture.png")}
              />
            </View>

            <View style={{ alignItems: "flex-end" }}>
              <Text style={styles.userHeaderName}>{name.data}</Text>

              <EditButton element={name} editFunction={setName} />

              <Dialog visible={name.isEditing} overlayStyle={styles.dialog}>
                <Dialog.Title
                  title="Editar nome"
                  titleStyle={styles.dialogTitle}
                />
                <TextInput
                  style={styles.textInput}
                  defaultValue={name.data}
                  onChangeText={(text) => {
                    currentName = text
                  }}
                />
                <Dialog.Button
                  title="Salvar"
                  onPress={() => {
                    if (currentName) {
                      setName({
                        ...name,
                        data: currentName,
                        isEditing: false,
                        changed: true,
                      })
                      setChanged(true)
                    }
                    currentName = null
                  }}
                />
                <Dialog.Button
                  title="Cancelar"
                  onPress={() => {
                    setName({
                      ...name,
                      isEditing: false,
                    })
                    currentName = null
                  }}
                />
              </Dialog>
            </View>
          </View>

          <View style={{}}>
            {/* AVALIAÇÃO */}
            {!rating && (
              <Text
                style={{ color: "black", fontSize: 15, fontWeight: "bold" }}
              >
                Você ainda não foi avaliado
              </Text>
            ) //caso ainda não tenha avaliações
            }

            {rating && (
              <View style={{ width: 100 }}>
                <Text style={{ color: "#46458D" }}>{rating}</Text>
                <StarRating
                  disabled={true}
                  rating={rating}
                  starSize={30}
                  fullStarColor="#4D4C7D"
                  starStyle={{}}
                />
              </View>
            )}

            <View>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  navigation.navigate("UserScreen", {
                    matricula: store.getState().auth.matricula,
                  })
                }}
              >
                <Text style={{ color: "black", fontSize: 13 }}>
                  Como os outros vêem o meu perfil?
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginTop: 60 }}>
            {/* MEUS DADOS */}
            <View style={styles.profileSectionHeader}>
              <ExpandButton
                isCollapsed={isCollapsedProfile}
                collapseFunction={setCollapsedProfile}
              />
              <Text
                style={{ ...styles.profileSectionTitle, fontWeight: "bold" }}
              >
                Meus dados
              </Text>
            </View>

            <Collapsible collapsed={isCollapsedProfile}>
              <ProfileData
                title="E-mail"
                element={email}
                editFunction={setEmail}
                changeFunction={setChanged}
              />

              {/* MATRÍCULA */}
              <View style={styles.profileLine}>
                <Text style={styles.profileLineDataTitle}>
                  Matrícula: {store.getState().auth.matricula}
                </Text>
              </View>

              {/* NÚMERO  */}
              <ProfileData
                title="Número"
                element={phone}
                editFunction={setPhone}
                changeFunction={setChanged}
              />

              {/* NASCIMENTO */}

              <View style={styles.profileLine}>
                <Text style={styles.profileLineDataTitle}>
                  Data de nascimento:{" "}
                </Text>
                <Text style={styles.profileLineData}>
                  {birth.data
                    ? birth.data.getDate() +
                      "/" +
                      (birth.data.getMonth() + 1) +
                      "/" +
                      birth.data.getFullYear()
                    : "(Informe sua data de nascimento)"}
                </Text>

                <EditButton element={birth} editFunction={setBirth} />

                {birth.isEditing && (
                  <RNDateTimePicker
                    mode="date"
                    value={birth.data ? birth.data : new Date()}
                    maximumDate={new Date()}
                    onChange={(event, date) => {
                      setBirth({
                        ...birth,
                        data: date,
                        changed: true,
                        isEditing: false,
                      })
                      setChanged(true)
                    }}
                  />
                )}
              </View>

              {/* GENERO */}
              <View style={styles.profileLine}>
                <Text style={styles.profileLineDataTitle}>Gênero: </Text>

                {!gender.isEditing && ( //se não tiver editando, mostra o genero como texto
                  <Text style={styles.profileLineData}>
                    {gender.data ? gender.data : "(Informe seu gênero)"}
                  </Text>
                )}

                <EditButton
                  element={gender}
                  editFunction={setGender}
                  changeFunction={setChanged}
                />
                <VisibilityButton
                  element={gender}
                  changeFunction={setChanged}
                  editFunction={setGender}
                />
              </View>

              <Dialog visible={gender.isEditing} overlayStyle={styles.dialog}>
                <Dialog.Title
                  title="Editar gênero"
                  titleStyle={styles.dialogTitle}
                />
                <Picker
                  selectedValue={selectedGender}
                  style={{ height: 50, width: 100 }}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedGender(itemValue)
                    console.log(selectedGender)
                  }}
                >
                  <Picker.Item label="Feminino" value="F" />
                  <Picker.Item label="Masculino" value="M" />
                  <Picker.Item label="Outro" value="O" />
                  <Picker.Item label="Não quero informar" value="N" />
                </Picker>
                <Dialog.Button
                  title="Salvar"
                  onPress={() => {
                    setGender({
                      ...gender,
                      value: selectedGender,
                      data: getGenderName(selectedGender),
                      isEditing: false,
                      changed: true,
                    })
                    setChanged(true)
                  }}
                />
                <Dialog.Button
                  title="Cancelar"
                  onPress={() => {
                    setSelectedGender(gender.data)
                    setGender({
                      ...gender,
                      isEditing: false,
                    })
                  }}
                />
              </Dialog>

              {changed && ( //caso tenha alterações, mostrar o botão de salvar alterações
                <View
                  style={{
                    marginTop: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    style={{ ...styles.button, width: "60%" }}
                    onPress={updateUserData}
                  >
                    <Text
                      style={{
                        ...styles.text,
                        fontSize: 15,
                        fontWeight: "bold",
                      }}
                    >
                      Salvar alterações
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Collapsible>

            {/* MEUS CARROS */}
            <View style={{ ...styles.profileSectionHeader, marginTop: 60 }}>
              <ExpandButton
                isCollapsed={isCollapsedCars}
                collapseFunction={setCollapsedCars}
              />

              <Text
                style={{ ...styles.profileSectionTitle, fontWeight: "bold" }}
              >
                Meus carros
              </Text>
              <TouchableOpacity
                style={{}}
                onPress={() => {
                  setAddingCar(!isAddingCar)
                }}
              >
                <Icon name="add" type="material" size={15} />
              </TouchableOpacity>
            </View>

            <Collapsible collapsed={isCollapsedCars}>
              <Dialog
                visible={isAddingCar}
                onTouchOutside={() => setAddingCar(false)}
              >
                <Dialog.Title
                  title="Adicionar um carro"
                  titleStyle={styles.dialogTitle}
                />
                <Text>Placa</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => {
                    placa = text
                  }}
                />
                <Text>Modelo</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => {
                    modelo = text
                  }}
                />
                <Text>Cor</Text>
                <TextInput
                  style={styles.textInput}
                  onChangeText={(text) => {
                    cor = text
                  }}
                />
                <Dialog.Button
                  title="Adicionar"
                  onPress={() => {
                    setAddingCar(false)
                    addACar(placa, modelo, cor)
                  }}
                />
                <Dialog.Button
                  title="Cancelar"
                  onPress={() => setAddingCar(false)}
                />
              </Dialog>
              <Text style={{ color: "#46458D" }}>Placa | Modelo | Cor</Text>
              {cars.map((c) => (
                <CarProfileLine
                  key={c.placa}
                  carro={c}
                  editFunction={(value) => {
                    let cars_copia = [...cars] //copia do array (para poder modificar)
                    let idx = cars
                      .map((car) => {
                        return car.placa
                      })
                      .indexOf(c.placa) //indice do carro no array
                    cars_copia[idx] = value
                    setCars(cars_copia)
                  }}
                  deleteFunction={(placa) => {
                    let cars_copia = [...cars] //copia do array (para poder modificar)
                    let idx = cars
                      .map((car) => {
                        return car.placa
                      })
                      .indexOf(c.placa) //indice do carro no array
                    //remover o carro do array
                    if (idx > -1) {
                      cars_copia.splice(idx, 1)
                    }
                    //atualiza o array de carros
                    setCars(cars_copia)
                  }}
                />
              ))}
            </Collapsible>

            <View style={{ ...styles.profileSectionHeader, marginTop: 60 }}>
              <ExpandButton
                isCollapsed={isCollapsedRides}
                collapseFunction={setCollapsedRides}
              />

              <Text
                style={{ ...styles.profileSectionTitle, fontWeight: "bold" }}
              >
                Minhas caronas
              </Text>
            </View>
            <Collapsible collapsed={isCollapsedRides}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                }}
              >
                <Text style={styles.profileLineDataTitle}>Filtro:</Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={filteSelected == "1" ? {} : { opacity: 0.5 }}>
                    <TouchableOpacity
                      style={styles2.button}
                      onPress={() => {
                        setFilterSelected("1")
                      }}
                    >
                      <Text style={styles2.text}>Todas</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={filteSelected == "2" ? {} : { opacity: 0.5 }}>
                    <TouchableOpacity
                      style={styles2.button}
                      onPress={() => {
                        setFilterSelected("2")
                      }}
                    >
                      <Text style={styles2.text}>Oferecidas</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={filteSelected == "3" ? {} : { opacity: 0.5 }}>
                    <TouchableOpacity
                      style={styles2.button}
                      onPress={() => {
                        setFilterSelected("3")
                      }}
                    >
                      <Text style={styles2.text}>Solicitadas</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  marginTop: 10,
                }}
              >
                <Text style={styles.profileLineDataTitle}>
                  Passageiro/Motorista
                </Text>
                <Text style={styles.profileLineDataTitle}>Rota</Text>
                <Text style={styles.profileLineDataTitle}>Carro</Text>
              </View>
              {filteSelected == "1" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 10,
                  }}
                >
                  <Text style={styles.profileLineDataTitle}>Caronildo 1</Text>
                  <Text style={styles.profileLineDataTitle}>Rota 1</Text>
                  <Text style={styles.profileLineDataTitle}>Carro 1</Text>
                </View>
              )}
              {filteSelected == "2" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 10,
                  }}
                >
                  <Text style={styles.profileLineDataTitle}>Caronildo 2</Text>
                  <Text style={styles.profileLineDataTitle}>Rota 2</Text>
                  <Text style={styles.profileLineDataTitle}>Carro 2</Text>
                </View>
              )}
              {filteSelected == "3" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    marginTop: 10,
                  }}
                >
                  <Text style={styles.profileLineDataTitle}>Caronildo 3</Text>
                  <Text style={styles.profileLineDataTitle}>Rota 3</Text>
                  <Text style={styles.profileLineDataTitle}>Carro 3</Text>
                </View>
              )}
            </Collapsible>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

export default ProfileScreen

const styles2 = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 6,
    paddingHorizontal: 16,
    marginHorizontal: 2,
    borderRadius: 25,
    elevation: 3,
    backgroundColor: "#4D4C7D",
  },
  text: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "normal",
    letterSpacing: 0.25,
    color: "white",
  },
  text2: {
    fontSize: 12,
    lineHeight: 15,
    fontWeight: "normal",
    letterSpacing: 0.25,
    color: "white",
    marginHorizontal: 2,
  },
})
