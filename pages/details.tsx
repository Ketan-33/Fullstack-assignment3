import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet,Alert } from 'react-native';
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
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={styles.container}>
      <Text>Name: {details?.name}</Text>
      <Text>NASA JPL URL: {details?.nasa_jpl_url}</Text>
      <Text>Potentially Hazardous: {details?.is_potentially_hazardous_asteroid ? 'Yes' : 'No'}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
});
