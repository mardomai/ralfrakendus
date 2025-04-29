const axios = require('axios');

class WeatherService {
    constructor(apiKey, baseUrl) {
        this.apiKey = apiKey;
        this.baseUrl = baseUrl;
        this.cache = {};
        this.cacheExpiry = 600;
    }

    async fetchWeather(city) {
        const now = Math.floor(Date.now() / 1000);
        if (this.cache[city] && this.cache[city].expiry > now) {
            console.log(`Fetching weather data for ${city} from cache`);
            return this.cache[city].data;
        }

        try {
            console.log(`Fetching weather data for ${city} from API`);
            const response = await axios.get(`${this.baseUrl}?q=${city}&appid=${this.apiKey}&units=metric`);
            const data = response.data;

            this.cache[city] = {
                data: data,
                expiry: now + this.cacheExpiry
            };

            return data;
        } catch (error) {
            console.error(`Error fetching weather data for ${city}:`, error);
            throw error;
        }
    }
}   

module.exports = WeatherService;