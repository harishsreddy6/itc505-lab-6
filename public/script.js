const apiUrl = 'http://localhost:3000/api';

// Function to get current weather
function getWeather() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const url = `${apiUrl}/weather?city=${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => {
            console.error('Error fetching data:', error);
            alert('Could not retrieve weather data. Please try again.');
        });
}

// Function to display current weather data
function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    if (data.error) {
        weatherInfo.innerHTML = `<p>${data.error}</p>`;
        return;
    }

    const { name, weather, main } = data;
    weatherInfo.innerHTML = `
        <h3>Weather in ${name}</h3>
        <p>${weather[0].description}</p>
        <p>Temperature: ${(main.temp).toFixed(1)}°C</p>
        <p>Humidity: ${main.humidity}%</p>
    `;
}

// Function to show the home screen
function showHome() {
    document.getElementById('content').innerHTML = `
        <h2>Get Weather Information</h2>
        <div class="weather-input">
            <label for="city">Enter City Name: </label>
            <input type="text" id="city" placeholder="e.g., New York">
            <button onclick="getWeather()">Get Weather</button>
        </div>
        <div id="weather-info"></div>
        <button onclick="showForecast()">Get 5-Day Forecast</button>
        <button onclick="showAbout()">About</button>
    `;
}

// Function to show the forecast screen
function showForecast() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name first');
        return;
    }

    document.getElementById('content').innerHTML = `
        <h2>5-Day Weather Forecast</h2>
        <div class="weather-input">
            <label for="city">Enter City Name: </label>
            <input type="text" id="city" placeholder="e.g., New York">
            <button onclick="getForecast()">Get 5-Day Forecast</button>
        </div>
        <div id="forecast-info"></div>
        <button onclick="showHome()">Back to Home</button>
        <button onclick="showAbout()">About</button>
    `;
}

// Function to get the 5-day weather forecast
function getForecast() {
    const city = document.getElementById('city').value;
    if (!city) {
        alert('Please enter a city name');
        return;
    }

    const url = `${apiUrl}/forecast?city=${city}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => {
            console.error('Error fetching forecast data:', error);
            alert('Could not retrieve forecast data. Please try again.');
        });
}

// Function to display 5-day forecast data
function displayForecast(data) {
    const forecastInfo = document.getElementById('forecast-info');
    if (data.error) {
        forecastInfo.innerHTML = `<p>${data.error}</p>`;
        return;
    }

    let forecastHtml = '<ul>';
    data.list.forEach(day => {
        const date = new Date(day.dt * 1000).toLocaleDateString();
        forecastHtml += `
            <li>
                ${date}: ${day.weather[0].description}, 
                Temp: ${(day.main.temp).toFixed(1)}°C, 
                Min Temp: ${(day.main.temp_min).toFixed(1)}°C, 
                Max Temp: ${(day.main.temp_max).toFixed(1)}°C
            </li>
        `;
    });
    forecastHtml += '</ul>';
    forecastInfo.innerHTML = forecastHtml;
}

// Function to show the about screen
function showAbout() {
    document.getElementById('content').innerHTML = `
        <h2>About This App</h2>
        <p>This app allows users to get current weather data and a 5-day forecast for any city.</p>
        <button onclick="showHome()">Back to Home</button>
    `;
}

// Initialize with Home view
document.addEventListener('DOMContentLoaded', () => {
    showHome();  // Show the Home view by default
});

document.getElementById('toggleAddendumBtn').addEventListener('click', function() {
    var addendumSection = document.getElementById('addendum');
    if (addendumSection.style.display === 'none' || addendumSection.style.display === '') {
        addendumSection.style.display = 'block'; // Show the addendum
    } else {
        addendumSection.style.display = 'none'; // Hide the addendum
    }
});

// Display last modified date in footer
document.getElementById('last-modified').innerText = document.lastModified;