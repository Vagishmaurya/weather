import React, { useState, useEffect, createContext, useContext } from 'react';
import { datacontext } from './Searchcity';
import './Forecast.css';

export default function Forecast() {
  const [api, setapi] = useState([]);
  const { city } = useContext(datacontext);

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=060bf36fed62063605fa216efbe653f4&units=metric`;
      try {
        const response = await fetch(url);
        const respjson = await response.json();
        setapi(respjson.list);
        console.log(respjson.list);
      } catch (e) {
        console.log('error occurred');
        console.error(e);
      }
    };

    fetchApi();
  }, [city]);

  const formatTime = (dateTime) => {
    const date = new Date(dateTime);
    let hours = date.getHours();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // If hours is 0, set it to 12
    return `${hours} ${ampm}`;
  };

  const formatDayAndDate = (dateTime) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const date = new Date(dateTime);
    const dayOfWeek = days[date.getDay()];
    const dayOfMonth = date.getDate();
    return `${dayOfWeek}, ${dayOfMonth}`;
  };

  return (
    <div className='text-white'>
      {!api ? (
        <div>
        <p className='text-center'>Loading...</p>
        <p className='text-center'>Please reenter correct city name</p>
        </div>
      ) : (
       <div>
          <h2 className='text-center mt-3'>Daily Forecast</h2>
          <div className='daily_data'>
            <div className='daily'>
              {api.map((forecast, index) => {
                if (index % 8 === 0) {
                  return (
                    <div key={index} className='weather-item m-2'>
                      <u>
                        <h5 className='text-center'>{formatDayAndDate(forecast.dt_txt)}</h5>
                      </u>
                      <h5 className='text-center'>{Math.floor(forecast.main.temp)}°C</h5>
                      <img
                        src={`https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`}
                        alt={forecast.weather[0].description}
                        className='weather-img'
                      />
                      <p className='text-center'>{forecast.weather[0].description}</p>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
