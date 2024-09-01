import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { AuthContext } from './../../context/AuthContext';
import { Text, Card, Button, Divider } from '@rneui/themed';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

import axios from 'axios';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const ExchangeDetailsScreen = ({ navigation }) => {

    const route = useRoute();
    const { id } = route.params;

    const [exchange, setExchange] = useState([]);
    
    const [displayProposantDetails, setDisplayProposantDetails] = useState(false);
    const [displayAcceptantDetails, setDisplayAcceptantDetails] = useState(true);

    const { isLoggedIn, logout, token } = useContext(AuthContext);

    const api_url = process.env.EXPO_PUBLIC_API_URL;

    const acceptExchange =  (id) => {
      axios.put(api_url+'/echanges/echange/'+id+'/statut', {
        statut: 'accepter'
      })
      .then(res => {
        navigation.navigate('Exchange'); 
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

    const fetchExchange = () => {
      axios.get(api_url+'/echanges/'+id)
      .then(res => {
        setExchange(res.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

  // useFocusEffect(() => {
  //   fetchExchange();
  // })

  useEffect(() => {
    fetchExchange();
  }, [route]);

  return (
    <>
      <View
          style={{
              justifyContent: 'center',
              marginTop: 10,
              height: 50,
              alignItems: 'center',
          }}>
              <Text h1 style={{
                  fontWeight: 'bold',
                }}>Details échange</Text>
      </View>
      <ScrollView 
          contentContainerStyle={{
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
                      top: 400
                  }}
                  />
          <View style={{
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
                              backgroundColor: 'skyblue',
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
                          <Text style={styles.label1}>{ exchange?.utilisateur_acceptant_id?.nom } { exchange?.utilisateur_acceptant_id?.prenom } {'\n'}</Text>
                          <Text style={styles.label1}>{ exchange?.utilisateur_acceptant_id?.email } {'\n'}</Text>
                          <Text style={styles.label1}>{ moment(exchange?.date_proposition).format('MMMM D, YYYY') } {'\n'}</Text>
                          <Text style={styles.label1}>{ moment(exchange?.date_acceptation).format('MMMM D, YYYY') } {'\n'}</Text>
                          <View style={{
                              height: 30,
                              backgroundColor: 'skyblue',
                              justifyContent: 'center',
                              paddingHorizontal: 10,
                          }}>
                              <Text style={[
                                  {
                                      textAlign: 'right',
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
                                          marginBottom: 0
                                      }}>
                                          <Text>{ exchange?.objet_proposant ? exchange?.objet_proposant?.titre : '-' }</Text>
                                      </Card.Title>
                                  <Card.Divider />
                                  <Card.Image
                                      style={{
                                      height: 133,
                                      borderRadius: 100,
                                      width: 133,
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
                  // backgroundColor: 'lightgrey',
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
                                  <Text style={styles.label2}>Etat {'\n'}</Text>
                                  <View style={{
                                      height: 30,
                                      backgroundColor: 'black',
                                      justifyContent: 'center',
                                      paddingHorizontal: 10,
                                  }}>
                                      <Text style={{
                                              fontWeight: 'bold',
                                              color: 'white',
                                          }}>Valeur estimée
                                      </Text>
                                  </View>
                              </View>
                              <View style={{
                                  flex: 1,
                              }}>
                                  <Text style={styles.label1}>{ exchange?.objet_acceptant?.etat } {'\n'}</Text>
                                  <View style={{
                                      height: 30,
                                      backgroundColor: 'black',
                                      justifyContent: 'center',
                                      paddingHorizontal: 10,
                                  }}>
                                      <Text style={[
                                        //   styles.label1,
                                          {
                                              fontWeight: 'bold',
                                              color: 'white',
                                              textAlign: 'right',
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
                                  <Text style={styles.label2}>Etat {'\n'}</Text>
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
                                  <Text style={styles.label1}>{ exchange?.objet_proposant?.etat } {'\n'}</Text>
                                  <View style={{
                                      height: 30,
                                      backgroundColor: 'black',
                                      justifyContent: 'center',
                                      paddingHorizontal: 10,
                                  }}>
                                      <Text style={[
                                        //   styles.label1,
                                          {
                                              // backgroundColor: 'powderblue',
                                              fontWeight: 'bold',
                                              color: 'white',
                                              textAlign: 'right',
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

          <View style={{
                  // backgroundColor: 'lightgrey',
                  width: screenWidth,
                  marginBottom: 20,
                  alignItems: 'center',
              }}>
                <Button
                    title="Accepter"
                    size="lg"
                    onPress={() => acceptExchange(exchange?._id)}
                    buttonStyle={{
                      backgroundColor: 'black',
                      marginVertical: 10,
                      width:screenWidth-30,
                      // marginStart: 20,
                      // borderWidth: 2,
                      // borderColor: 'white',
                      // borderRadius: 30,
                    }}
                    titleStyle={{ fontWeight: 'bold' }}
                  />
          </View>

      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // height: screenHeight,
    flexDirection: 'row',
  },
  scrollView: {
    // maxHeight: 400,
  },
  label: {
    marginStart: 10,
    marginTop: 20,
    fontWeight: '300',
  },
  label1: {
    textAlign: 'right',
    fontWeight: '300',
    height: 40,
  },
  label2: {
    height: 40,
  }
});

export default ExchangeDetailsScreen;