import React from 'react'

export default function Weather(props) {

    const {weatherData, locationData, dailyWeatherData} = props;

    // Simple capitalize function
    const capitalize = (text) => text.replace(text[0], text[0].toUpperCase())

    console.log(dailyWeatherData)
  
    return (
    <div>
        <div className='whole-weather-container'>
            <div className='weather-container-header-container'>
                <h1 className='weather-container-header'>{locationData.locations[0].formattedAddress}</h1>
                <img className='weather-header-icon' src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@4x.png`} />
                <div className='high-low-main-temp-container'>
                    <p className='weather-main-temp'>{Math.round(weatherData.main.temp)}°</p>
                    <p className='weather-min-high'>{Math.round(weatherData.main.temp_min)}° {Math.round(weatherData.main.temp_max)}°</p>    
                </div>
                <p className='weather-main-description'>{capitalize(weatherData.weather[0].description)}</p>
            </div>
            <span className='divider'></span>
            <div className='weather-info'>
                <div className='weather-info-row-container'>
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
                        <p>Clouds</p> 
                        <p>{Math.round(weatherData.clouds.all)}%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
