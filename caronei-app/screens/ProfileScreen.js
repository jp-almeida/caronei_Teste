import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native'
import React, { useState } from 'react'
import { Image, Keyboard } from 'react-native'
import tw from 'twrnc'
import { store } from '../store'
import { useNavigation } from '@react-navigation/native'
import config from '../config/config.json'
import { Icon } from 'react-native-elements'
import ProfileData from '../components/ProfileData'
import Collapsible from 'react-native-collapsible'
import { Picker } from '@react-native-community/picker'
import StarRating from 'react-native-star-rating'
import RNDateTimePicker from '@react-native-community/datetimepicker'
import EditButton from '../components/buttons/EditButton'
import VisibilityButton from '../components/buttons/VisibilityButton'
import ExpandButton from '../components/buttons/ExpandButton'
import { Dialog } from 'react-native-elements'
import CarProfileLine from '../components/CarProfileLine'
import { getCars, addCar, getUserData } from '../requestsFunctions'

//gambiarra porque as portas não estavam batendo
const url = config.urlRootNode.replace(
  config.urlRootNode.split(':')[2],
  config.backend_port
)
var cars = []

function getGenderName(gender) {
  switch (gender) {
    case 'M':
      return 'Masculino'
    case 'F':
      return 'Feminino'
    case 'O':
      return 'Outro'
    case 'N':
      return 'Não quero informar'
    default:
      return null
  }
}

