import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, StyleSheet, Dimensions } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { Input, Text, Button } from '@rneui/themed';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

const { height: screenHeight } = Dimensions.get('window');

const LoginScreen = ({ navigation }) => {
  const { isLoggedIn, logout, token } = useContext(AuthContext);
  const [authError, setAuthError] = React.useState(false);
  
  const { login } = useContext(AuthContext);
  
  const { control, handleSubmit, formState: { errors } } = useForm();

  const api_url = process.env.EXPO_PUBLIC_API_URL;

  useEffect(() => {
    isLoggedIn && navigation.replace('Main');
  }, [isLoggedIn, navigation]);
  
  const onSubmit = data => {
    axios.post(api_url+'/utilisateurs/login', {
      email: data.email,
      mot_de_passe: data.password,
    }, {
      headers: {
        'Content-Type': 'application/json',
      } 
    })
      .then(response => {
        setAuthError(false);
        const token = response.data.token;
        login(token);
        // console.log(token);
        navigation.replace('Main');
      })
      .catch(error => {
        setAuthError(true);
        console.error('Error fetching data:', error.message);
      });
    // console.log(api_url);
    // console.log(data);
  };

  return (
    <View style={styles.container}>
        <View
            style={{
                width: 300,
                height: screenHeight,
                justifyContent: 'center',
            }}>
            <View>
                <Text h1>Bienvenue.</Text>
                <Text style={styles.label}>Email</Text>
                <Controller
                      control={control}
                      rules={{
                        required: true,
                      //   pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+$/,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                        // console.log(errors.email),
                        <Input
                            // placeholder='Email'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                        />
                    )}
                      name="email"
                      defaultValue=""
                  />
                {errors.email && <Text style={styles.error}>Veuillez entrer un addresse email valide.</Text>}

                <Text style={styles.label}>Mot de passe</Text>
                <Controller
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                            // placeholder='Email'
                            onBlur={onBlur}
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry={true}
                        />
                    )}
                    name="password"
                    defaultValue=""
                />
                {errors.password && <Text style={styles.error}>Veuillez entrer votre mot de passe.</Text>}

                {authError && <View style={styles.authError}>
                  <Text>Email ou mot de passe incorrect</Text>
                </View>}

                <Button
                title="Se connecter"
                onPress={handleSubmit(onSubmit)}
                size="lg"
                buttonStyle={{
                    backgroundColor: 'black',
                    borderRadius: 30,
                    marginTop: 20,
                }}
                />
            </View>
            <View
                style={styles.createAccountButtonContainer}>
                <Button
                title="Créer un compte"
                type="outline"
                onPress={() => navigation.navigate('Register')}
                size="lg"
                buttonStyle={{
                    // backgroundColor: 'black',
                    // borderColor: 'black',
                    borderRadius: 30,
                }}
                titleStyle={{ color: 'black' }}
                />
            </View>
        </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // height: screenHeight,
    // backgroundColor: 'skyblue',
  },
  label: {
    marginStart: 10,
    marginTop: 20,
    fontWeight: '300',
  },
  error: {
    color: 'red',
    marginStart: 10,
    fontSize: 12,
    marginTop: -15,
  },
  createAccountButtonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
  },
  authError: {
    backgroundColor: '#ffa9a9',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    borderRadius: 5,
  },
});

export default LoginScreen;