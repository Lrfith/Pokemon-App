import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'

import HomeScreen from './src/screen/HomeScreen'
import PokemonListScreen from './src/screen/PokemonListScreen'
import PokemonDetailsScreen from './src/screen/PokemonDetailsScreen'

const Tab = createBottomTabNavigator();

const App = () => {
  
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home-outline';
            } else if (route.name === 'Pokémon List') {
              iconName = 'list-outline';
            } else if (route.name === 'Pokémon Details') {
              iconName = 'alert-circle-outline';
            }
            return <Ionicons name={iconName} size={size} color={color} />
          },
        })}
      >
        <Tab.Screen name='Home' component={HomeScreen} />
        <Tab.Screen name='Pokémon List' component={PokemonListScreen} />
        <Tab.Screen name='Pokémon Details' component={PokemonDetailsScreen} />
      </Tab.Navigator>
    </NavigationContainer >
  )
}

export default App
