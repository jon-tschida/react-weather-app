import React from 'react'

export default function Daily(props) {

  const {dailyWeatherData} = props

  // console.log(dailyWeatherData)
  return (
    <div className='hourly-weather-container'>
      {
        dailyWeatherData.daily.map((el, i)=>{
          let weekdayDate = new Date(el.dt * 1000);
          let weekday = new Intl.DateTimeFormat(`en-US`, {
            weekday: `short`,
        }).format(weekdayDate);
          return (
            <div className='hourly-weather'>
                <p className='hourly-day'>{weekday}</p>
                <img className='daily-weather-icon' src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`} />
                <p className='hourly-temp-desc'>{el.weather[0].main}</p>
                <p className='hourly-temp-desc'>{Math.round(el.temp.day)}°</p>
            </div>
          )
        })
       
      }
    </div>
  )
}
