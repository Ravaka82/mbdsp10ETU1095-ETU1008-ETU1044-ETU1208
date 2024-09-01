import React, { useContext, useEffect, useState, useCallback } from 'react';
import { View, Dimensions, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useForm, Controller, set } from 'react-hook-form';
import { AuthContext } from './../../context/AuthContext';
import { Text, Input, CheckBox, Button, Card } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import axios from 'axios';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const AddExchangeScreen = ({ navigation }) => {

    const route = useRoute();
    const { objet_acceptant } = route.params;

    const [userObjects, setUserObjects] = useState([]);
    const [myObject, setMyObject] = useState(null);

    const { isLoggedIn, logout, token } = useContext(AuthContext);

    const api_url = process.env.EXPO_PUBLIC_API_URL;

    const { control, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = data => {
        // console.log(data);
        axios.get(api_url+'/utilisateurs/me', {
          headers: {
            'Authorization': 'Bearer ' + token,
          }})
          .then(response => {
                // console.log(response.data._id);
                // console.log(data.user_object);
                // console.log(objet_acceptant._id);
                axios.post(api_url+'/echanges', {
                    "utilisateur_proposant_id": response.data._id,
                    "objet_proposant": data.user_object,
                    "objet_acceptant": objet_acceptant._id
                })
                .then(response => {
                    navigation.navigate('Home', {
                        refresh: Math.random(),
                    });
                })
                .catch(error => {
                    console.error('Error fetching data:', error.message);
                });
          })
          .catch(error => {
            console.error('Error fetching data:', error.message);
          });
      }

    const handleMyObjectChange = (onChange) => (value) => {
        // console.log(value);
        axios.get(api_url+'/objets/DetailsObjet/'+value)
        .then(res => {
            // console.log(res.data);
            setMyObject(res.data);
        })
        .catch(error => {
            setMyObject(null);
          console.error('Error fetching data:', error);
        });
        
        // Call the original onChange to update the form state
        onChange(value);
    };

  const getUserObjects = () => {
    axios.get(api_url+'/utilisateurs/me', {
      headers: {
        'Authorization': 'Bearer ' + token,
      }})
      .then(response => {
        axios.get(api_url+'/objets/utilisateur/'+response.data._id)
        // axios.get(api_url+'/objets')
        .then(res => {
            setUserObjects(res.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    }

    useEffect(() => {
        getUserObjects();
    }, []);

  return (
    <View style={{
        flex: 1,
        // alignItems: 'center',
        // justifyContent: 'center',
        height: screenHeight,
        // padding: 16,
        // backgroundColor: 'powderblue',
    }}>
        <View
            style={{
                // width: 300,
                justifyContent: 'center',
                marginTop: 10,
                height: 50,
                paddingStart: 20,
            }}>
                <Text h1 style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                }}>Echanger</Text>
        </View>
        <ScrollView 
                style={styles.scrollView} 
                contentContainerStyle={{
                    // height: screenHeight,
                    alignItems: 'center',
                }}
                showsVerticalScrollIndicator={false}
              >
                <Icon 
                    name="sync-alt" 
                    size={50} 
                    color="grey" 
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                        right: 172,
                        top: 155
                    }}
                    />
                    <View style={styles.container}>
                        <View style={{
                            flex: 1, 
                            // backgroundColor: 'red',
                            }}>
                            {/* <TouchableOpacity onPress={() => {setDisplayAcceptantDetails(false); setDisplayProposantDetails(true)}}> */}
                                <Card>
                                    <Card.Title style={{
                                        height: 60,
                                        // backgroundColor: 'red',
                                        marginBottom: 0
                                    }}>
                                        {/* <Text h4>{ exchange?.objet_proposant?.titre } { exchange?.utilisateur_proposant_id?._id == user?._id ?? '[vous]'}</Text> */}
                                        <Text>{ objet_acceptant?.titre } {'\n'} </Text>
                                        <View style={{
                                        // color: 'gray',
                                        backgroundColor: 'black',
                                        borderRadius: 15,
                                        // padding: 1,
                                        paddingHorizontal: 10,
                                        // marginRight: 5,
                                        }}>
                                            <Text style={{
                                                // backgroundColor: 'black',
                                                color: 'white',

                                            }}>
                                                { objet_acceptant?.valeur_estimee }
                                            </Text>
                                        </View>
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
                                            objet_acceptant?.image_url!='' && objet_acceptant != null ? objet_acceptant?.image_url : 'https://static.vecteezy.com/system/resources/thumbnails/009/312/127/small_2x/cube-3d-icon-model-cartoon-style-concept-render-illustration-free-png.png',
                                            // 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                        }}
                                    />
                                </Card>
                            {/* </TouchableOpacity> */}

                        </View>
                        <View style={{
                            flex: 1, 
                            // backgroundColor: 'darkorange'
                            }}>
                                {/* <Card> */}
                                    <Controller
                                        control={control}
                                        rules={{
                                        required: true,
                                        }}
                                        render={({ field: { onChange, onBlur, value } }) => (
                                        
                                        <View style={{
                                            // backgroundColor: 'white',
                                            marginTop: 70,
                                        }}>
                                            <Picker
                                                selectedValue={value}
                                                onValueChange={handleMyObjectChange(onChange)}
                                            >
                                                <Picker.Item label="Mon objet" value="" />
                                                {userObjects.map((obj, index) => (
                                                <Picker.Item key={obj._id} label={ obj.titre } value={ obj._id } />
                                                ))}
                                            </Picker>
                                        </View>
                                        )}
                                        name="user_object"
                                        defaultValue=""
                                    />
                                {/* </Card> */}
                        </View>
                    </View>

                    { myObject != null ?
                        <View style={{
                                width: screenWidth,
                                marginBottom: 20,
                            }}>
                            <Card>
                                <Text h4 style={{
                                        fontWeight: 'bold',
                                    }}>{ myObject?.titre }
                                </Text>
                                <Card.Divider />
                                <View style={{
                                    alignItems: 'center',
                                }}>
                                <Card.Image
                                            style={{ 
                                            //   padding: 0,
                                            height: 133,
                                            width: 133,
                                            // width: 300,
                                            // backgroundColor: 'powderblue',
                                            }}
                                            source={{
                                            uri: 
                                                myObject?.image_url!='' && myObject != null ? myObject?.image_url : 'https://static.vecteezy.com/system/resources/thumbnails/009/312/127/small_2x/cube-3d-icon-model-cartoon-style-concept-render-illustration-free-png.png',
                                                // 'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
                                            }}
                                        />
                                </View>
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
                                            <Text style={styles.label1}>{ myObject?.etat } {'\n'}</Text>
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
                                                    ]}>{ myObject?.valeur_estimee }
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
                                { myObject?.description }
                                </Text>
                            </Card>
                            <Button
                                title="Echanger"
                                onPress={handleSubmit(onSubmit)}
                                size="lg"
                                buttonStyle={{
                                    backgroundColor: 'black',
                                    // borderRadius: 30,
                                    marginHorizontal: 15,
                                    marginBottom: 20,
                                    marginTop: 20,
                                    // width: screenWidth-30,
                                }}
                                />
                        </View>
                    :
                        <View>
                            <Text>Choisissez un objet à échanger</Text>
                        </View>
                    }

                {/* </View> */}
        </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  scrollView: {
    // maxHeight: 400,
  },
  label1: {
    textAlign: 'right',
    fontWeight: '300',
  }
});

export default AddExchangeScreen;