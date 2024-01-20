import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';

const WeatherScreen: React.FC = () => {
  const [cityName, setCityName] = useState<string>('');
  const [weatherData, setWeatherData] = useState<any>(null);

  const fetchWeatherData = async () => {
    try {
      const API_KEY = '72ca29ffb527494f98f91504242001';
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${cityName}&aqi=no`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={cityName}
        onChangeText={(text) => setCityName(text)}
      />
      <Button title="Get Weather" onPress={fetchWeatherData} />

      {weatherData && (
        <View style={styles.weatherContainer}>
          <Text style={styles.weatherText}>
            City: {weatherData.location.name}, {weatherData.location.country}
          </Text>
          <Text style={styles.weatherText}>
            Condition: {weatherData.current.condition.text}
          </Text>
          <Icon name={weatherData.current.condition.icon} size={50} />
          <Text style={styles.weatherText}>
            Temperature: {weatherData.current.temp_c}°C
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  weatherContainer: {
    marginTop: 20,
  },
  weatherText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default WeatherScreen;
