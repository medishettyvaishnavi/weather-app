import React from 'react'
import ForecastDay from './ForecastDay'
import SearchBar from './SearchBar'
import CurrentWeatherCard from './CurrentWeatherCard'
import { useState,useEffect } from 'react'


function WeatherPage() {
  let [currWeather,setCurrentWeather]=useState(null)
  let [forecastData,setForecastData]=useState(null)
  let [isLoading,setisLoading]=useState(false)
  let [errors,setErrors]=useState(null)
  let [city,setCity]=useState("Hyderabad")

  const apiKey='9439b99a5395a70e311626f9a6cd7e34'

  //handle search by city name
  const handleSearch=(newCity)=>{
    if(newCity!==null)
    {
        setCity(newCity)
        setCurrentWeather(null)
        setForecastData(null)
        setErrors(null)
    }
  }


  const fetchData= async()=>{
      setisLoading(true)
      setErrors(null)
      try{
      const currRes= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
      
      const forecastRes=await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`)
    
      if(currRes.status!==200 && forecastRes.status!==200)
      {
        throw new Error("City not found")
      }
      const currData= await currRes.json()
      const fDataList= await forecastRes.json()

      //console.log(currData)
      //console.log(fDataList)

      setCurrentWeather(currData)
      setForecastData(fDataList)
      
      }catch(err){
        setCurrentWeather(null)
        setForecastData(null)
        setErrors(`Cannot fetch the data from the city ${city}`)
      }finally{
        setisLoading(false)
      }
  }
  useEffect(()=>{
        fetchData()
      },[city])

  return (
    <div>
        <SearchBar onSearch={handleSearch} isLoading={isLoading}/>
        {
             errors!==null && <div className='bg-danger text-white conatiner p-2'>{errors}</div>
        }  
       
        {currWeather && <CurrentWeatherCard data={currWeather} city={city}/>}
        
        {
           forecastData!==null && (
           <div className='d-flex overflow-x-auto'>
            {forecastData.list.map((forecastObj,index)=>
            (<ForecastDay  data={forecastObj} key={index}/>

            ))}
            </div>
            )
        }
        
    </div>
  )
}

export default WeatherPage