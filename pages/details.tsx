import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Alert, ImageBackground } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { API_KEY, BASE_URL } from '../config';

interface AsteroidDetails {
  name: string;
  nasa_jpl_url: string;
  is_potentially_hazardous_asteroid: boolean;
}

export const DetailsScreen = () => {
  const route = useRoute();
  const { asteroidId } = route.params as { asteroidId: string };
  const [details, setDetails] = useState<AsteroidDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`${BASE_URL}/${asteroidId}?api_key=${API_KEY}`);
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        Alert.alert('Error', 'Failed to fetch asteroid details');
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [asteroidId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#ffffff" style={styles.loading} />;
  }

  return (
    <ImageBackground
      source={require('../assets/Space.jpg')}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Asteroid Details</Text>
        <Text style={styles.text}>Name: {details?.name}</Text>
        <Text style={styles.text}>NASA JPL URL: {details?.nasa_jpl_url}</Text>
        <Text style={styles.text}>Potentially Hazardous: {details?.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</Text>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginBottom: 15,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
