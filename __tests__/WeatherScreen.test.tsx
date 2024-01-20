import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import WeatherScreen from '../components/WeatherScreen';

jest.mock('axios', () => ({
  get: jest.fn(),
}));

test('fetches weather data and displays it', async () => {
  const mockedResponse = {
    data: {
      location: { name: 'Test City', country: 'Test Country' },
      current: { condition: { text: 'Cloudy', icon: 'test-icon-url' }, temp_c: 25 },
    },
  };

  // Mock the axios get method directly within the manual mock
  require('axios').get.mockResolvedValue({ data: mockedResponse });

  const { getByPlaceholderText, getByText } = render(<WeatherScreen />);

  fireEvent.changeText(getByPlaceholderText('Enter city name'), 'Test City');
  fireEvent.press(getByText('Get Weather'));

  await waitFor(() => {
    expect(getByText('City: Test City, Test Country')).toBeTruthy();
    expect(getByText('Condition: Cloudy')).toBeTruthy();
    expect(getByText('Temperature: 25°C')).toBeTruthy();
  });
});

test('handles API errors gracefully', async () => {
  // Mock the axios get method directly within the manual mock
  require('axios').get.mockRejectedValue(new Error('API Error'));

  const { getByPlaceholderText, getByText } = render(<WeatherScreen />);

  fireEvent.changeText(getByPlaceholderText('Enter city name'), 'Test City');
  fireEvent.press(getByText('Get Weather'));

  await waitFor(() => {
    expect(getByText('Error fetching weather data: API Error')).toBeTruthy();
  });
});
