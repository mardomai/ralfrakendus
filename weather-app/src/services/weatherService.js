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
            console.error('Error fetching weather data:', error);
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.error('API Response Data:', error.response.data);
                console.error('API Response Status:', error.response.status);
                console.error('API Response Headers:', error.response.headers);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error setting up the request:', error.message);
            }
            throw new Error('Failed to fetch weather data');
        }
    }
}

module.exports = WeatherService;