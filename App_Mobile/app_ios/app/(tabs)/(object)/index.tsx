import React, { useEffect, useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { ListItem, Text, Avatar, Divider, Card } from '@rneui/themed';
import axios from 'axios';

export default function Index() {
  interface ObjectItem {
    image_url: string;
    titre: string;
    valeur_estimee: string;
    // subtitle: string;
  }

  const apiUrl = process.env.EXPO_PUBLIC_API_URL;

  const [objects, setObjects] = useState<ObjectItem[]>([]);

  useEffect(() => {
    // Fetch data from the API
    axios.get(apiUrl+'/objets')
      .then(response => {
        setObjects(response.data);
      })
      .catch(error => {
        // console.error('Error fetching data:', error);
        console.error('Error fetching data:', error.message);
        if (error.response) {
          // The request was made and the server responded with a status code
          // console.error('Response data:', error.response.data);
          // console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error('Request data:', error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error('Error message:', error.message);
        }
      });
  }, []);

  return (
    <View style={[styles.container, { flexDirection: 'column' }]}>
      <View style={{ height: 50, marginTop: 10, paddingStart: 10, justifyContent: 'center' }}>
        <Text h3>Liste des objets</Text>
      </View>
      <View>
        {objects.map((obj, index) => (
          <ListItem key={index} bottomDivider style={{ marginTop: 10 }}>
            <Avatar rounded source={{ uri: obj.image_url }} />
            <ListItem.Content>
              <ListItem.Title>{obj.titre}</ListItem.Title>
              <ListItem.Subtitle>{obj.valeur_estimee}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
