import { useState } from 'react';
import './AirQuality.css';

export default function AirQuality() {
    const [city, setCity] = useState('');
    const [aqiData, setAqiData] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!city.trim()) return;

        // Mock AQI data for demo (you can integrate with real API later)
        const mockAqiData = {
            city: city,
            aqi: Math.floor(Math.random() * 300) + 50, // Random AQI between 50-350
            pm25: Math.floor(Math.random() * 100) + 10,
            pm10: Math.floor(Math.random() * 150) + 20,
            status: 'Moderate'
        };

        // Determine status based on AQI
        if (mockAqiData.aqi <= 50) {
            mockAqiData.status = 'Good';
        } else if (mockAqiData.aqi <= 100) {
            mockAqiData.status = 'Moderate';
        } else if (mockAqiData.aqi <= 150) {
            mockAqiData.status = 'Unhealthy for Sensitive Groups';
        } else if (mockAqiData.aqi <= 200) {
            mockAqiData.status = 'Unhealthy';
        } else if (mockAqiData.aqi <= 300) {
            mockAqiData.status = 'Very Unhealthy';
        } else {
            mockAqiData.status = 'Hazardous';
        }

        setAqiData(mockAqiData);
        setCity('');
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

