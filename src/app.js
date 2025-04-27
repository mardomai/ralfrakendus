const express = require('express');
const dotenv = require('dotenv');
const setWeatherRoutes = require('./routes/weatherRoutes');
const WeatherService = require('./services/weatherService');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const weatherService = new WeatherService(process.env.WEATHER_API_KEY, process.env.BASE_URL);

setWeatherRoutes(app, weatherService);

app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});