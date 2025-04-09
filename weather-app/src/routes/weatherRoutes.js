const express = require('express');
const WeatherController = require('../controllers/weatherController');

const setWeatherRoutes = (app, weatherService) => {
    const router = express.Router();
    const weatherController = new WeatherController(weatherService);

    router.get('/weather/:city', weatherController.getWeatherByCity.bind(weatherController));

    app.use('/api', router);

    router.get('/', (req, res) => {
        res.send('Welcome to the Weather App! Use /api/weather/:city to get weather data.');
    });
};

module.exports = setWeatherRoutes;