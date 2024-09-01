import React, { useCallback, useContext, useEffect, useState } from 'react';
import { View, ScrollView, Dimensions } from 'react-native';
import { AuthContext } from './../context/AuthContext';
import { Text, Card, Button } from '@rneui/themed';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const { isLoggedIn, logout, token } = useContext(AuthContext);
  const [user, setUser] = useState(null);
  const [objects, setObjects] = useState([]);


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

      fetchAllObjects();
    }, []);

    const fetchAllObjects = () => {
      axios.get(api_url+'/objets', {
        headers: {
          'Authorization': 'Bearer ' + token,
        }})
        .then(response => {
          setObjects(response.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error.message);
        });
    }

    useFocusEffect (
      useCallback(() => {
        fetchAllObjects();
      }, [])
    )

  return (
    <>
      <View style={{
          flex: 1,
          height: screenHeight,
          // alignItems: 'center',
      }}>
          <View
              style={{
                  justifyContent: 'center',
                  marginVertical: 20,
                  height: 60,
                  alignItems: 'center',
              }}>
                <View>
                  <Icon
                      name="account-circle" 
                      size={40}
                      // color="grey" 
                      style={{
                          // position: 'absolute',
                          // padding: 10,
                          // backgroundColor: 'red',
                          zIndex: 1,
                          top: -2
                      }}
                      />
                </View>
                <View>
                  <Text h4 style={{
                      fontWeight: 'bold',
                    }}>
                      {user?.nom} {user?.prenom}
                  </Text>
                </View>
          </View>
          <ScrollView>
            { objects.length != 0 ?
            <View style={{
              // flex: 1,
              // alignItems: 'center',
              // justifyContent: 'center',
              marginTop: 20,
              marginBottom: 20,
              // backgroundColor: 'powderblue',
            }}>
                {objects.map((object, index) => (
                  object.utilisateur_id._id != user._id && (
                <Card key={index}>
                    <Card.Title>
                      <View style={{
                        width: screenWidth,
                      }}>
                          <Icon
                            name="account-circle" 
                            size={30}
                            // color="grey" 
                            style={{
                                position: 'absolute',
                                // padding: 10,
                                // backgroundColor: 'red',
                                zIndex: 1,
                                top: -2
                            }}
                            />
                        <Text h4 style={{ fontWeight: 'bold', marginStart:40 }}>
                          { object?.utilisateur_id?.prenom }
                        </Text>
                      </View>
                      <View style={{
                        width: screenWidth,
                      }}>
                        <Text style={{
                          marginStart: 40,
                          fontWeight: 'bold',
                        }}>{ object?.titre }</Text>
                      </View>
                    </Card.Title>
                    <Card.Divider />
                    <Card.Image
                      style={{ 
                        padding: 0,
                        height: 250,
                        // width: 300,
                        // backgroundColor: 'powderblue',
                      }}
                      source={{
                        uri: 
                          object?.image_url!='' ? object.image_url : 'https://static.vecteezy.com/system/resources/thumbnails/009/312/127/small_2x/cube-3d-icon-model-cartoon-style-concept-render-illustration-free-png.png',
                          // 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                      }}
                    />


                    <Text h4 style={{
                      fontWeight: 'bold',
                    }}>A propos</Text>
                    <Card.Divider />
                    <View style={{
                      flex: 1,
                      flexDirection: 'row',
                    }}>
                        <View style={{
                          flex: 1,
                          // backgroundColor: 'powderblue',
                        }}>
                          <Text>Categorie {'\n'}</Text>
                          <Text>Etat {'\n'}</Text>
                          <View style={{
                              height: 30,
                              backgroundColor: 'black',
                              justifyContent: 'center',
                              paddingHorizontal: 10,
                          }}>
                              <Text style={{
                                fontWeight: 'bold',
                                color: 'white',
                              }}>
                                Valeur estimée
                              </Text>
                          </View>
                        </View>
                        <View style={{
                          flex: 1,
                          // backgroundColor: 'skyblue',
                        }}>
                          <Text style={{
                            textAlign: 'right',
                            fontWeight: '300',
                          }}>
                            {object?.categorie_id?.nom} {'\n'}
                          </Text>
                          <Text style={{
                            textAlign: 'right',
                            fontWeight: '300',
                          }}>
                            {object?.etat} {'\n'}
                          </Text>
                          <View style={{
                              height: 30,
                              // borderRadius: 10,
                              backgroundColor: 'black',
                              // borderEndStartRadius: 10,
                              // borderStartStartRadius: 10,
                              justifyContent: 'center',
                              paddingHorizontal: 10,
                          }}>
                            <Text style={{
                              textAlign: 'right',
                              fontWeight: 'bold',
                              color: 'white',
                            }}>
                              {object?.valeur_estimee}
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
                      {object.description}
                    </Text>

                    <Button
                        title="Echanger"
                        size="lg"
                        onPress={() => navigation.navigate('AddExchange', { objet_acceptant: object })}
                        buttonStyle={{
                          backgroundColor: 'black',
                          // marginVertical: 10,
                          // width:screenWidth-30,
                          // marginStart: 20,
                          // borderWidth: 2,
                          // borderColor: 'white',
                          // borderRadius: 30,
                        }}
                        titleStyle={{ fontWeight: 'bold' }}
                      />
                </Card>
                )))}
            </View>
            : <Text style={{
              textAlign: 'center',
            }}>Aucun objet disponible.</Text>}
          </ScrollView>
      </View>
    </>
  );
};

export default HomeScreen;