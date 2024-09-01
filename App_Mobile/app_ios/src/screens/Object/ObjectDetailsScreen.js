import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller, set } from 'react-hook-form';
import { AuthContext } from './../../context/AuthContext';
import { Text, Input, Card, Button } from '@rneui/themed';
import { useRoute } from '@react-navigation/native';

import axios from 'axios';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const ObjectDetailsScreen = ({ navigation }) => {

    const route = useRoute();
    const { id } = route.params;

    const [object, setObject] = useState([]);

    const { isLoggedIn, logout, token } = useContext(AuthContext);

    const api_url = process.env.EXPO_PUBLIC_API_URL;

    const removeObject = () => {
      axios.delete(api_url+'/objets/'+id)
      .then(res => {
          navigation.navigate('Object');
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

  useEffect(() => {
    axios.get(api_url+'/objets/DetailsObjet/'+id)
    .then(res => {
        setObject(res.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, [route]);

  return (
    <View style={styles.container}>
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
              }}>Details</Text>
      </View>
      <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
              >
                { object.length != 0 ?
                <View style={{
                  // marginHorizontal: 20
                  marginBottom: 20,
                }}>
                    <Card>
                      <Card.Title><Text h4>{ object?.titre }</Text></Card.Title>
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
                  </Card>
                  <View style={{
                          // backgroundColor: 'lightgrey',
                          width: screenWidth,
                          marginBottom: 20,
                          alignItems: 'center',
                      }}>
                        <Button
                            title="Retirer"
                            size="lg"
                            onPress={() => removeObject()}
                            buttonStyle={{
                              backgroundColor: 'red',
                              marginVertical: 10,
                              width:screenWidth-30,
                            }}
                            titleStyle={{ fontWeight: 'bold' }}
                          />
                  </View>
                </View>
                :
                <Text>Aucun objet trouvé.</Text>
                }
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: 'center',
    height: screenHeight,
    // padding: 16,
    // backgroundColor: 'powderblue',
  },
  scrollView: {
    // maxHeight: 400,
  },
});

export default ObjectDetailsScreen;