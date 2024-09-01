import React, { useContext, useEffect, useState } from 'react';
import { View, Dimensions, ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useForm, Controller, set } from 'react-hook-form';
import { AuthContext } from './../../context/AuthContext';
import { Text, Input, CheckBox, Button } from '@rneui/themed';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';

import axios from 'axios';

const { height: screenHeight } = Dimensions.get('window');

const AddObjectScreen = ({ navigation }) => {
  const [isNew, setIsNew] = useState(true);
  const [categories, setCategories] = useState([]);
  // const [selectedValue, setSelectedValue] = useState('');
  const [image, setImage] = useState(null);

  const { isLoggedIn, logout, token } = useContext(AuthContext);

  const api_url = process.env.EXPO_PUBLIC_API_URL;

  const { control, handleSubmit, formState: { errors } } = useForm();

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result.assets[0].uri.split('/').pop());
    setImage(result.assets[0]);
    // formData.append('file', {
    //   uri: result.assets[0].uri,
    //   type: result.assets[0].mimeType,
    //   name: result.assets[0].uri.split('/').pop(),
    // });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  const onSubmit = data => {
    // console.log(data);
    axios.get(api_url+'/utilisateurs/me', {
      headers: {
        'Authorization': 'Bearer ' + token,
      }})
      .then(response => {

        const formData = new FormData();

        formData.append('utilisateur_id', response.data._id);
        formData.append('titre', data.titre);
        formData.append('description', data.description);
        formData.append('valeur_estimee', data.valeur_estimee);
        formData.append('etat', isNew ? 'neuf' : 'comme neuf');
        formData.append('categorie_id', data.categorie);
        formData.append('statut', 'disponible');

        console.log(image.uri.split('/').pop());

        formData.append('image', {
          uri: image.uri,
          type: image.mimeType,
          name: image.uri.split('/').pop(),
        });

        // axios.post(api_url+'/objets', {
        //   "utilisateur_id": response.data._id,
        //   "titre": data.titre,
        //   "description": data.description,
        //   "valeur_estimee": data.valeur_estimee,
        //   "etat": isNew ? 'neuf' : 'comme neuf',
        //   "categorie_id": data.categorie,
        //   "statut": "disponible",
        // })
        axios.post(api_url+'/objets', formData, {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Bearer ' + token,
        })
        .then(response => {
          // console.log(response.data);
          navigation.navigate('Object', {
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

  useEffect(() => {
    axios.get(api_url+'/categories')
    .then(res => {
      setCategories(res.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    });
  }, []);

  const toggleCheckbox = () => setIsNew(!isNew);

  return (
    <View style={styles.container}>
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
              }}>Nouvel objet</Text>
      </View>
      {/* <Divider /> */}
      <ScrollView 
                style={styles.scrollView} 
                showsVerticalScrollIndicator={false}
              >
                <View style={{
                  marginHorizontal: 20
                }}>
                    <Text style={styles.label}>Titre</Text>
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
                        name="titre"
                        defaultValue=""
                    />

                    <Text style={styles.label}>Description</Text>
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
                        name="description"
                        defaultValue=""
                    />
                    <Text style={styles.label}>Valeur estimée</Text>
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
                        name="valeur_estimee"
                        defaultValue=""
                    />

                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity onPress={toggleCheckbox}>
                        <CheckBox
                          checked={isNew}
                          size={32}
                          // style={{ backgroundColor: 'transparent' }}
                          containerStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
                          // onClick={toggleCheckbox}
                          onPress={toggleCheckbox}

                        />
                      </TouchableOpacity>
                      <Text>Neuf</Text>
                    </View>

                    <Button title="Choisir une image" onPress={pickImage} />
                    <View style={{ 
                      alignItems: 'center',
                      marginVertical: 10,
                    }}>
                      {image ? 
                          <Image source={{ uri: image.uri }} style={styles.image} />
                          :
                          <Image source='https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg' style={styles.image} />
                      }
                    </View>

                    <Controller
                        control={control}
                        rules={{
                          required: true,
                        }}
                        render={({ field: { onChange, onBlur, value } }) => (
                         
                          <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                          >
                            <Picker.Item label="Categorie" value="" />
                            {categories.map((obj, index) => (
                              <Picker.Item key={obj._id} label={ obj.nom } value={ obj._id } />
                            ))}
                            {/* <Picker.Item label="Option 2" value="option2" /> */}
                          </Picker>
                        )}
                        name="categorie"
                        defaultValue=""
                    />
                </View>
      </ScrollView>
      <View
                style={styles.saveButtonContainer}>
                <Button
                title="Ajouter"
                onPress={handleSubmit(onSubmit)}
                size="lg"
                buttonStyle={{
                    backgroundColor: 'black',
                    borderRadius: 30,
                    marginHorizontal: 20,
                    marginBottom: 20,
                    marginTop: 20,
                }}
                />
            </View>
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
  label: {
    marginStart: 10,
    marginTop: 20,
    fontWeight: '300',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default AddObjectScreen;