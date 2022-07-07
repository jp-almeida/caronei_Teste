import { Text, View, SafeAreaView, Image, FlatList } from "react-native"
import React, { useState } from "react"
import tw from "twrnc"
import { getPublicData, getUserData } from "../requestsFunctions"
import { styles } from "../styles"
import StarRating from "react-native-star-rating"
import ExpandButton from "../components/buttons/ExpandButton"
import Collapsible from "react-native-collapsible"
import { Icon } from "react-native-elements"

const UserScreen = ({ route }) => {
  const [user, setUser] = useState({})
  const { matricula } = route.params
  const [isCollapsedProfile, setCollapsedProfile] = useState(false)

  async function loadData(matricula) {
    let response = await getPublicData(matricula)
    setUser(await response)
  }
  if (!user.name) {
    loadData(matricula)
  }
  const data = [
    {
      remetente: "João da Silva",
      comentario: "Ótimo motorista! =)",
    },
    {
      remetente: "João da Silva",
      comentario: "Ótimo motorista! =)",
    },
    {
      remetente: "João da Silva",
      comentario: "Ótimo motorista! =)",
    },
    {
      remetente: "João da Silva",
      comentario: "Ótimo motorista! =)",
    },
    {
      remetente: "João da Silva",
      comentario: "Ótimo motorista! =)",
    },
    {
      remetente: "João da Silva",
      comentario: "Ótimo motorista! =)",
    },
    {
      remetente: "João da Silva",
      comentario: "Ótimo motorista! =)",
    },
    {
      remetente: "João da Silva",
      comentario: "Ótimo motorista! =)",
    },
    {
      remetente: "João da Silva",
      comentario: "Ótimo motorista! =)",
    },
    {
      remetente: "João da Silva",
      comentario: "Ótimo motorista! =)",
    },
    {
      remetente: "João da Silva",
      comentario: "Ótimo motorista! =)",
    },
    {
      remetente: "João da Silva",
      comentario: "Ótimo motorista! =)",
    },
  ]
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={{ height: "40%" }}>
        <View style={{ backgroundColor: "#EFE9E5", flex: 1 }}>
          <View style={{ marginTop: 40, marginLeft: 30 }}>
            {/* HEADER DO PERFIL */}
            <View style={styles.userHeaderView}>
              <Image
                style={{
                  width: 80,
                  height: 80,
                  resizeMode: "contain",
                }}
                source={require("../images/profile_picture.png")}
              />
              <Text style={styles.userHeaderName}>{user.name}</Text>
            </View>
            {/* AVALIAÇÃO */}

            {user.avaliacao ? (
              <View style={{ width: 100 }}>
                <Text style={{ color: "#46458D" }}>{user.avaliacao}</Text>
                <StarRating
                  disabled={true}
                  rating={user.avaliacao}
                  starSize={30}
                  fullStarColor="#4D4C7D"
                  starStyle={{}}
                />
              </View>
            ) : (
              <Text>Usuário ainda não avaliado</Text>
            )}
            <View style={styles.profileSectionHeader}>
              <ExpandButton
                isCollapsed={isCollapsedProfile}
                collapseFunction={setCollapsedProfile}
              />
              <Text style={styles.profileSectionTitle}>Dados</Text>
            </View>

            <Collapsible collapsed={isCollapsedProfile}>
              {user.matricula && (
                <View style={styles.profileLine}>
                  <Text style={styles.profileLineDataTitle}>Matrícula: </Text>
                  <Text style={styles.profileLineData}>{user.matricula}</Text>
                </View>
              )}
              {user.email && (
                <View style={styles.profileLine}>
                  <Text style={styles.profileLineDataTitle}>Email: </Text>
                  <Text style={styles.profileLineData}>{user.email}</Text>
                </View>
              )}
              {user.gender && (
                <View style={styles.profileLine}>
                  <Text style={styles.profileLineDataTitle}>Gênero: </Text>
                  <Text style={styles.profileLineData}>{user.gender}</Text>
                </View>
              )}
              {user.phone && (
                <View style={styles.profileLine}>
                  <Text style={styles.profileLineDataTitle}>Telefone: </Text>
                  <Text style={styles.profileLineData}>{user.phone}</Text>
                </View>
              )}
              {user.birth && (
                <View style={styles.profileLine}>
                  <Text style={styles.profileLineDataTitle}>Nascimento: </Text>
                  <Text style={styles.profileLineData}>{user.birth}</Text>
                </View>
              )}
            </Collapsible>
          </View>
        </View>
      </View>
      <View style={{ height: "60%", backgroundColor: "#EFE9E5" }}>
        <View>
          <Text
            style={{
              color: "#46458D",
              fontSize: 30,
              marginLeft: "6%",
            }}
          >
            Comentários
          </Text>
        </View>
        <View
          style={{
            borderWidth: 2,
            borderColor: "#46458D",
            padding: 5,
            backgroundColor: "#e6e6e6",
            borderRadius: 5,
            marginHorizontal: "6%",
            height: "85%",
          }}
        >
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={(item) => (
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <View style={{ width: "20%", marginTop: "3%" }}>
                    <Icon name="account-circle" type="material" size={30} />
                  </View>
                  <View style={{ width: "80%" }}>
                    <Text
                      style={{
                        color: "#46458D",
                        fontSize: 20,
                      }}
                    >
                      {item.item.remetente}
                    </Text>
                    <Text
                      style={{
                        color: "#46458D",
                        fontSize: 18,
                      }}
                    >
                      {item.item.comentario}
                    </Text>
                  </View>
                </View>
                <View style={{ height: "2%" }} />
              </View>
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

export default UserScreen
