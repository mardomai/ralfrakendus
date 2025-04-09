# Weather App

This is a simple Node.js application that allows users to search for weather information by city name using a weather API.

## Project Structure

```
weather-app
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers           # Contains the logic for handling requests
│   │   └── weatherController.js
│   ├── routes                # Defines the routes for the application
│   │   └── weatherRoutes.js
│   └── services              # Interacts with the weather API
│       └── weatherService.js
├── package.json              # NPM configuration file
├── .env                      # Environment variables
├── .gitignore                # Files to be ignored by Git
└── README.md                 # Project documentation
```

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd weather-app
   ```

2. Install the dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory and add your weather API key and base URL:
   ```
   API_KEY=your_api_key
   BASE_URL=https://api.weatherapi.com/v1
   ```

4. Start the application:
   ```
   npm start
   ```

## Usage

To get the weather information for a city, send a GET request to the following endpoint:

```
GET /weather?city={city_name}
```

Replace `{city_name}` with the name of the city you want to search for.

## Example

To get the weather for London, you would make a request to:

```
GET /weather?city=London
```

The response will include the current weather information for the specified city.