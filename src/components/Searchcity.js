import React, { useState, useEffect, createContext } from 'react'
import './style.css'
import Citydata from './Citydata'
import Forecast from './Forecast'

import Footer from './Footer'


const datacontext = createContext();

export default function Searchcity() {

  const [api, setapi] = useState({})
  const [data, setdata] = useState({})
  const [sky, setsky] = useState(null)
  const [sysdata, setsysdata] = useState(null)
  const [winds, setwinds] = useState(null)
  const [cord, setcord] = useState(null)

  const [txt, set_txt] = useState("delhi")

  let lati = null;
  let long = null;

  let temperature = null;
  let min_temp = null;
  let max_temp = null;
  let humid = null;
  let feels = null;
  let press = null;

  let cloud = null;
  let descp = null;
  let icon = null;

  let wind = null;
  let deg = null;

  let country = null;
  let sunr = null;
  let suns = null;
  let visib = null;

  let city = null;

  useEffect(() => {
    const fetchApi = async () => {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${txt}&appid=aa4e7d464fd14f1e0496e2b4593a7d40&units=metric`

      try {

        const response = await fetch(url);
        const respjson = await response.json();
        setapi(respjson);
        setdata(respjson.main);
        setsky(respjson.weather[0]);
        setsysdata(respjson.sys)
        setwinds(respjson.wind)
        setcord(respjson.coord)

        console.log(respjson)
      }

      catch (e) {
        console.error(e)

      }

    }

    fetchApi();


  }, [txt]);

  if (cord) {
    lati = cord.lon.toFixed(2)
    long = cord.lat.toFixed(2);
  }

  if (data) {
    temperature = data.temp;
    min_temp = data.temp_min;
    max_temp = data.temp_max;
    feels = data.feels_like;
    humid = data.humidity;
    press = data.pressure;
  }


  if (sky) {
    cloud = sky.main;
    descp = sky.description;
    icon = sky.icon;
  }
  if (winds) {
    wind = winds.speed;
    deg = winds.deg;
  }

  if (sysdata) {
    country = sysdata.country;
    sunr = new Date(sysdata.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    suns = new Date(sysdata.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  }

  if (api) {
    visib = (api.visibility) / 1000;
    city = api.name;
  }

  return (
    <div>

      <div className='main-background mt-3'>

        <div className='search_box  col-md-6 mx-auto pt-4'>

          <input className='input_place form-control' placeholder='Search the city' type="text" onChange={(event) => { set_txt(event.target.value) }} />
        </div>

        <div className='cityname pt-5'>

          <i className="bi bi-geo-alt-fill text-white display-6" ></i>
          <span className='display-2 text-white'>{txt}, {country}</span>

        </div>

        <datacontext.Provider value={{ temperature, min_temp, max_temp, feels, humid, cloud, descp, icon, wind, press, deg, sunr, suns, visib, city }}>
          <Citydata />
          <Forecast />

        </datacontext.Provider>

        {/* <News/> */}
        <Footer />
      </div>

    </div>
  )
}

export { datacontext }