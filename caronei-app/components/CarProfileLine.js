import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput
} from 'react-native'
import { Dialog, Icon } from 'react-native-elements'
import React from 'react'
import EditButton from './buttons/EditButton'
import { store } from '../store'
import config from '../config/config.json'
import { updateCar, deleteCar } from '../requestsFunctions'
import DeleteButton from './buttons/DeleteButton'
import { styles } from '../styles'

const CarProfileLine = props => {
  let placa = props.carro.placa
  let modelo = props.carro.modelo
  let cor = props.carro.cor

  return (
    <View>
      <Text style={{ color: '#46458D' }}>
        {props.carro.placa} {props.carro.modelo} {props.carro.cor}
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <EditButton element={props.carro} editFunction={props.editFunction} />
        <DeleteButton
          deleteFunction={() => {
            deleteCar(props.carro.placa)
            props.deleteFunction()
          }}
        />
      </View>
      <Dialog
        visible={props.carro.isEditing}
        onTouchOutside={props.editFunction}
        overlayStyle={styles.dialog}
      >
        <Dialog.Title title="Editar carro" titleStyle={styles.dialogTitle} />
        <Text>Placa</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={props.carro.placa}
          onChangeText={text => {
            placa = text
          }}
        />
        <Text>Modelo</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={props.carro.modelo}
          onChangeText={text => {
            modelo = text
          }}
        />
        <Text>Cor</Text>
        <TextInput
          style={styles.textInput}
          defaultValue={props.carro.cor}
          onChangeText={text => {
            cor = text
          }}
        />
        <Dialog.Button
          title="Adicionar"
          style={styles.button}
          onPress={() => {
            let resp = updateCar(placa, props.carro.placa, modelo, cor)
            if (resp) {
              props.editFunction({
                ...props.carro,
                placa: placa,
                modelo: modelo,
                cor: cor,
                isEditing: false,
                changed: true
              })
            }
          }}
        />
        <Dialog.Button
          title="Cancelar"
          onPress={() =>
            props.editFunction({
              ...props.carro,
              isEditing: false
            })
          }
        />
      </Dialog>
    </View>
  )
}

export default CarProfileLine
