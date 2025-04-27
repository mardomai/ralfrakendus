class WeatherController {
    constructor(weatherService) {
        this.weatherService = weatherService;
    }

    async getWeatherByCity(req, res) {
        const city = req.params.city;
        try {
            const weatherData = await this.weatherService.fetchWeather(city);
            res.json(weatherData);
        } catch (error) {
            console.error('Error in WeatherController:', error);
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = WeatherController;