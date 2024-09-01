import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, ScrollView } from 'react-native';
import { AuthContext } from './../context/AuthContext';
import { Text, Divider, Icon, Button } from '@rneui/themed';
import axios from 'axios';

const { height: screenHeight, width: screenWidth } = Dimensions.get('window');

const SettingScreen = () => {
  const { isLoggedIn, logout, token } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  const { width: screenWidth } = Dimensions.get('window');

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

  return (
    <>
    <View style={{
        flex: 1,
        height: screenHeight,
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
          <Divider />
          <ScrollView>
              <View style={{
                  // backgroundColor: 'aquamarine',
                  // paddingHorizontal: 20,
                  justifyContent: 'center',
                  width: screenWidth,
                  alignItems: 'center',
              }}>      
                  <Button
                    title="Se deconnecter"
                    size="lg"
                    onPress={() => logout()}
                    buttonStyle={{
                      backgroundColor: 'black',
                      marginTop: 20,
                      width:350,
                      // marginStart: 20,
                      // borderWidth: 2,
                      // borderColor: 'white',
                      // borderRadius: 30,
                    }}
                    titleStyle={{ fontWeight: 'bold' }}
                  />
              </View>
          </ScrollView>
        </View>
    {/* </View> */}
    </>
  );
};

export default SettingScreen;