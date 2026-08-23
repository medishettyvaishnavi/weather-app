import React from 'react'

function CurrentWeatherCard({data,city}) {
  return (
    <div className='container bg-warning p-5'>
        <h2 className='display-4 mb-4'>Current Weather in {city}</h2>
        <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt=" "/>
        <div className='d-flex justify-content-center gap-4'>
            <p className="fs-1">Temp: {data.main.temp}°C</p>
            <p className="fs-5">{data.weather[0].description}</p>
            <p className="fs-5">Feels like:{data.main.feels_like}°C</p>
            <p className="fs-4 "><span className='fst-italic text-danger'>wind:{data.wind.speed   }</span></p>
            
        </div>
    </div>
  )
}

export default CurrentWeatherCard