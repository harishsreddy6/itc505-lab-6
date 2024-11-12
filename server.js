// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Weather data route
app.get('/api/weather', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        // Fetch current weather data from OpenWeather API
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
            params: { q: city, appid: apiKey, units: 'metric' }
        });

        // Check if the API responded with the expected data
        if (response.data && response.data.weather) {
            res.json(response.data);
        } else {
            res.status(404).json({ error: 'Weather data not found for the specified city' });
        }
    } catch (error) {
        console.error("Weather API error:", error.response ? error.response.data : error.message);
        res.status(500).json({
            error: 'Error fetching weather data',
            details: error.response ? error.response.data : error.message
        });
    }
});

// 5-day weather forecast route
app.get('/api/forecast', async (req, res) => {
    const city = req.query.city;
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!city) {
        return res.status(400).json({ error: 'City name is required' });
    }

    try {
        // Fetch forecast data from OpenWeather API
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/forecast`, {
            params: { q: city, appid: apiKey, units: 'metric' }
        });

        // Check if the API responded with the expected data
        if (response.data && response.data.list) {
            res.json(response.data);
        } else {
            res.status(404).json({ error: 'Forecast data not found for the specified city' });
        }
    } catch (error) {
        console.error("Forecast API error:", error.response ? error.response.data : error.message);
        res.status(500).json({
            error: 'Error fetching forecast data',
            details: error.response ? error.response.data : error.message
        });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
