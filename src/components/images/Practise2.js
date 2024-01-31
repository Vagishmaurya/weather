import React ,{useState,useEffect} from 'react'

import Clear from './images/clear.png'
import Clouds from './images/clouds.png'
import Drizzle from './images/drizzle.png'
import Mist from './images/mist.png'
import Rain from './images/rain.png'


import './style.css'

export default function Practise2() {

    const [data,setdata]=useState({})
    const [info,setinfo] = useState({})

    const [txt,set_txt]=useState("delhi")



    useEffect( ()=>{
        const fetchApi = async()=>{
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${txt}&appid=aa4e7d464fd14f1e0496e2b4593a7d40&units=metric`

            const response = await fetch(url);
            //console.log(response);
            const respjson= await response.json();
            
            setdata(respjson.main)
            setinfo(respjson)

            console.log("data is ")
            console.log(respjson)
            
        }

        fetchApi();
        
    },[txt]);

    let sky_img=null;

    if(typeof info.main!="undefined"){

      if(info.weather[0].main=="Clouds"){
        sky_img=Clouds
      }
      if(info.weather[0].main=="Clear"){
        sky_img=Clear
      }
      if(info.weather[0].main=="Mist"){
        sky_img=Mist
      }
      if(info.weather[0].main=="Drizzle"){
        sky_img=Drizzle
      }
      if(info.weather[0].main=="Rain"){
        sky_img=Rain
      }
      
    }

  return (
    <div>
      
      <h1> This is the weather App</h1>

      <div className='box app'>
        <h3>Enter city</h3>
        <div className='inputdata'>
        <input type="text" onChange={(event)=>{set_txt(event.target.value)} }/>
        </div>

        {!data ? (
            <p>No Data Found</p>
        ): (
            <div>
            <div className='info'>
            <h3 className='city'>{txt}</h3>
            </div>

            <div className='temp'>
            <img className='sky_image' src={sky_img} alt={"sky_img"} />
            <p>{info.weather[0].main}</p>
            <h2>{data.temp}°C</h2>
            </div>

            <br></br>
            <div>
                <h3>Min Temp : {data.temp_min}°C || Max Temp : {data.temp_max}°C</h3>
                
                <p>Feels Like : {data.feels_like}°C</p>
                <p>Humidity : {data.humidity}%</p>

            </div>
            

            </div>
        )

        }

      </div>
    </div>
  )
}
