# endpoint “/9daysweather”

To provide a endpoint for fetching 9 days weather forecast

# Prerequisite

- Node Js \ Docker installed

# Quick Start

```js
yarn
yarn dev
```

# Start with Docker

```js
docker build . -t ioio/weather-forecast-api
docker run -d -p 8080:8080 --name weather-forecast-api ioio/weather-forecast-api
```

Open browser and go http://localhost:8080/9daysweather to see the result
