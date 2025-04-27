document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById('search-button');
    const cityInput = document.getElementById('city-input');
    const weatherInfo = document.getElementById('weather-info');

    searchButton.addEventListener('click', () => {
        const city = cityInput.value;
        if (city) {
            fetch(`/api/weather/${city}`)
                .then(response => response.json())
                .then(data => {
                    displayWeatherInfo(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                    weatherInfo.textContent = 'Failed to fetch weather data.';
                });
        } else {
            weatherInfo.textContent = 'Please enter a city name.';
        }
    });

    function displayWeatherInfo(data) {
        if (!data) {
            weatherInfo.textContent = 'Weather data not available for this city.';
            return;
        }

        if (!data.weather || data.weather.length === 0) {
            weatherInfo.textContent = 'Weather description not available for this city.';
            return;
        }

        const iconCode = data.weather[0].icon;
        const iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

        weatherInfo.innerHTML = `
            <h2>${data.name}</h2>
            <img src="${iconUrl}" alt="Weather Icon">
            <p>Temperature: ${data.main.temp}°C</p>
            <p>Description: ${data.weather[0].description}</p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
        `;
    }
});