import SearchBox from "./SearchBox";
import InfoBox from "./Infobox";
import { useState } from "react";
import "./WeatherApp.css";

export default function WeatherApp(){

    const [weatherInfo, setWeatherInfo] = useState(
        {
        city: "Jaipur",
        feelslike: 24.08 ,
        temp: 24.62,
        tempMin: 24.62,
        tempMax: 24.62,
        humidity: 36,
        weather: "haze"
    }
    )

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }


    return (
        <div className="WeatherApp">
            <h2>Weather App by Harsh</h2>
            <SearchBox updateInfo={updateInfo}/>
            <InfoBox info={weatherInfo}/>
        </div>
    )
}