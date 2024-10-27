// HomeScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
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
    <View style={styles.container}>
      <TextInput
        placeholder="Search Here"
        style={styles.input}
        value={asteroidId}
        onChangeText={setAsteroidId}
      />
      <Button
        title="Submit"
        onPress={() => fetchAsteroidDetails(asteroidId)}
        disabled={!asteroidId}
      />
      <Button title="Random Asteroid" onPress={fetchRandomAsteroid} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
});
