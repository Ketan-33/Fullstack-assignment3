// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './pages/home';
import { DetailsScreen } from './pages/details';
import { ImageBackground, StyleSheet } from 'react-native';

const Stack = createStackNavigator();

export default function App() {
  return (
    <ImageBackground
      source={require('./assets/Space.jpg')}
      style={styles.background}
    >
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Details" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
});
