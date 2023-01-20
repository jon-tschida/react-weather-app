import React from 'react'

export default function Daily(props) {

  const {dailyWeatherData, capitalize, formatAMPM} = props
  const [clicked, setClicked] = React.useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
});

const handleClick = (index) => {
  setClicked(prevState => ({
      ...prevState,
      [index]: !prevState[index]

  }))
};

  // console.log(dailyWeatherData)
  return (
    <div className='daily-weather-container'>
      {
        dailyWeatherData.daily.map((el, i)=>{
          let weekdayDate = new Date(el.dt * 1000);
          let weekday = new Intl.DateTimeFormat(`en-US`, {
            weekday: `short`,
        }).format(weekdayDate);
          return (
            i > 0 && i < 8 && 
            <div className='daily-weather' key={i} onClick={() => handleClick(i)}>
                <p className='daily-day'>{weekday}</p>
                <img className='daily-weather-icon' alt="weather icon"src={`http://openweathermap.org/img/wn/${el.weather[0].icon}.png`} />
                <p className='daily-temp-desc'>{clicked[i]? capitalize(el.weather[0].description) : capitalize(el.weather[0].main)}</p>
                <p className='daily-temp-desc'>{Math.round(el.temp.day)}°</p>
                {
                  clicked[i] && 
                  <div className='daily-more-info-row-container'>
                  <br />
                    <div className='daily-more-info-row'>
                      <img src={require('../images/wind.png')} alt="wind icon" className="daily-sunrise-sunset-icon"/> 
                      <p className='daily-sunrise-sunset-time'>{Math.round(el.wind_speed)}mph</p> 
                    </div>

                    <div className='daily-more-info-row'>
                      <img src={require('../images/humidity.png')} alt="humidity icon" className="daily-sunrise-sunset-icon"/> 
                      <p className='daily-sunrise-sunset-time'>{el.humidity}%</p>
                    </div>
                    
                    {/* Conditionally rendering snow and rain fall. These only populate if snow or rain are forecasted.
                        We check to see if the entry is there "!!el.rain" and "!!el.snow" respectively, if so, we display the forecast */}
                    { !!el.rain &&
                    <div className='daily-more-info-row'>
                      <img src={require('../images/rain.png')} alt="rain icon" className="daily-sunrise-sunset-icon"/> 
                      <p className='daily-sunrise-sunset-time'>{el.rain.toFixed(1)}mm</p>
                    </div>
                    }
                    { !!el.snow &&
                    <div className='daily-more-info-row'>
                      <img src={require('../images/snow.png')} alt="snow icon" className="daily-sunrise-sunset-icon"/> 
                      <p className='daily-sunrise-sunset-time'>{el.snow.toFixed(1)}mm</p>
                    </div>
                    }
                    <div className='daily-more-info-row'>
                      <img src={require('../images/sunrise.png')} alt="sunrise icon" className="daily-sunrise-sunset-icon"/> 
                      <p className='daily-sunrise-sunset-time'>{formatAMPM(new Date(el.sunrise * 1000))}</p>
                    </div>

                    <div className='daily-more-info-row'>
                      <img src={require('../images/sunset.png')} alt="sunset icon" className="daily-sunrise-sunset-icon"/> 
                      <p className='daily-sunrise-sunset-time'>{formatAMPM(new Date(el.sunset * 1000))}</p>
                    </div>
                    
                  </div>

                }
            </div>
          )
        })
       
      }
    </div>
  )
}
