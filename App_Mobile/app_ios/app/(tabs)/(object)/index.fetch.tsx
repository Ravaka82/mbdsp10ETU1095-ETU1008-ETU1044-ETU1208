import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { ListItem, Text, Avatar, Divider, Card } from '@rneui/themed';


export default function Index() {
  // type Object = {
  //   _id: string;
  //   titre: string;
  //   image_url: string;
  //   avatar: string;
  // };

  const [objects, setObjects] = useState<any[]>([]); 

  useEffect(() => {
    // Fetch data from API
    fetch('http://localhost:3000/api/objets')
      .then(response => response.json())
      .then(data => setObjects(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  return (
    <View 
      style={[
        styles.container,
        {
          // Try setting `flexDirection` to `"row"`.
          flexDirection: 'column',
        },
    ]}>
      <View 
        style={{
          // backgroundColor: '#fff',
          height: 50,
          marginTop: 10,
          paddingStart: 10,
          justifyContent: 'center',
          // alignItems: 'center',
        }}>
        <Text h3>Liste des objets</Text>
      </View>
      {objects.map((obj) => (
        <ListItem key={obj._id} bottomDivider style={{ marginTop: 10 }}>
          <Avatar rounded source={{ uri: obj.image_url }} />
          <ListItem.Content>
            <ListItem.Title>{obj.titre}</ListItem.Title>
            {/* <ListItem.Subtitle>{obj.subtitle}</ListItem.Subtitle> */}
          </ListItem.Content>
        </ListItem>
      ))}
      {/* <View>
        <ListItem bottomDivider style={{
          marginTop: 10,
        }}>
          <Avatar
            rounded
            source={{ uri: "https://randomuser.me/api/portraits/men/36.jpg" }}
          />
          <ListItem.Content>
            <ListItem.Title>Objet 1</ListItem.Title>
            <ListItem.Subtitle>President</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem bottomDivider>
          <Avatar
            rounded
            icon={{
              name: "person-outline",
              type: "material",
              size: 26,
            }}
            containerStyle={{ backgroundColor: "#c2c2c2" }}
          />
          <ListItem.Content>
            <ListItem.Title>objet 2</ListItem.Title>
            <ListItem.Subtitle>Vice President</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
        <ListItem>
          <Avatar rounded title="A" containerStyle={{ backgroundColor: "grey" }} />
          <ListItem.Content>
            <ListItem.Title>objet 3</ListItem.Title>
            <ListItem.Subtitle>Vice Chairman</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});