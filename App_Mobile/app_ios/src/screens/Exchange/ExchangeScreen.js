import React, { useContext, useEffect, useState, useCallback } from 'react';
import { Button, View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from './../../context/AuthContext';
import { Text, SearchBar, ListItem, Icon, FAB } from '@rneui/themed';
import { useRoute, useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import { set } from 'react-hook-form';

const { height: screenHeight } = Dimensions.get('window');

const ExchangeScreen = ({ navigation }) => {
  const [echanges, setEchanges] = useState([]);
  const { isLoggedIn, logout, token } = useContext(AuthContext);

  const api_url = process.env.EXPO_PUBLIC_API_URL;

  const fetchObjectsList = () => {
    axios.get(api_url+'/utilisateurs/me', {
      headers: {
        'Authorization': 'Bearer ' + token,
      }})
      .then(response => {
        axios.get(api_url+'/echanges/lisesobjetsouhaites/'+response.data._id)
        // axios.get(api_url+'/echanges/lisesobjetsouhaites/66c9f1090ed0ddd4621182e1')
        .then(res => {
          setEchanges(res.data);
        })
        .catch(error => {
          setEchanges([]);
          console.error('Error fetching data:', error);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
  }

  useEffect(() => {
    fetchObjectsList();
  }, []);

  useFocusEffect (
    useCallback(() => {
      fetchObjectsList();
    }, [])
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
              }}>Mes échanges</Text>
      </View>
      {/* <View>
        <SearchBar 
          lightTheme={true}
          platform='ios'
          searchIcon={{ type: 'material', name: 'search' }}
        >
        </SearchBar>
      </View> */}
      <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
              >
      {echanges.length != 0 ?
      <View>
        {echanges.map((echange, index) => (
        <ListItem style={{
          // marginTop: 10,
        }}
        key={echange._id}
        onPress={() => navigation.navigate('ExchangeDetails', { id: echange._id })}
        >
          <Icon name="label" color="grey" />
          <ListItem.Content>
            <ListItem.Title>
              <Text style={{
                fontWeight: 'bold',
              }}>{echange?.objet_acceptant?.titre} - {echange.utilisateur_acceptant_id?.prenom}</Text>
            </ListItem.Title>
            <ListItem.Subtitle style={{ marginTop: 10 }}>
              <View style={{
                marginRight: 5,
                }}>
              <Text>
                  {moment(echange?.date_proposition).format('MMMM DD, YYYY')}
              </Text>
              </View>
              <View style={{
                // color: 'gray',
                // backgroundColor: 'powderblue',
                borderRadius: 15,
                paddingHorizontal: 10,
                marginLeft: 10,
                }}>
                <Text style={{
                    color: 'skyblue',
                }}>
                  {echange.statut}
                </Text>
              </View>
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron/>
        </ListItem>
        ))}
      </View>
      :
      <View>
        <Text style={{
          marginTop: 20,
          marginHorizontal: 20,
        }}>Aucun échange trouvé.</Text>
      </View>
    }
      </ScrollView>
      {/* <FAB
        style={{
          position: 'absolute',
          margin: 16,
          right: 150,
          bottom: 0,
        }}
        icon={{ name: 'add', color: 'white' }}
        color="black"
        // onPress={() => navigation.navigate('AddObject')}
      /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // maxHeight: 400,
  },
});

export default ExchangeScreen;
