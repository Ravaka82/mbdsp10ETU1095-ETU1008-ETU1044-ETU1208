import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Button, View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from './../../context/AuthContext';
import { Text, SearchBar, ListItem, Avatar, FAB } from '@rneui/themed';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';

const { height: screenHeight } = Dimensions.get('window');

const ObjectScreen = ({ navigation }) => {
  const [objects, setObjects] = useState([]);
  const [search, setSearch] = useState('');

  const { isLoggedIn, logout, token } = useContext(AuthContext);

  const api_url = process.env.EXPO_PUBLIC_API_URL;

  const updateSearch = (search) => {
    setSearch(search);

    if (search == '') {
      getUserObjects();
    } else {
      axios.get(api_url+'/utilisateurs/me', {
        headers: {
          'Authorization': 'Bearer ' + token,
        }})
        .then(response => {
          axios.get(api_url+'/objets/RechercheSimple/', {
                params: {
                  nom: search
                }
              })
              .then(res => {
                    const filteredData = res.data.filter(obj => obj.utilisateur_id == response.data._id);
                    setObjects(filteredData);
                // console.log(res.data[0].utilisateur_id);
              })
              .catch(error => {
                setObjects([]);
                console.error('Error fetching data:', error);
              });
        });
    }
  }

  const getUserObjects = () => {
    axios.get(api_url+'/utilisateurs/me', {
      headers: {
        'Authorization': 'Bearer ' + token,
      }})
      .then(response => {
        axios.get(api_url+'/objets/utilisateur/'+response.data._id)
        // axios.get(api_url+'/objets')
        .then(res => {
          setObjects(res.data);
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

  useFocusEffect(
    useCallback(() => {
      if (search === '') {
        getUserObjects();
      }
    }, [search])
  )

  return (
    <View style={{
        flex: 1,
        height: screenHeight,
        // backgroundColor: 'powderblue',
    }}>
      <View style={{
        // backgroundColor: 'skyblue',
        height: 50,
        marginTop: 10,
        justifyContent: 'center',
        paddingStart: 20,
      }}>
        <Text h1 style={{
                fontWeight: 'bold',
              }}>Mes objets</Text>
      </View>
      <View>
        <SearchBar 
          lightTheme={true}
          platform='ios'
          searchIcon={{ type: 'material', name: 'search' }}
          value={search}
          onChangeText={updateSearch}
          clearIcon={{ type: 'material', name: 'close' }}
        >
        </SearchBar>
      </View>
      <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
              >
          {objects.length != 0 ? 
              <View>
                {objects.map((obj, index) => (
                <ListItem style={{
                  // marginTop: 10,
                }}
                key={obj._id}
                onPress={() => navigation.navigate('ObjectDetails', { id: obj._id })}>
                  <Avatar
                    rounded
                    source={{ uri: obj.image_url!='' ? obj.image_url : 'https://static.vecteezy.com/system/resources/thumbnails/009/312/127/small_2x/cube-3d-icon-model-cartoon-style-concept-render-illustration-free-png.png' }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>
                      <Text style={{
                        fontWeight: 'bold',
                      }}>{obj.titre}</Text>
                    </ListItem.Title>
                    <ListItem.Subtitle style={{ marginTop: 10 }}>
                      <View style={{
                        // color: 'gray',
                        backgroundColor: 'skyblue',
                        borderRadius: 15,
                        // padding: 1,
                        paddingHorizontal: 10,
                        marginRight: 5,
                        }}>
                      <Text>
                          {obj.categorie_id.nom}
                      </Text>
                      </View>
                      <View style={{
                        // color: 'gray',
                        backgroundColor: 'powderblue',
                        borderRadius: 15,
                        paddingHorizontal: 10,
                        marginLeft: 10,
                        }}>
                        <Text>
                          {obj.valeur_estimee}
                        </Text>
                      </View>
                    </ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron/>
                </ListItem>
                ))}
              </View>
              : <Text style={{ marginStart: 15 }}>Aucun objet disponible.</Text>}
      </ScrollView>
      <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 150,
          bottom: 0,
          // shadowColor: 'black',
          // shadowOffset: { width: 0, height: 0 },
          // shadowOpacity: 0.8,
          // shadowRadius: 3,
        }}
        icon={{ name: 'add', color: 'white' }}
        color="black"
        onPress={() => navigation.navigate('AddObject')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // maxHeight: 400,
  },
});

export default ObjectScreen;
