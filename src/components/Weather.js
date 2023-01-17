import React from 'react'

export default function Weather(props) {

    const {weatherData, locationData} = props;

    // Simple capitalize function
    const capitalize = (text) => text.replace(text[0], text[0].toUpperCase())
  
    return (
    <div>
        <div className='weather-container'>
            <div className='weather-container-header-container'>
                <h1 className='weather-container-header'>Today in {locationData.locations[0].formattedAddress}</h1>
                <img className='weather-header-icon' src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} />
                <p className='weather-main-temp'>{Math.round(weatherData.main.temp)}°</p>
                <p className='weather-main-description'>{capitalize(weatherData.weather[0].description)}</p>
            </div>
            <hr />
            <div className='weather-info'>
                <div className='weather-info-row'>
                    <p>Feels </p> 
                    <p>{Math.round(weatherData.main.feels_like)}°</p>
                </div>
                <div className='weather-info-row'>
                    <p>Humidity</p> 
                    <p>{Math.round(weatherData.main.humidity)}%</p>
                </div>
                <div className='weather-info-row'>
                    <p>Wind</p> 
                    <p>{Math.round(weatherData.wind.speed)} MPH</p>
                </div>
                <div className='weather-info-row'>
                    <p>Cloud Coverage</p> 
                    <p>{Math.round(weatherData.clouds.all)}%</p>
                </div>

            </div>
        </div>
    </div>
  )
}
