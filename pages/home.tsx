// HomeScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, ImageBackground, Text, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BASE_URL, API_KEY } from '../config';

export const HomeScreen = () => {
  const [asteroidId, setAsteroidId] = useState('');
  const navigation = useNavigation();

  const fetchAsteroidDetails = (id: string) => {
    navigation.navigate('Details', { asteroidId: id });
  };

  const fetchRandomAsteroid = async () => {
    try {
      const response = await fetch(`${BASE_URL}/browse?api_key=${API_KEY}`);
      const data = await response.json();
      const randomAsteroid = data.near_earth_objects[Math.floor(Math.random() * data.near_earth_objects.length)];
      fetchAsteroidDetails(randomAsteroid.id);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch random asteroid');
    }
  };

  return (
    <ImageBackground
      source={require('../assets/Space.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <TextInput
          placeholder="Search Here"
          placeholderTextColor="#ccc"
          style={styles.input}
          value={asteroidId}
          onChangeText={setAsteroidId}
        />
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={() => fetchAsteroidDetails(asteroidId)}
          disabled={!asteroidId}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null,
          ]}
          onPress={fetchRandomAsteroid}
        >
          <Text style={styles.buttonText}>Random Asteroid</Text>
        </Pressable>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1E90FF',
    padding: 10,
    marginBottom: 20,
    color: '#fff',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonPressed: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
