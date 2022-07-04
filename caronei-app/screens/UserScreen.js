import { Text, View, SafeAreaView, Image } from 'react-native'
import React, { useState } from 'react'
import tw from 'twrnc'
import { getPublicData, getUserData } from '../requestsFunctions'
import { styles } from '../styles'
import StarRating from 'react-native-star-rating'

const UserScreen = () => {
    const [user, setUser] = useState({})

    async function loadData(matricula) {
        let response = await getPublicData(matricula)
        setUser(response)
    }
    if (!user.name) {
        loadData(1)
    }
    return (
        <SafeAreaView style={tw`bg-white h-full`}>
            <View style={{ backgroundColor: '#EFE9E5', flex: 1 }}>
                <View style={{ marginTop: 40, marginLeft: 30 }}>

                    {/* HEADER DO PERFIL */}
                    <View style={styles.userHeaderView}>
                        <Image
                            style={{
                                width: 80,
                                height: 80,
                                resizeMode: 'contain'
                            }}
                            source={require('../images/profile_picture.png')}
                        />
                        <Text style={styles.userHeaderName}>{user.name}</Text>
                    </View>
                        {/* AVALIAÇÃO */}

                        {user.avaliacao ?
                            <View style={{ width: 100 }}>
                                <Text style={{ color: '#46458D' }}>{user.avaliacao}</Text>
                                <StarRating
                                    disabled={true}
                                    rating={user.avaliacao}
                                    starSize={30}
                                    fullStarColor="#4D4C7D"
                                    starStyle={{}}
                                />
                            </View>
                            : <Text>Usuário ainda não avaliado</Text>
                        }

                        {user.matricula &&
                            <View style={styles.profileLine}>
                                <Text style={styles.profileLineDataTitle}>Matrícula: </Text>
                                <Text style={styles.profileLineData}>{user.matricula}</Text>
                            </View>
                        }
                        {user.email &&
                            <View style={styles.profileLine}>
                                <Text style={styles.profileLineDataTitle}>Email: </Text>
                                <Text style={styles.profileLineData}>{user.email}</Text>
                            </View>
                        }
                        {user.gender &&
                            <View style={styles.profileLine}>
                                <Text style={styles.profileLineDataTitle}>Gênero: </Text>
                                <Text style={styles.profileLineData}>{user.gender}</Text>
                            </View>
                        }
                        {user.birth &&
                            <View style={styles.profileLine}>
                                <Text style={styles.profileLineDataTitle}>Nascimento: </Text>
                                <Text style={styles.profileLineData}>{user.birth}</Text>
                            </View>
                        }

                    </View>
                </View>
        </SafeAreaView>
    )
}

export default UserScreen