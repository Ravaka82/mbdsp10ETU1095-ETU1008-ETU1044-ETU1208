import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from './../../context/AuthContext';
import { Text, Card} from '@rneui/themed';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';

import axios from 'axios';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const HistoryDetailsScreen = ({ navigation }) => {

    const route = useRoute();
    const { id } = route.params;
    const [user, setUser] = useState();
    const [displayProposantDetails, setDisplayProposantDetails] = useState(false);
    const [displayAcceptantDetails, setDisplayAcceptantDetails] = useState(true);

    const [exchange, setExchange] = useState([]);

    const { isLoggedIn, logout, token } = useContext(AuthContext);

    const api_url = process.env.EXPO_PUBLIC_API_URL;

    useEffect(() => {
        axios.get(api_url+'/utilisateurs/me', {
            headers: {
                'Authorization': 'Bearer ' + token,
            }})
            .then(response => {
                setUser(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error.message);
            });
    }, []);



  useEffect(() => {
    axios.get(api_url+'/echanges/'+id)
    .then(res => {
      setExchange(res.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [route]);

//   useFocusEffect(() => {
//     axios.get(api_url+'/echanges/'+id)
//     .then(res => {
//       setExchange(res.data);
//     })
//     .catch(error => {
//       console.error('Error fetching data:', error);
//     });
//   });

  return (
    <>
    <View
        style={{
            // width: 300,
            justifyContent: 'center',
            marginTop: 10,
            height: 50,
            // paddingStart: 20,
            alignItems: 'center',
        }}>
            <Text h1 style={{
                fontWeight: 'bold',
              }}>Historique</Text>
    </View>
    <ScrollView 
        contentContainerStyle={{
            // height: screenHeight,
            alignItems: 'center',
        }}
        showsVerticalScrollIndicator={false}>
        <Icon 
            name="sync-alt" 
            size={60} 
            color="grey" 
            style={{
                position: 'absolute',
                zIndex: 1,
                // right: 163,
                top: 400
            }}
            />
        <View style={{
            // backgroundColor: 'lightgrey',
            width: screenWidth,
        }}>
            <Card>
                <Text h4 style={{
                        fontWeight: 'bold',
                      }}>Details</Text>
                <Card.Divider />
                <View style={styles.container}>
                    <View style={{
                        flex: 1,
                        }}>
                        <Text style={ styles.label2 }>Propriétaire {'\n'}</Text>
                        <Text style={ styles.label2 }>Email {'\n'}</Text>
                        <Text style={ styles.label2 }>Date de proposition {'\n'}</Text>
                        <Text style={ styles.label2 }>Date clotûre {'\n'}</Text>
                        <View style={{
                            height: 30,
                            // borderRadius: 10,
                            backgroundColor: exchange?.statut == 'accepter' ? 'lightgreen' : 'lightcoral',
                            // borderEndStartRadius: 10,
                            // borderStartStartRadius: 10,
                            justifyContent: 'center',
                            paddingHorizontal: 10,
                        }}>
                            <Text style={{
                                // backgroundColor: exchange?.statut == 'accepter' ? 'lightgreen' : 'lightcoral',
                                fontWeight: 'bold',
                            }}>Statut</Text>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                    }}>
                        {/* <Text style={styles.label}>Date de proposition</Text> */}
                            {/* <Text>{ exchange?.date_proposition }</Text> */}
                        <Text style={[
                            styles.label2,
                            {
                                textAlign: 'right',
                            }
                        ]}>{ exchange?.utilisateur_acceptant_id?.nom } { exchange?.utilisateur_acceptant_id?.prenom } {'\n'}</Text>
                        <Text style={[
                            styles.label2,
                            {
                                textAlign: 'right',
                            }
                        ]}>{ exchange?.utilisateur_acceptant_id?.email } {'\n'}</Text>
                        <Text style={[
                            styles.label2,
                            {
                                textAlign: 'right',
                            }
                        ]}>{ moment(exchange?.date_proposition).format('MMMM D, YYYY') } {'\n'}</Text>
                        <Text style={[
                            styles.label2,
                            {
                                textAlign: 'right',
                            }
                        ]}>{ moment(exchange?.date_acceptation).format('MMMM D, YYYY') } {'\n'}</Text>
                        <View style={{
                            height: 30,
                            // borderRadius: 10,
                            backgroundColor: exchange?.statut == 'accepter' ? 'lightgreen' : 'lightcoral',
                            // borderEndEndRadius: 10,
                            // borderStartEndRadius: 10,
                            justifyContent: 'center',
                            paddingHorizontal: 10,
                        }}>
                            <Text style={[
                                // styles.label1,
                                {
                                    // color: exchange?.statut == 'accepter' ? 'green' : 'red',
                                    textAlign: 'right',
                                    // backgroundColor: exchange?.statut == 'accepter' ? 'lightgreen' : 'lightcoral',
                                    // backgroundColor: exchange?.statut == 'accepter' ? 'lightgreen' : 'lightcoral',
                                    fontWeight: 'bold',
                                }
                                ]}>
                                { exchange?.statut }
                            </Text>
                        </View>
                    </View>
                </View>
            </Card>
        </View>
        <View style={styles.container}>
            <View style={{
                flex: 1, 
                // backgroundColor: 'red',
                }}>
                <TouchableOpacity onPress={() => {setDisplayAcceptantDetails(false); setDisplayProposantDetails(true)}}>
                    <Card>
                        <Card.Title style={{
                            height: 60,
                            // backgroundColor: 'red',
                            marginBottom: 0
                        }}>
                            {/* <Text h4>{ exchange?.objet_proposant?.titre } { exchange?.utilisateur_proposant_id?._id == user?._id ?? '[vous]'}</Text> */}
                            <Text>{ exchange?.objet_proposant ? exchange?.objet_proposant?.titre : '-' }</Text>
                            {/* {exchange?.utilisateur_proposant_id?._id} - 
                            {exchange?.utilisateur_acceptant_id?._id} =
                            {user?._id} */}
                        </Card.Title>
                    <Card.Divider />
                    <Card.Image
                        style={{ 
                        //   padding: 0,
                        height: 133,
                        borderRadius: 100,
                        width: 133,
                        // width: 300,
                        // backgroundColor: 'powderblue',
                        }}
                        source={{
                        uri: 
                            exchange?.objet_proposant?.image_url!='' && exchange?.objet_proposant != null ? exchange?.objet_proposant?.image_url : 'https://static.vecteezy.com/system/resources/thumbnails/009/312/127/small_2x/cube-3d-icon-model-cartoon-style-concept-render-illustration-free-png.png',
                            // 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                        }}
                    />
                    </Card>
                </TouchableOpacity>

            </View>
            <View style={{
                flex: 1, 
                // backgroundColor: 'darkorange'
                }}>
                <TouchableOpacity onPress={() => {setDisplayAcceptantDetails(true); setDisplayProposantDetails(false)}}>
                    <Card>
                        <Card.Title style={{
                            height: 60,
                            // backgroundColor: 'red',
                            marginBottom: 0
                        }}>
                            <Text>{ exchange?.objet_acceptant?.titre }</Text>
                        </Card.Title>
                        <Card.Divider />
                        <Card.Image
                            style={{ 
                            // padding: 0,
                            height: 133,
                            width: 133,
                            borderRadius: 100,
                            }}
                            source={{
                            uri: 
                                exchange?.objet_acceptant?.image_url!='' && exchange?.objet_acceptant != null ? exchange?.objet_acceptant?.image_url : 'https://static.vecteezy.com/system/resources/thumbnails/009/312/127/small_2x/cube-3d-icon-model-cartoon-style-concept-render-illustration-free-png.png',
                                // 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                            }}
                        />
                    </Card>
                </TouchableOpacity>
            </View>
        </View>

        { displayAcceptantDetails && 
            (exchange?.objet_acceptant ?
            <View style={{
                width: screenWidth,
                marginBottom: 20,
            }}>
                <Card>
                    <Text h4 style={{
                            fontWeight: 'bold',
                        }}>{ exchange?.objet_acceptant?.titre }
                    </Text>
                    <Card.Divider />
                    <View style={styles.container}>
                            <View style={{
                                flex: 1,
                                }}>
                                {/* <Text>Catégorie {'\n'}</Text> */}
                                <Text>Etat {'\n'}</Text>
                                <View style={{
                                    height: 30,
                                    backgroundColor: 'black',
                                    // borderEndStartRadius: 10,
                                    // borderStartStartRadius: 10,
                                    justifyContent: 'center',
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                            // backgroundColor: 'powderblue',
                                            fontWeight: 'bold',
                                            color: 'white',
                                        }}>Valeur estimée
                                    </Text>
                                </View>
                            </View>
                            <View style={{
                                flex: 1,
                            }}>
                                {/* <Text style={styles.label1}>{ exchange?.objet_acceptant?.categorie_id } {'\n'}</Text> */}
                                <Text style={styles.label1}>{ exchange?.objet_acceptant?.etat } {'\n'}</Text>
                                <View style={{
                                    height: 30,
                                    backgroundColor: 'black',
                                    // borderEndEndRadius: 10,
                                    // borderStartEndRadius: 10,
                                    justifyContent: 'center',
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={[
                                        styles.label1,
                                        {
                                            fontWeight: 'bold',
                                            color: 'white',
                                        }
                                        ]}>{ exchange?.objet_acceptant?.valeur_estimee }
                                    </Text>
                                </View>
                            </View>
                    </View>
                    <Text h4 style={{
                        marginTop: 50,
                        fontWeight: 'bold',
                        }}>Description</Text>
                    <Card.Divider />
                    <Text style={{ marginBottom: 10 }}>
                    { exchange?.objet_acceptant?.description }
                    </Text>
                </Card>
            </View>
            :
            <View style={{
                // backgroundColor: 'lightgrey',
                width: screenWidth,
                marginBottom: 20,
            }}>
                <Card>
                    <Text style={{
                        textAlign: 'center',
                    }}>Objet introuvable.</Text>
                </Card>
            </View>
            )
        }

        { displayProposantDetails && 
            (exchange?.objet_proposant ?
                <View style={{
                    // backgroundColor: 'lightgrey',
                    width: screenWidth,
                    marginBottom: 20,
                }}>
                    <Card>
                        <Text h4 style={{
                                fontWeight: 'bold',
                            }}>{ exchange?.objet_proposant?.titre }
                        </Text>
                        <Card.Divider />
                        <View style={styles.container}>
                            <View style={{
                                flex: 1,
                                }}>
                                {/* <Text>Catégorie {'\n'}</Text> */}
                                <Text>Etat {'\n'}</Text>
                                <View style={{
                                    height: 30,
                                    backgroundColor:'black',
                                    // borderEndStartRadius: 10,
                                    // borderStartStartRadius: 10,
                                    justifyContent: 'center',
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={{
                                            // backgroundColor: 'powderblue',
                                            fontWeight: 'bold',
                                            color: 'white',
                                        }}>Valeur estimée</Text>
                                </View>
                            </View>
                            <View style={{
                                flex: 1,
                            }}>
                                {/* <Text style={styles.label1}>{ exchange?.objet_acceptant?.categorie_id } {'\n'}</Text> */}
                                <Text style={styles.label1}>{ exchange?.objet_proposant?.etat } {'\n'}</Text>
                                <View style={{
                                    height: 30,
                                    backgroundColor: 'black',
                                    // borderEndStartRadius: 10,
                                    // borderStartStartRadius: 10,
                                    justifyContent: 'center',
                                    paddingHorizontal: 10,
                                }}>
                                    <Text style={[
                                        styles.label1,
                                        {
                                            // backgroundColor: 'powderblue',
                                            fontWeight: 'bold',
                                            color: 'white',
                                        }
                                        ]}>{ exchange?.objet_proposant?.valeur_estimee }</Text>
                                </View>
                            </View>

                        </View>
                        <Text h4 style={{
                            marginTop: 50,
                            fontWeight: 'bold',
                            }}>Description</Text>
                        <Card.Divider />
                        <Text style={{ marginBottom: 10 }}>
                        { exchange?.objet_proposant?.description }
                        </Text>
                    </Card>
                </View>
            :
                <View style={{
                    // backgroundColor: 'lightgrey',
                    width: screenWidth,
                    marginBottom: 20,
                }}>
                    <Card>
                        <Text style={{
                            textAlign: 'center',
                        }}>Objet introuvable.</Text>
                    </Card>
                </View>
            )
        }

    </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    // padding: 10,
    // backgroundColor: 'powderblue',
    flexDirection: 'row',
  },
  scrollView: {
    // maxHeight: 400,
  },
label1: {
    textAlign: 'right',
    fontWeight: '300',
  },
  label2: {
    height: 40,
  }
});

export default HistoryDetailsScreen;