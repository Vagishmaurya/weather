import React, { useEffect, useState } from "react";
import apiKeys from "../../apiKeys";
import Clock from "react-live-clock";
//import loader from "./images/WeatherIcons.gif";
 import ReactAnimatedWeather from "react-animated-weather";
 import WeatherComponent from "../SearchWeather/Weather";
import "./Current.css"

const formatDate = (d) => {
  const months = [
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December"
  ];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day}, ${date} ${month} ${year}`;
};

const defaultWeatherIcon = "CLEAR_DAY";

const Weather = () => {
  const [weather, setWeather] = useState({
    latitude: undefined,
    longitude: undefined,
    temperatureCelsius: undefined,
    temperatureFahrenheit: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    weatherIcon: defaultWeatherIcon,
    errorMsg: undefined,
  });

  const [isCelsius, setIsCelsius] = useState(true);

  useEffect(() => {
    const getPosition = (options) => {
      return new Promise(function (resolve, reject) {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    };

    const getWeather = async (lat, lon) => {
      try {
        const apiCall = await fetch(
          `${apiKeys.base}weather?lat=${lat}&lon=${lon}&units=metric&APPID=${apiKeys.key}`
        );
        const data = await apiCall.json();

        const newWeather = {
          latitude: lat,
          longitude: lon,
          city: data.name,
          temperatureCelsius: Math.round(data.main.temp),
          temperatureFahrenheit: Math.round(data.main.temp * 1.8 + 32),
          humidity: data.main.humidity,
          description: data.weather[0].description,
          country: data.sys.country,
        };

        switch (newWeather.description) {
          case "Haze":
            newWeather.weatherIcon = "CLEAR_DAY";
            break;
          case "Clouds":
            newWeather.weatherIcon = "CLOUDY";
            break;
          case "Rain":
            newWeather.weatherIcon = "RAIN";
            break;
          case "Snow":
            newWeather.weatherIcon = "SNOW";
            break;
          case "Dust":
            newWeather.weatherIcon = "WIND";
            break;
          case "Drizzle":
            newWeather.weatherIcon = "SLEET";
            break;
          case "Fog":
          case "Smoke":
            newWeather.weatherIcon = "FOG";
            break;
          case "Tornado":
            newWeather.weatherIcon = "WIND";
            break;
          default:
            newWeather.weatherIcon = "CLEAR_DAY";
        }

        setWeather(newWeather);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    const fetchWeatherData = async () => {
      if (navigator.geolocation) {
        try {
          const position = await getPosition();
          getWeather(position.coords.latitude, position.coords.longitude);
        } catch (err) {
          getWeather(28.67, 77.22);
          alert(
            "You have disabled location service. Allow 'This APP' to access your location. Your current location will be used for calculating Real-time weather."
          );
        }
      } else {
        alert("Geolocation not available");
      }

      const timerID = setInterval(() => {
        getWeather(weather.latitude, weather.longitude);
      }, 600000);

      return () => {
        clearInterval(timerID);
      };
    };

    fetchWeatherData();
  }, [weather.latitude, weather.longitude]);

  const toggleTemperatureUnit = () => {
    setIsCelsius(!isCelsius);
  };

  return (
    <React.Fragment>
      {weather.temperatureCelsius ? (
        <div className="cards">
        <div className="city">
          <div className="title">
            <h2>{weather.city} , {weather.country}</h2>
         </div>
          <div className="mb-icon">
            {" "}
            <ReactAnimatedWeather
              icon={weather.weatherIcon}
              color="white"
              size={112}
              animate={true}
            />
            <p>{weather.description}</p>
          </div>
          <div className="date-time">
            <div className="dmy">
              <div id="txt"></div>
              <div className="current-time">
                <Clock format="HH:mm:ss" interval={1000} ticking={true} />
              </div>
              <div className="current-date">{formatDate(new Date())}</div>
            </div>
            <div className="temperature">
              <p>
                {isCelsius
                  ? `${weather.temperatureCelsius}°C`
                  : `${weather.temperatureFahrenheit}°F`}
              </p>
              <button onClick={toggleTemperatureUnit}>
                {isCelsius ? "Fahrenheit" : "Celsius"}
              </button>
            </div>
          </div>
        </div>
        </div>
        
      ) : (
        <React.Fragment>
          {/* <img
            src={loader}
            style={{ width: "50%", WebkitUserDrag: "none" }}
            alt="Loading"
          /> */}
          <h3 style={{ color: "white", fontSize: "22px", fontWeight: "600" }}>
            Detecting your location
          </h3>
          <h3 style={{ color: "white", marginTop: "10px" }}>
            Your current location wil be displayed on the App <br></br> & used
            for calculating Real-time weather.
            
          </h3>

        </React.Fragment>
      )}
      {/* <Forcast/> */}
      <WeatherComponent
  icon={weather.weatherIcon}
  temperatureCelsius={weather.temperatureCelsius}
  temperatureFahrenheit={weather.temperatureFahrenheit}
  description={weather.description}
  city={weather.city}
  country={weather.country}
/>
    </React.Fragment>
  );
};

export default Weather;
