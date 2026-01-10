import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import "./SearchBox.css"
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {

  let [city, setCity] = useState("");
  let [error, setError] = useState(false);

  const API_KEY = "de0ab7df4fbbd6bd848c22f5bf9d88be";

  async function fetchAirQuality(lat, lon) {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
    );
    const json = await res.json();

    return {
      aqi: json.list[0].main.aqi,
      pm25: json.list[0].components.pm2_5,
      pm10: json.list[0].components.pm10
    };
  }

  // 🔹 Fetch Weather + AQI together
  let getWeatherInfo = async () => {
    try {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
      let response = await fetch(API_URL);
      let jsonResponse = await response.json();

      const { lat, lon } = jsonResponse.coord;

      // 🔥 wait for AQI
      const airData = await fetchAirQuality(lat, lon);

      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelslike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
        aqi: airData.aqi,
        pm25: airData.pm25,
        pm10: airData.pm10
      };

      console.log(result);
      return result;

    } catch (err) {
      setError(true);
      throw err;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let newInfo = await getWeatherInfo();
      updateInfo(newInfo);
      setCity("");
      setError(false);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField
          id="city"
          label="City Name"
          variant="outlined"
          required
          value={city}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Search
        </Button>
        {error && <p style={{ color: "red" }}>No such place exists!</p>}
      </form>
    </div>
  );
}
