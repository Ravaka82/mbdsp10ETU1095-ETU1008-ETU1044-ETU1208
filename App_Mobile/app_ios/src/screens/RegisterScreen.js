import React, { useState, useContext } from 'react';
import { View, TextInput, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { useForm, Controller, set } from 'react-hook-form';
import { Input, Text, Button } from '@rneui/themed';
import axios from 'axios';

import { AuthContext } from '../context/AuthContext';

const { height: screenHeight } = Dimensions.get('window');

const RegisterScreen = ({ navigation }) => {
  const [passwordError, setPasswordError] = React.useState(false);

  const { control, handleSubmit, formState: { errors } } = useForm();

  const api_url = process.env.EXPO_PUBLIC_API_URL;

  const { login } = useContext(AuthContext);

  const onSubmit = data => {
    if(data.password !== data.confirmPassword) {
      setPasswordError(true);
      return false;
    }

    // {"email": "Jean@n", "password": "lle"}
    axios.post(api_url+'/utilisateurs/register', {
          "nom":data.nom,
          "prenom":data.prenom,
          "email": data.email,
          "mot_de_passe": data.password,
          "latitude": data.latitude,
          "longitude":data.longitude
      })
      .then(response => {
        login(response.data.token);
        navigation.replace('Main');
        // console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error.message);
      });
    // console.log(data);
    // console.log(data.email);
  };

  return (
    <View style={styles.container}>
    {/* <View> */}
        <View
          style={{
              width: 300,
              justifyContent: 'center',
              height: screenHeight,
          }}>
            <View>
              <Text h1>Inscription.</Text>
              <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
              >
                <View>
                  <Text style={styles.label}>Nom</Text>
                  <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                          />
                      )}
                      name="nom"
                      defaultValue=""
                  />
                  {errors.nom && <Text style={styles.error}>Veuillez entrer votre nom.</Text>}

                  <Text style={styles.label}>Prénom</Text>
                  <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                          />
                      )}
                      name="prenom"
                      defaultValue=""
                  />
                  {errors.prenom && <Text style={styles.error}>Veuillez entrer votre prenom.</Text>}

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
                              // errorStyle={{ color: 'red' }}
                              // errorMessage={errors.email ? 'Veuillez entrer votre mot de passe.' : ''}
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

                  <Text style={styles.label}>Confirmer le mot de passe</Text>
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
                      name="confirmPassword"
                      defaultValue=""
                  />
                  {errors.password && <Text style={styles.error}>Veuillez entrer votre mot de passe.</Text>}

                  <Text style={styles.label}>Latitude</Text>
                  <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                          />
                      )}
                      name="latitude"
                      defaultValue=""
                  />
                  {errors.latitude && <Text style={styles.error}>Veuillez remplir ce champ.</Text>}

                  <Text style={styles.label}>Longitude</Text>
                  <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                              onBlur={onBlur}
                              onChangeText={onChange}
                              value={value}
                          />
                      )}
                      name="longitude"
                      defaultValue=""
                  />
                  {errors.longitude && <Text style={styles.error}>Veuillez remplir ce champ.</Text>}

                </View>
              </ScrollView>
              {/* {authError && <View style={styles.authError}>
                  <Text>Email ou mot de passe incorrect</Text>
                </View>} */}
              {passwordError && <View style={styles.passwordError}>
                  <Text>Les mots de passes ne sont pas identiques</Text>
                </View>}
              <Button
                title="S'inscrire"
                onPress={handleSubmit(onSubmit)}
                size="lg"
                buttonStyle={{
                  backgroundColor: 'black',
                  borderRadius: 30,
                  marginTop: 20,
                }}
              />
            </View>

            <View style={styles.createAccountButtonContainer}>
                <Button
                title="Se connecter"
                type="outline"
                // onPress={navigation.navigate('Login')}
                onPress={() => navigation.replace('Login')}
                size="lg"
                buttonStyle={{
                    // backgroundColor: 'black',
                    borderColor: 'black',
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
    // padding: 16,
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
  scrollView: {
    maxHeight: 400,
  },
  passwordError: {
    backgroundColor: '#ffa9a9',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    borderRadius: 5,
  },
});

export default RegisterScreen;