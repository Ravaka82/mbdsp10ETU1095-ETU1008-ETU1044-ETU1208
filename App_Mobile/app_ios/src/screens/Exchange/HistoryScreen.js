import React, { useContext, useEffect, useState } from 'react';
import { Button, View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import { AuthContext } from './../../context/AuthContext';
import { Text, SearchBar, ListItem, Icon } from '@rneui/themed';
import axios from 'axios';
import moment from 'moment';

const { height: screenHeight } = Dimensions.get('window');

const HistoryScreen = ({ navigation }) => {
  const [echanges, setEchanges] = useState([]);
  const { isLoggedIn, logout, token } = useContext(AuthContext);

  const api_url = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    axios.get(api_url+'/utilisateurs/me', {
      headers: {
        'Authorization': 'Bearer ' + token,
      }})
      .then(response => {
        axios.get(api_url+'/echanges/historique/'+response.data._id)
        // axios.get(api_url+'/echanges/historique/66c9f1090ed0ddd4621182e1')
        .then(res => {
          setEchanges(res.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
  }, []);

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
              }}>Historiques</Text>
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
      <View>
        {echanges.map((echange, index) => (
        <ListItem style={{
          // marginTop: 10,
        }}
        key={echange._id}
        onPress={() => navigation.navigate('HistoryDetails', { id: echange._id })}
        // onPress={() => navigation.navigate('ObjectDetails', { id: obj._id })}
        >
          <Icon name="article" color="grey" />
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
                  {moment(echange?.date_proposition).format('MMMM DD, YYYY')} - {moment(echange?.date_acceptation).format('MMMM DD, YYYY')}
              </Text>
              </View>
              {/* <View style={{
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
              </View> */}
            </ListItem.Subtitle>
          </ListItem.Content>
          <ListItem.Chevron/>
        </ListItem>
        ))}
      </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    // maxHeight: 400,
  },
});

export default HistoryScreen;