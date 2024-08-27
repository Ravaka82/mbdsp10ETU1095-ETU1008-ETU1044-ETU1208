import { Stack } from "expo-router";

export default function ObjectLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: 'skyblue',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="index" options={{ title:'Objet' }}/>
    </Stack>
  );
}