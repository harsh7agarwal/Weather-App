import { useState } from 'react';
import './AirQuality.css';

export default function AirQuality() {
    const [city, setCity] = useState('');
    const [aqiData, setAqiData] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city.trim()) return;

        const API_KEY = "de0ab7df4fbbd6bd848c22f5bf9d88be";
        
        try {
            // First get coordinates for the city
            const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${API_KEY}`;
            const geoResponse = await fetch(geoUrl);
            const geoData = await geoResponse.json();

            if (geoData.length === 0) {
                alert('City not found!');
                return;
            }

            const { lat, lon } = geoData[0];

            // Get air pollution data using coordinates
            const airPollutionUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
            const airResponse = await fetch(airPollutionUrl);
            const airData = await airResponse.json();

            if (airData.cod) {
                throw new Error('API Error');
            }

            const aqi = airData.list[0].main.aqi; // 1-5 scale
            const components = airData.list[0].components;

            // Convert AQI from 1-5 scale to 0-500 scale (US AQI)
            const aqiValue = convertToUSAQI(aqi, components);
            const status = getStatusFromAQI(aqiValue);

            const aqiData = {
                city: city,
                aqi: aqiValue,
                pm25: Math.round(components.pm2_5),
                pm10: Math.round(components.pm10),
                status: status
            };

            setAqiData(aqiData);
            setCity('');
        } catch (err) {
            alert('Error fetching air quality data. Please try again.');
            console.error(err);
        }
    };

    const convertToUSAQI = (aqi, components) => {
        // OpenWeatherMap uses 1-5 scale, convert to US AQI (0-500)
        // Using PM2.5 as primary indicator
        const pm25 = components.pm2_5;
        
        if (pm25 <= 12) return Math.round((pm25 / 12) * 50);
        if (pm25 <= 35.4) return Math.round(50 + ((pm25 - 12) / 23.4) * 50);
        if (pm25 <= 55.4) return Math.round(100 + ((pm25 - 35.4) / 20) * 50);
        if (pm25 <= 150.4) return Math.round(150 + ((pm25 - 55.4) / 95) * 50);
        if (pm25 <= 250.4) return Math.round(200 + ((pm25 - 150.4) / 100) * 100);
        return Math.round(300 + ((pm25 - 250.4) / 124.6) * 100);
    };

    const getStatusFromAQI = (aqi) => {
        if (aqi <= 50) return 'Good';
        if (aqi <= 100) return 'Moderate';
        if (aqi <= 150) return 'Unhealthy for Sensitive Groups';
        if (aqi <= 200) return 'Unhealthy';
        if (aqi <= 300) return 'Very Unhealthy';
        return 'Hazardous';
    };

    const getAqiColor = (aqi) => {
        if (aqi <= 50) return '#4CAF50'; // Green
        if (aqi <= 100) return '#FFC107'; // Yellow
        if (aqi <= 150) return '#FF9800'; // Orange
        if (aqi <= 200) return '#F44336'; // Red
        if (aqi <= 300) return '#9C27B0'; // Purple
        return '#795548'; // Brown
    };

    const getHealthMessage = (aqi) => {
        if (aqi <= 50) return 'Air quality is satisfactory. Enjoy outdoor activities!';
        if (aqi <= 100) return 'Air quality is acceptable. Sensitive people may experience minor issues.';
        if (aqi <= 150) return 'Sensitive groups should reduce outdoor activities.';
        if (aqi <= 200) return 'Everyone may experience health effects. Avoid outdoor activities.';
        if (aqi <= 300) return 'Health alert: Everyone may experience serious health effects.';
        return 'Health warning: Avoid all outdoor activities. Stay indoors.';
    };

    return (
        <div className="air-quality-app">
            <div className="app-header">
                <h1>Air Quality Tracker</h1>
            </div>

            <div className="search-section">
                <form onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Enter city name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="city-input"
                    />
                    <button type="submit" className="search-btn">Search</button>
                </form>
            </div>

            {aqiData && (
                <div className="aqi-card">
                    <div className="aqi-header">
                        <h2>{aqiData.city}</h2>
                        <div className="aqi-value" style={{ backgroundColor: getAqiColor(aqiData.aqi) }}>
                            {aqiData.aqi}
                        </div>
                    </div>

                    <div className="aqi-status" style={{ color: getAqiColor(aqiData.aqi) }}>
                        {aqiData.status}
                    </div>

                    <div className="pollution-details">
                        <div className="detail-item">
                            <span>PM2.5</span>
                            <span className="value">{aqiData.pm25} μg/m³</span>
                        </div>
                        <div className="detail-item">
                            <span>PM10</span>
                            <span className="value">{aqiData.pm10} μg/m³</span>
                        </div>
                    </div>

                    <div className="health-message">
                        {getHealthMessage(aqiData.aqi)}
                    </div>
                </div>
            )}
        </div>
    );
}

