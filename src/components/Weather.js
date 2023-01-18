import React from 'react'
import Daily from './Daily';
import Hourly from './Hourly';

function formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  }

export default function Weather(props) {

    const {weatherData, locationData, dailyWeatherData, loadingDailyWeatherData} = props;

    // Simple capitalize function
    const capitalize = (text) => text.replace(text[0], text[0].toUpperCase())
  
    return (
    <div>
        <div className='whole-weather-container'>
            <div className='weather-container-header-container'>
                <h1 className={`${locationData.locations[0].formattedAddress.length > 12 ? 'weather-container-header-small' : 'weather-container-header'}`}>{locationData.locations[0].formattedAddress}</h1>
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
                        <p>{Math.round(weatherData.wind.speed)} mph <img style={{maxHeight: `15px`, transform: `rotate(${Math.round(weatherData.wind.deg)}deg)`}} src={require("../images/arrow.png")} /></p>
                    </div>
                    <div className='weather-info-row'>
                        <p>Clouds</p> 
                        <p>{Math.round(weatherData.clouds.all)}%</p>
                    </div>
                    <div className='weather-info-row'>
                        <p>Sunrise</p> 
                        <p>{`${formatAMPM (new Date(weatherData.sys.sunrise * 1000))}`}</p>
                    </div>
                    <div className='weather-info-row'>
                        <p>Sunset</p> 
                        <p>{`${formatAMPM (new Date(weatherData.sys.sunset * 1000))}`}</p>
                    </div>


                </div>
            </div>


        </div>
        {loadingDailyWeatherData ? null : <Hourly dailyWeatherData={dailyWeatherData} formatAMPM={formatAMPM}/>}

        <div>
            {loadingDailyWeatherData ? null : <Daily dailyWeatherData={dailyWeatherData}/>}
        </div>
    </div>
  )
}
