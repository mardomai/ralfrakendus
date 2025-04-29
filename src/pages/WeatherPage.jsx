import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Paper, CircularProgress } from '@mui/material';
import axios from 'axios';

const WEATHER_API_KEY = 'debc3758fae5a640d8d47381e8f61eaa';  
const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function WeatherPage() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!city) {
      setError('Palun sisestage linna nimi');
      return;
    }

    setLoading(true);
    setError('');
    setWeatherData(null);

    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=debc3758fae5a640d8d47381e8f61eaa`);
      setWeatherData(response.data);
    } catch (err) {
      console.error('Error fetching weather data:', err);
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError('Ilmaandmete laadimine ebaõnnestus. Palun proovige uuesti.');
      }
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '80vh',
        width: '100%'
      }}
    >
      <Box sx={{ width: '100%', maxWidth: 600, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Ilmateade
        </Typography>

        <Box sx={{ mb: 4, display: 'flex', gap: 2, alignItems: 'center', justifyContent: 'center' }}>
          <TextField
            label="Sisesta linna nimi"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearch();
              }
            }}
            disabled={loading}
          />
          <Button 
            variant="contained" 
            onClick={handleSearch}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Otsi'}
          </Button>
        </Box>

        {error && (
          <Paper elevation={3} sx={{ p: 2, mb: 2, bgcolor: '#fff3f3' }}>
            <Typography color="error">
              {error}
            </Typography>
          </Paper>
        )}

        {weatherData && (
          <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              {weatherData.name}
            </Typography>
            <Typography variant="h6">
              Temperatuur: {weatherData.main.temp}°C
            </Typography>
            <Typography>
              Kirjeldus: {weatherData.weather[0].description}
            </Typography>
            <Typography>
              Õhuniiskus: {weatherData.main.humidity}%
            </Typography>
            <Typography>
              Tuule kiirus: {weatherData.wind.speed} m/s
            </Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
}

export default WeatherPage; 