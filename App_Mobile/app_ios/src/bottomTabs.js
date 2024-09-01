import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ObjectScreen from './screens/Object/ObjectScreen';
import AddObjectScreen from './screens/Object/AddObjectScreen';
import ObjectDetailsScreen from './screens/Object/ObjectDetailsScreen';
import HistoryDetailsScreen from './screens/Exchange/HistoryDetailsScreen';
import { Icon } from '@rneui/themed';
import ExchangeScreen from './screens/Exchange/ExchangeScreen';
import HistoryScreen from './screens/Exchange/HistoryScreen';
import SettingScreen from './screens/SettingScreen';
import ExchangeDetailsScreen from './screens/Exchange/ExchangeDetailsScreen';

import { createStackNavigator } from '@react-navigation/stack';
import AddExchangeScreen from './screens/Exchange/AddExchangeScreen';

const Tab = createBottomTabNavigator();

const ObjectStack = createStackNavigator();
const ExchangeStack = createStackNavigator();
const HistoryStack = createStackNavigator();
const HomeStack = createStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }}/>
      <HomeStack.Screen name="AddExchange" component={AddExchangeScreen} options={{ headerShown: false }}/>
    </HomeStack.Navigator>
  );
}

function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen name="History" component={HistoryScreen} options={{ headerShown: false }}/>
      <HistoryStack.Screen name="HistoryDetails" component={HistoryDetailsScreen} options={{ headerShown: false }}/>
    </HistoryStack.Navigator>
  );
}

function ExchangeStackScreen() {
  return (
    <ExchangeStack.Navigator>
      <ExchangeStack.Screen name="Exchange" component={ExchangeScreen} options={{ headerShown: false }}/>
      <ExchangeStack.Screen name="ExchangeDetails" component={ExchangeDetailsScreen} options={{ headerShown: false }}/>
    </ExchangeStack.Navigator>
  );
}

function ObjectStackScreen() {
  return (
    <ObjectStack.Navigator>
      <ObjectStack.Screen name="Object" component={ObjectScreen} options={{ headerShown: false }}/>
      <ObjectStack.Screen name="ObjectDetails" component={ObjectDetailsScreen} options={{ headerShown: false }}/>
      <ObjectStack.Screen name="AddObject" component={AddObjectScreen} options={{ headerShown: false }}/>
    </ObjectStack.Navigator>
  );
}

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Homes" component={HomeStackScreen} 
        options={{ 
            title: '',
            tabBarLabel: 'Accueil',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
        }}/>
      <Tab.Screen
          name="Objects"
          component={ObjectStackScreen}  // Use the stack navigator here
          options={{
            title: '',
            tabBarLabel: 'Objet',
            tabBarIcon: ({ color, size }) => (
              <Icon name="inventory" color={color} size={size} />
            ),
        }}
      />
      <Tab.Screen name="Echanges" component={ExchangeStackScreen} 
        options={{ 
            title: '',
            tabBarLabel: 'Echange',
            tabBarIcon: ({ color, size }) => (
              <Icon name="cached" color={color} size={size} />
            ),
        }}/>
      <Tab.Screen name="Histories" component={HistoryStackScreen} 
        options={{ 
            title: '',
            tabBarLabel: 'Historique',
            tabBarIcon: ({ color, size }) => (
              <Icon name="history" color={color} size={size} />
            ),
        }}/>
      <Tab.Screen name="Settings" component={SettingScreen} 
        options={{ 
            title: '',
            tabBarLabel: 'Reglage',
            tabBarIcon: ({ color, size }) => (
              <Icon name="settings" color={color} size={size} />
            ),
        }}/>
    </Tab.Navigator>
  );
}
