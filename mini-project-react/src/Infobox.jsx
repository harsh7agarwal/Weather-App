import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import "./InfoBox.css";
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import SunnyIcon from '@mui/icons-material/Sunny';

export default function InfoBox({ info }) {

  const HOT_URL = "https://images.unsplash.com/photo-1447601932606-2b63e2e64331?q=80&w=979&auto=format&fit=crop";
  const COLD_URL = "https://images.unsplash.com/photo-1477468572316-36979010099d?q=80&w=1032&auto=format&fit=crop";
  const RAIN_URL = "https://images.unsplash.com/photo-1503435824048-a799a3a84bf7?q=80&w=987&auto=format&fit=crop";

  // 🔹 AQI helpers
  const getAQIStatus = (aqi) => {
    if (aqi === 1) return "Good 😊";
    if (aqi === 2) return "Fair 🙂";
    if (aqi === 3) return "Moderate 😐";
    if (aqi === 4) return "Poor 😷";
    if (aqi === 5) return "Very Poor ☠️";
    return "N/A";
  };

  const getAQIColor = (aqi) => {
    if (aqi <= 2) return "green";
    if (aqi === 3) return "orange";
    return "red";
  };

  return (
    <div className="InfoBox">
      <div className="cardContainer">
        <Card sx={{ maxWidth: 345 }}>

          <CardMedia
            sx={{ height: 140 }}
            image={
              info.humidity > 80
                ? RAIN_URL
                : info.temp > 15
                ? HOT_URL
                : COLD_URL
            }
          />

          <CardContent>
            <Typography gutterBottom variant="h5">
              {info.city}
              {info.humidity > 80 ? (
                <ThunderstormIcon />
              ) : info.temp > 15 ? (
                <SunnyIcon />
              ) : (
                <AcUnitIcon />
              )}
            </Typography>

            <Typography variant="body2" color="text.secondary" component="span">
              <p>Temperature: {info.temp}°C</p>
              <p>Humidity: {info.humidity}%</p>
              <p>Min Temp: {info.tempMin}°C</p>
              <p>Max Temp: {info.tempMax}°C</p>

              
              <p>
                AQI:
                <span
                  style={{
                    color: getAQIColor(info.aqi),
                    fontWeight: "bold",
                    marginLeft: "6px"
                  }}
                >
                  {info.aqi} ({getAQIStatus(info.aqi)})
                </span>
              </p>

              <p>PM2.5: {info.pm25} µg/m³</p>
              <p>PM10: {info.pm10} µg/m³</p>

              <p>
                Weather: <b>{info.weather}</b>, feels like {info.feelslike}°C
              </p>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
