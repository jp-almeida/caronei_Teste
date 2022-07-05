// @ts-nocheck
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Keyboard,
  TextInput
} from 'react-native'
import React, { useState } from 'react'

import tw from 'twrnc'
import { useDispatch } from 'react-redux'

import { store } from '../store'
import { useNavigation } from '@react-navigation/native'
import { DefaultButton } from '../components/Button'
import StarRating from 'react-native-star-rating'
import { Icon } from 'react-native-elements'
import { getUserData, rateUser } from '../requestsFunctions'
import { styles } from '../styles'


//chamar com {matricula: <matricula>, name: <nome do usuario>}

const RateUserScreen = ({ route }) => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const {matricula, name} = route.params

  const [comment, setComment] = useState(null)
  const [rating, setRating] = useState(null)
  const [parada, setParada] = useState("Parada")
  const [destino, setDestino] = useState("Destino")

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={{ backgroundColor: '#EFE9E5', flex: 1 }}>
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: 45
          }}
        >
          <View style={{}}>
            <Text
              style={{
                fontSize: 30,
                marginBottom: 30,
                maxWidth: 200,
                color: '#46458D'
              }}
            >
              Avalie sua carona
            </Text>
            {/* Esperando para saber como pegar o nome do motorista */}
            <Text style={{
              fontSize: 20,
              marginBottom: 30,
              maxWidth: 200,
              color: '#46458D'
            }}>{name}</Text>
            <View style={{flexDirection: "row", alignItems: "center", jusifyContent: "center" }}>
              <Icon name="room" type="material" size={15} color='gray' />
              <Text style={{textAlign: 'center', color: '#4D4C7D'}}>{parada}</Text>
              <Icon name="east" type="material" size={15} color='gray' />
              <Text style={{textAlign: 'center', color: '#4D4C7D'}}>{destino}</Text>
            </View>

            <Text 
            style={{
              fontSize: 20,
              color: '#46458D',
              marginTop: 15,
              textAlign: "center"
            }}>Avaliar</Text>

            <View style={{ jusifyContent: "center", alignItems: "center" }}>
              <StarRating
                disabled={false}
                rating={rating}
                maxStars={5}
                starSize={30}
                fullStarColor="#4D4C7D"
                starStyle={{}}
                selectedStar={(rating) => setRating(rating)}

              />
            </View>


            <Text style={{
              fontSize: 15,
              textAlign: "right",
              color: '#46458D'
            }}>Todos os comentários passarão por uma avaliação antes de publicados</Text>

            <Text style={{
              fontSize: 18,
              marginBottom: 30,
              maxWidth: 200,
              color: '#46458D'
            }}>Comentário:</Text>

            <TextInput
              placeholder="Escreva seu comentário aqui"
              styles={styles.textInput}
            />

            <View style={{ marginBottom: 15 }}>
              <DefaultButton title="Enviar" onPress={text => {
                if(rating){
                  let resp = rateUser(matricula, rating)
                }}} />
            </View>

            <View style={{ marginBottom: 300 }}>
              <DefaultButton title="Lembrar mais tarde" onPress={() => navigation.navigate('HomeScreen')} />
            </View>

            <View style={{}}>
              <DefaultButton title="Denunciar usuário" onPress={() => navigation.navigate('ReportScreen')} />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RateUserScreen