const ProfileScreen = () => {
  const [name, setName] = useState(null)
  const [changed, setChanged] = useState(false)
  const [rating, setRating] = useState(null)
  const [experience, setExperience] = useState(null)
  

  const [email, setEmail] = useState({
    data: null,
    visibility: null,
    isEditing: false
  })
  const [gender, setGender] = useState({
    value: null,
    data: null,
    visibility: null,
    isEditing: false,
    changed: false
  })
  const [phone, setPhone] = useState({
    data: null,
    visibility: null,
    changed: false,
    isEditing: false
  })
  const [birth, setBirth] = useState({
    data: null,
    visibility: null,
    isEditing: false,
    changed: false
  })
  const [cars, setCars] = useState([])
  const [selectedGender, setSelectedGender] = useState()

  async function getData() {
    //pega os dados do banco de dados e preenche as variaveis

    const response = await getUserData()

    setName(response.name)
    setRating(response.rating)
    setExperience(response.experience)
    setEmail({
      ...email,
      data: response.email,
      visibility: response.emailVisibility
    })
    setGender({
      ...gender,
      value: response.gender,
      data: getGenderName(response.gender),
      visibility: response.genderVisibility,
      changed: false
    })
    setPhone({
      ...phone,
      visibility: response.phoneVisibility,
      changed: false
    })
    setBirth({
      ...birth,
      visibility: response.birthVisibility,
      data: response.birth ? new Date(response.birth) : response.birth //converte para objeto de data (chega do back em string)
    })
    setSelectedGender(response.gender)
  }
  async function updateUserData() {
    //gambiarra porque as portas não estavam batendo
    let jsonBody = { matricula: store.getState().auth.matricula.toString() }

    if (email.changed) {
      jsonBody.email = email.data
      jsonBody.emailVisibility = email.visibility
      setEmail({
        ...email,
        changed: false
      })
    }

    if (gender.changed) {
      jsonBody.gender = gender.value
      jsonBody.genderVisibility = gender.visibility
      setGender({
        ...gender,
        isEditing: false,
        changed: false
      })
    }

    if (phone.changed) {
      jsonBody.phone = phone.data
      jsonBody.phoneVisibility = phone.visibility
      setPhone({
        ...phone,
        changed: false
      })
    }

    if (birth.changed) {
      jsonBody.birth = birth.data
      jsonBody.birthVisibility = birth.visibility
      setBirth({
        ...birth,
        changed: false
      })
    }

    let reqs = await fetch(url + '/update', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsonBody)
    })
    let resp = await reqs.json()

    setChanged(false)
  }

  async function updateCars(){
    let carros = await getCars()
    let carros2 = []
    await carros.forEach(car => {
      carros2.push( {
        ...car,
        isEditing: false,
        changed: false
      })
    })
    setCars(await carros2)
    
  }
  async function addACar(placa, modelo, cor){
    await addCar(placa, modelo, cor)
    updateCars() //atualiza os carros
  }
  if (!name) {
    getData()
    updateCars()
  }

  const [isCollapsedProfile, setCollapsedProfile] = useState(false)
  const [isCollapsedCars, setCollapsedCars] = useState(false)
  const [isAddingCar, setAddingCar] = useState(false)

  let placa, modelo, cor
  
  
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={{ marginTop: 40, marginLeft: 30 }}>
          <Image
            style={{
              width: 80,
              height: 80,
              resizeMode: 'contain'
            }}
            source={require('../images/profile_picture.png')}
          />
          <Text>{name}</Text>

          {!rating && <Text>Você ainda não foi avaliado</Text> //caso ainda não tenha avaliações
          }

          {rating && (
            <View style={{ width: 100 }}>
              <Text>{rating}</Text>
              <StarRating
                disabled={true}
                rating={rating}
                starSize={30}
                fullStarColor="#4D4C7D"
                starStyle={{}}
              />
            </View>
          )}

          <View style={{}}>
            <ExpandButton
              isCollapsed={isCollapsedProfile}
              collapseFunction={setCollapsedProfile}
            />

            <Text>Meus dados</Text>

            <Collapsible collapsed={isCollapsedProfile}>
              <ProfileData
                title="Email"
                element={email}
                editFunction={setEmail}
                changeFunction={setChanged}
              />

              <Text>Matrícula: {store.getState().auth.matricula}</Text>

              <ProfileData
                title="Número"
                element={phone}
                editFunction={setPhone}
                changeFunction={setChanged}
              />

              <Text>Data de nascimento</Text>
              <Text>
                {birth.data
                  ? birth.data.getDate() +
                    '/' +
                    (birth.data.getMonth() + 1) +
                    '/' +
                    birth.data.getFullYear()
                  : '(Informe sua data de nascimento)'}
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
                      isEditing: false
                    })
                    setChanged(true)
                  }}
                />
              )}

              <Text>Gênero</Text>

              <EditButton
                element={gender}
                editFunction={setGender}
                changeFunction={setChanged}
              />

              {!gender.isEditing && ( //se não tiver editando, mostra o genero como texto
                <Text>
                  {gender.data ? gender.data : '(Informe seu gênero)'}
                </Text>
              )}

              <VisibilityButton
                element={gender}
                changeFunction={setChanged}
                editFunction={setGender}
              />

              {gender.isEditing && ( //se tiver editando, mostra o genero como o picker select
                <Dialog>
                    <Dialog.Title title="Editar gênero"/>
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
                    <Dialog.Button title="Salvar" onPress={() => {
                        setGender({
                            ...gender,
                            value: selectedGender,
                            data: getGenderName(selectedGender),
                            isEditing: false,
                            changed: true
                        })
                        setChanged(true)
                    }}/>
                    <Dialog.Button title="Cancelar" onPress={() => {
                        setSelectedGender(gender.data)
                        setGender({
                            ...gender,
                            isEditing: false
                        })
                    }}/>
                </Dialog>
              )}
              {changed && ( //caso tenha alterações, mostrar o botão de salvar alterações
                <TouchableOpacity style={{}} onPress={updateUserData}>
                  <Text style={{}}>Salvar alterações</Text>
                </TouchableOpacity>
              )}
            </Collapsible>

            <ExpandButton
              isCollapsed={isCollapsedCars}
              collapseFunction={setCollapsedCars}
            />

            <Text>Meus carros</Text>
            <TouchableOpacity
              style={{}}
              onPress={() => {
                setAddingCar(!isAddingCar)
              }}
            >
              <Icon name="add" type="material" size={15} />
            </TouchableOpacity>

            <Collapsible collapsed={isCollapsedCars}>
              <Dialog
                visible={isAddingCar}
                onTouchOutside={() => setAddingCar(false)}
              >
                <Dialog.Title title="Adicionar um carro" />
                <Text>Placa</Text>
                <TextInput
                  style={{}}
                  onChangeText={text => {
                    placa = text
                  }}
                />
                <Text>Modelo</Text>
                <TextInput
                  style={{}}
                  onChangeText={text => {
                    modelo = text
                  }}
                />
                <Text>Cor</Text>
                <TextInput
                  style={{}}
                  onChangeText={text => {
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
              <Text>Placa | Modelo | Cor</Text>
              {cars.map(c => (
                <CarProfileLine
                    key={c.placa}
                  carro={c}
                  editFunction={(value) => {
                    let cars_copia = [...cars] //copia do array (para poder modificar)
                    let idx = cars
                      .map(car => {
                        return car.placa
                      })
                      .indexOf(c.placa) //indice do carro no array
                    cars_copia[idx] = value
                    setCars(cars_copia)
                  }}
                />
              ))}
            </Collapsible>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  )
}

export default ProfileScreen
