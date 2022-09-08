import React, { useState } from 'react'
import axios from 'axios'

function App() {
  const [data, setData] = useState({})
  const [location, setLocation] = useState('')

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=675f36644e5fe783a804512d04eb892a`

  const searchLocation = (event) => {
    if (event.key === 'Enter') {
      axios.get(url).then((response) => {
        setData(response.data)
        console.log(response.data)
      })
      setLocation('')
    }
    
  }
  function persiantemp(valNum) {
    valNum = parseFloat(valNum);
    return(Math.round((valNum-32) / 1.8));
  }
  function persianedscription(valNum) {
    if(valNum === "Clouds"){
      return("ابری");
    }
    else if(valNum === "Rain"){
      return("بارانی");
    }
    else if(valNum ==="Clear"){
      return("صاف و آفتابی");
    }
    else{
      return((data.weather[0].main));
    }
  }
  function shahr(val) {
    if(val === "Tehran"){
      return("تهران");
    }
    else if(val === "Rasht"){
      return("رشت");
    }
    else{
      return((data.name));
    }
  }
  return (
    <div className="app">
      <div className="search">
        <input
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder='شهر را
           وارد نمایید و اینتر کنید'
          type="text" />
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{shahr(data.name)}</p>
          </div>
          <div className="temp">
            {data.main ? <h1>{persiantemp(data.main.temp.toFixed())}°C</h1> : null}
          </div>
          <div className="description">
            {data.weather ? <p>{persianedscription(data.weather[0].main)}</p> : null}
          </div>
        </div>

        {data.name !== undefined &&
          <div className="bottom">
          
            <div className="humidity">
              {data.main ? <p className='bold'>{data.main.humidity}%</p> : null}
              <p>رطوبت</p>
            </div>
            <div className="wind">
              {data.wind ? <p className='bold'>{data.wind.speed.toFixed()} MPH</p> : null}
              <p>سرعت باد</p>
            </div>
          </div>
        }



      </div>
    </div>
  );
}

export default App;
